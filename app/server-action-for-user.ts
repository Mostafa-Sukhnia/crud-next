"use server";
import { getServerResponse,addUser } from "./user-action";

export const handelegetServerResponseAction = async () =>{
    const respons = await getServerResponse()
    return respons
} 
export const handeleAddUserAction = async (userData) =>{
    const respons = await addUser(userData)
    return respons
} 