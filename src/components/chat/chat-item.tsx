'use client'
import qs from "query-string";
import { ActionTooltip } from "../action-tooltip";
import Image from "next/image";
import { Member, Profil } from "@prisma/client";
import { Edit, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { ChatInput } from "./chat-input";
// import {UserAvatar} from '@/components/user-avatar'
 const roleIconMap={
    'GUEST':null,
    'MEMBER':<ShieldCheck className=" h-4 w-4 ml-2 text-indigo-500"/>,
    'ADMIN':<ShieldCheck className=" h-4 w-4 ml-2 text-indigo-500"/>
 }
interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profil: Profil;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}
export const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
 
  const [edit,setEdit]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  // const isLoading=form.formstate.isSumbitting
  const [value,setValue]=useState(content)
  const onpenEdit=()=>{
    setEdit(true)
  }
  const submit=async(e:FormEvent<HTMLFormElement>)=>{
    setIsLoading(true)
    e.preventDefault()
    const url=qs.stringifyUrl({
      url:`${socketUrl}/${id}`,
      query:socketQuery,

    })
    await axios.patch(url,{value})
    setEdit(false)
    setIsLoading(false)
  }
  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 trabsition w-full">
      
      <div className="group flex gap-x-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadow-md transitio ">
            <Image  alt='user'  className="rounded-md" height={20} width={20} src={member.profil.imageUrl}/>
            

        </div>
        <div className="flex flex-col w-full">
            <div className="flex items-center gap-x-2">
            <div className="flex items-center">
                <p className="font-semibold text-sm hover:underline cursor-pointer">
                    {member.profil.name}
                </p>
                <ActionTooltip label={member.role}>
                    {roleIconMap[member.role]}
                    
                </ActionTooltip>
                <button onClick={onpenEdit} className="absolute right-10"> <Edit className="w-4 h-4"/></button>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{timestamp}</span>
            </div>
           {!edit &&(<p> {content }</p>)}
           {edit && <form  className="w-full" onSubmit={(e)=>submit(e)}> <input disabled={isLoading} className="w-full bg-zinc-600/75" value={value} onChange={(e)=>setValue(e.target.value)}    /></form>}
           {/* chat item :pdf/ edit / image / editing */}
        </div>
      </div>
    </div>
  );
};
