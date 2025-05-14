import express from "express";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { createRoomSchema, createUserSchema, signInSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";


const app = express();
app.use(express.json());


app.post("/signup", async (req, res) => {

    const parsedData = createUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    try {
        const hashedpwd = await bcrypt.hash(parsedData.data.password, 10);
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.email,
                password: hashedpwd,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch(e) {
        res.status(411).json({
            message: "User already exists with this username"
        })
    }
})


app.post("/signin", async (req, res) => {
    const parsedData = signInSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    if (!JWT_SECRET) {
        res.status(500).json({
            message: "Internal server error"
        })
        return;
    }
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email,
        }
    })

    if (!user) {
        res.status(403).json({
            message: "Not authorized"
        })
        return;
    }

    const ispwdcorrect = await bcrypt.compare(parsedData.data.password, user.password);
    if (!ispwdcorrect) {
        res.status(403).json({
            message: "Not authorized"
        })
        return;
    }

    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET);

    res.json({
        token
    })
})

app.post("/createroom", middleware, async (req, res) => {
    const parsedData = createRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    //@ts-ignore
    const userId = req.userId;

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminID: userId
            }
        })
        res.json({
            roomId: room.id
        })
    } catch(e) {
        res.status(411).json({
            message: "Room already exists with this name"
        })
    }
})


app.get("/chats/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
        where: {
            roomID: roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 100,
    });
    res.json({
        messages
    })
})
app.listen(3001);

