import { WebSocketServer , WebSocket } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from '@repo/db/client';


const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket,
  rooms: string[],
  userId: string
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch(e) {
    return null;
  }
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close()
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws
  })

  ws.on('message', async function message(data) {
    let parsedData;
    try {
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data); 
    }
  } catch (error) {
    console.error("Failed to parse message data:", error);
    console.error("Received data:", data);
    return; // Exit the handler if parsing fails
  }

    if (parsedData.type === "join_room") {
      const user = users.find(u => u.ws === ws);
      user?.rooms.push(parsedData.roomId);
      // Fetch previous messages for the room and send to the user
      try {
        const previousMessages = await prismaClient.chat.findMany({
          where: { roomID: Number(parsedData.roomId) },
          orderBy: { id: 'asc' },
        });
        for (const chat of previousMessages) {
          ws.send(JSON.stringify({
            type: "chat",
            message: chat.message,
            roomId: parsedData.roomId
          }));
        }
      } catch (err) {
        console.error("Failed to send previous messages to user:", err);
      }
    }
    if (parsedData.type === "leave_room") {
      const user = users.find(u => u.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter(r => r === parsedData.room);
    }

    console.log("message received")
    console.log(parsedData);

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      users.forEach(user => {
        if (user.rooms.includes(roomId)) {
        if(user.ws.readyState === WebSocket.OPEN) {
          try{
            user.ws.send(JSON.stringify({
              type: "chat",
              message,
              roomId
            }))
          }catch(e) {
            console.error("Failed to send message:", e);
          }
        } else {
          console.warn(`WebSocket for user ${user.userId} is not open.`);
        } 
        }
      })

      await prismaClient.chat.create({
        data: {
          roomID: Number(roomId),
          message,
          userID: userId
        }
      });
    }

  });

});