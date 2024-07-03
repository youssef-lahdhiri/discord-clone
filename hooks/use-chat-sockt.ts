
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";
import { useEffect } from "react";
import { Member, Message, Profil } from "@prisma/client";

type MessageWithMemberWithProfil=Message&{
    member:Member&{
        profil:Profil
    }
}

type ChatSocketProps={
    addKey:String;
    updateKey:String;
    queryKey:String;

}

export const useChatSocket=({addKey,updateKey,queryKey}:ChatSocketProps)=>{

const {socket}=useSocket()
const queryClient=useQueryClient()
useEffect(()=>{
if(!socket){
    return;
}
socket.on(updateKey,(message:MessageWithMemberWithProfil)=>{
    queryClient.setQueryData([queryKey],(oldData:any)=>{
        if(!oldData ||!oldData.pages || oldData.pages.length===0){
            return oldData;
        }
        const newData=oldData.pages.map((page:any)=>{
            return{
                ...page,items:page.items.map((item:MessageWithMemberWithProfil)=>{
                    if(item.id===message.id){
                        return message;
                    }
                    return item;
                })
            }
        });
        return {
            ...oldData,
            pages:newData
        }
    })
})

socket.on(addKey,(message:MessageWithMemberWithProfil)=>{
    queryClient.setQueryData([queryKey],(oldData:any)=>{
        if(!oldData||!oldData.pages ||oldData.pages.length===0){
            return {
                pages:[{
                   items:[message] 
                }]
            }
        }
        const newData=[...oldData.pages];
        newData[0]={
            ...newData[0],
            items:[
                message,
                ...newData[0].items
            ]
        }
        return {
            ...oldData,
            pages:newData,
        }
    })
})

return ()=>{
    socket.off(addKey)
    // socket.updateKey(updateKey)
}
},[queryClient,addKey,socket,updateKey,queryKey])


}