import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export const currentProfil=async()=>{
    const {userId}=auth();
    if (!userId){
        return null
    }
    const profil=await db.profil.findUnique({
        where:{
            userId
        }
    });
    return profil;
}