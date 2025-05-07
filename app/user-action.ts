"use server";
import { PrismaClient } from "../app/generated/prisma";

import { User } from "./Types";

const prisma = new PrismaClient();

export const getServerResponse = async () => {
  return "Server Action Called";
};

/**
 * * @param dataOfUser - The user data to be added.
 * @param dataOfUser.name - The name of the user.
 * * @param dataOfUser.email - The email of the user.
 * @returns A promise that resolves to a string indicating the result of the operation.
 */
export const addUser = async (dataOfUser: User) => {
  await prisma.user.create({
    data: {
      name: dataOfUser.name,
      email: dataOfUser.email,
      createsAt: new Date(),
      updatedAt: new Date(),
    },
  });
  return "User Added";
};
export const getUsers = async () => {
  return await prisma.user.findMany();
};
export const updateUser = async (id: number, name: string) => {
  return (
    await prisma.user.update({
      where: { id },
      data: {
        name: name,
        updatedAt: new Date(),
      },
    }),
    "User updated"
  );
};
export const delUser = async (id: number) => {
  return (
    await prisma.user.delete({
      where: { id },
    }),
    "User Deleted"
  );
};
export const findUser = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};
