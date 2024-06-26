import { currentProfil } from "@/lib/current-profil";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import ServerHeader from '@/components/server/server-header'

const ServerSideBar = async({serverId}:{serverId:string}) => {
    const profil =await currentProfil()
    if(!profil){
       return  redirect('/')
    }
    const server=await db.server.findUnique({
        where:{
            id:serverId
        },
        include:{
            channels:{
                orderBy:{
                    createdAt:'asc'
                }
            },
            members:{
                include:{
                    profil:true
                },
                orderBy:{
                    role:'asc'
                }
            }
        }
    })
    const textChannels=server?.channels.filter((channel)=>(channel.type===ChannelType.TEXT))
    const audioChannels=server?.channels.filter((channel)=>(channel.type===ChannelType.AUDIO))
    const vediochannels=server?.channels.filter((channel)=>(channel.type===ChannelType.VEDIO))
    const members=server?.members.filter((member)=>(member.profilId!==profil.id))
    if(!server){
        return redirect('/')
    }
    const role=server.members.find((member)=>member.profilId===profil.id)?.role
    return ( <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
        <ServerHeader 
        server={server}
        role={role}
        />
        </div> );
}
 
export default ServerSideBar;