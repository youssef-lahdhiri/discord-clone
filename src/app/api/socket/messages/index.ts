import { currentProfilPages } from "@/lib/current-profil-pages";
import { channel } from "diagnostics_channel";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/../types";

export default async function handler(

    req:NextApiRequest,
    res:NextApiResponseServerIo,
){
if(req.method !=='POST'){
    return res.status(405).json({error:"method not allowed "})
}
try {
    const profil=await currentProfilPages(req)
    const {content,fileUrl}=req.body;
    const {serverId,channelId}=req.query
    if(!profil){
        return res.status(401).json({error:'unauthaurized'})
    }
    if(!serverId){
        return res.status(401).json({error:'server missing'})
    }
    if(!channelId){
        return res.status(401).json({error:'channel missing'})
    }
    if(!content){
        return res.status(401).json({error:'contnet missing'})
    }
const server=await db.server.findFirst({
    where:{
        members:{
            some:{
                profilId:profil.id
            }
        }
    },
    include:{
        members:true,
    }

})
if(!server){
    return res.status(404).json({message:"server not found"})
}
const channel=await db.channel.findFirst({
    where:{
        id:channelId as string,
        serverId:serverId as string,
    }
})
if(! channel){
    return res.status(404).json({message:"channel not found"})
}
const member=server.members.find((member)=>member.profilId===profil.id)
if(!member){
    return res.status(404).json({message:"member not found"})
}
const message= await db.message.create({
    data:{
        content,
        fileUrl,
        channelId:channelId as string,
        memberId:member.id

    },
    include:{
        member:{
            include:{
            profil:true,}
        }

    }
})
const channelKey=`chat:${channelId}:messages`;
res?.socket?.server?.io?.emit(channelKey,message)
return res.status(200).json({message})
} catch (error) {console.log('messages_post',error)
    return res.status(500).json({message:'internael errir'})
    
}
}