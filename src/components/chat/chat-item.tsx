'use client'
import { ActionTooltip } from "../action-tooltip";
import Image from "next/image";
import { Member, Profil } from "@prisma/client";
import { ShieldCheck } from "lucide-react";
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
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{timestamp}</span>
            </div>
            {content }
           {/* chat item :pdf/ edit / image / editing */}
        </div>
      </div>
    </div>
  );
};
