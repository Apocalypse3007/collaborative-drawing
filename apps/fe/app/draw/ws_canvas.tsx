"use client";

import { useEffect, useState } from "react";
import Canvas from "../draw/canvas";
import { WS_URL } from "@/config";

export default function WsCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNWY2ZTdmZC0xOWQ4LTQyMmMtOTNlOS04OTkwMWY2ZDRlOGIiLCJpYXQiOjE3NDczOTAwOTl9.Z0iFxtAqb4tz3iHUGvpFRBQsjm0MkJ5otnLsF7Qvwl4`)

    ws.onopen = () => {
        setSocket(ws);
        ws.send(JSON.stringify({
            type: "join_room",
            roomId: roomId
        }))
    }
  },[])

  if(!socket) {
    return <div>Loading...</div>
  }     

   return <div>
    <Canvas roomId={roomId} socket={socket} />;
    </div> 
}
