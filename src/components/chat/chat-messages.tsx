'use client'
import { Loader2, ServerCrash } from "lucide-react";
import { Member, Message, Profil } from "@prisma/client";
import { useChatQuery } from "../../../hooks/use-chat-query";
import { Fragment } from "react";
import { ChatItem } from "./chat-item";
import {format} from 'date-fns';
import { useChatSocket } from "../../../hooks/use-chat-sockt";
const DATE_FORMAT="d MMM yyyy, HH:mm"
type MessageWithMemberWithProfil=Message&{
    member:Member&{
        profil:Profil
    }

}
interface ChatMessagesProps{
    name:string;
    member:Member;
    chatId:string;
    apiUrl:string;
    socketUrl:string;
    socketQuery:Record<string,string>;
    paramKey:'channelId'|'conversationId';
    paramValue:string;
    type:'channel'|'conversation';

}


export const ChatMessages=({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,
}:ChatMessagesProps)=>{
    const queryKey=`chat:${chatId}`
    const addKey=`chat:${chatId}:messages`
    const updateKey=`chat:${chatId}:messages:update`
    const { data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    }=useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    })
    useChatSocket({queryKey,addKey,updateKey})
    if(status==='pending'){
        return(
            <div className="h-screen flex flex-col justify-center items-center">
                <Loader2  className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading Messages...</p>
            </div>
        )
    }
    if(status==='error'){
        return(
            <div className="h-screen flex flex-col justify-center items-center">
                <ServerCrash  className="h-7 w-7 text-zinc-500  my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Something Went Wrong...</p>
            </div>
        )
    }
    
return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">

        <div className="flex flex-col-reverse mt-auto">
            {data?.pages.map((group,i)=>(
                <Fragment key={i}>
                    {group.items.map((message:MessageWithMemberWithProfil)=>(
                        <ChatItem 
                        currentMember={member}
                        id={message.id}
                        key={message.id}
                        content={message.content}
                        fileUrl={message.fileUrl}
                        deleted={message.deleted}
                        timestamp={format(new Date(message.createAt),DATE_FORMAT)}
                        isUpdated={message.updatedAt!==message.createAt}
                        socketUrl={socketUrl}
                        socketQuery={socketQuery}
                        member={message.member}


                        />
                    ))}


                </Fragment>
            ))}
        </div>
    </div>
)
}