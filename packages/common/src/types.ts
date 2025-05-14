import {z} from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1).max(20),
    email: z.string().email(),
    password: z.string().min(8)
})


export const signInSchema = z.object({
    email: z.string().min(1).max(20),
    password: z.string().min(8),
})

export const createRoomSchema = z.object({
    name: z.string().min(1).max(20),
})