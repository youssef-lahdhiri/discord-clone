import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "../../../../types";
import { db } from "@/lib/db";
import { currentProfil } from "@/lib/current-profil";
import { currentProfilPages } from "@/lib/current-profil-pages";

export default async function handler(req:NextApiRequest,
    res:NextApiResponseServerIo
){


try {
    const profil=await currentProfilPages(req)
    if(!profil){
        return res.status(404).json({message:'profill not found '})
    }
    const {messageId,serverId,channelId}=req.query
    //  const value='test_edit' 
    // console.log(req)  
      const { value }=req.body
    //  console.log(messageId,serverId,channelId)
    //  console.log(`value is ${value}`)
    const server=await db.server.findFirst({
        where:{
            id:serverId as string,
            members:{
                some:{
                    profilId:profil.id
                }
            }
        },
        include:{
            members:true
        }
    })
    const channel=await db.channel.findFirst({
        where:{
            id:channelId as string,
            serverId:serverId as string,
        }
    })
    if(!server){
        return res.status(404).json({message:'server not found'})
    }
    if(!channel){
        return res.status(404).json({message:'channel not found'})
    }
    const member= server.members.find((member)=>member.profilId===profil.id)
    if(!member){
        return res.status(404).json({message:'member not found '})
    }
    let message=await db.message.findFirst({
        where:{
           id:messageId as string,
           channelId:channelId as string,

        },
        include:{
            member:{
                include:{
                    profil:true,
                }
            }
        }
    })
    if(!member){
        return res.status(404).json({message:'message not found '})
    }
    if (req.method==='PATCH'){
        message=await db.message.update({
            where:{
                id:messageId as string,
            },
            data:{
                content:value,
            },
            include:{
                member:{
                    include:{
                        profil:true,
                    }
                }
            }
        })}
    
const updateKey=`chat:${channelId}:messages:update`
res?.socket?.server?.io?.emit(updateKey,message)
return res.status(200).json({message})
} catch (error) {
    console.log(error)
}
}