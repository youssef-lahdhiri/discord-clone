import { getAuth } from "@clerk/nextjs/server";
import { db } from "./db";
import { NextApiRequest } from "next";

export const currentProfilPages=async(req:NextApiRequest)=>{
    const {userId}=getAuth(req);
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