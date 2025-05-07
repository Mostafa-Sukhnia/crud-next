"use server";
import { PrismaClient } from "../app/generated/prisma";

import { User } from "./Types";

const prisma = new PrismaClient()

export const getServerResponse = async () => {
    return ("Server Action Called")
}

export const addUser = async (dataOfUser:User) => {
    await prisma.user.create({
        data:{
            name: dataOfUser.name,
            email: dataOfUser.email,
            createsAt: new Date(),
            updatedAt: new Date()
        }
    })
    return ("User Added")
}