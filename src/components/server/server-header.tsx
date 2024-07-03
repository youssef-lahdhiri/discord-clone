'use client'
import { MemberRole, Server } from "@prisma/client";
import { ChevronDown,LogOut,LogOutIcon,LucideLogOut,PlusCircle,Settings,Trash,Trash2,User,UserPlus } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { useModal } from "../../../hooks/use-modal-store";

interface ServerHeaderProps{
    server:Server;
    role?:MemberRole;
    
}
const ServerHeader = ({server,role}:ServerHeaderProps) => {
    const {onOpen}=useModal()
    const isAdmin=role===MemberRole.ADMIN
    const isModerator = isAdmin
    return (
    
    <DropdownMenu> 
        <DropdownMenuTrigger  asChild className="  focus:outline-none">
            <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 
            dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700 
            ">{server.serverName}
            <ChevronDown className="h-5 w-5 ml-auto"/>
            </button>
        </DropdownMenuTrigger >
        <DropdownMenuContent className="w-56 !bg-black/70 text:xs relative z-[50] font-medium text-black dark:text-neutral-400 space-y-[2px] ">
{isModerator&&<div onClick={()=>onOpen('invite',{server})} > <DropdownMenuItem className="flex items-center text-indigo-600  dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"> 
    <p>invite People</p> 
    <UserPlus className="h-4 w-4 mt-0 ml-auto"/>
    </DropdownMenuItem></div>}
{isModerator&&<div> <DropdownMenuItem className="flex items-center px-3 py-2 text-sm cursor-pointer"> 
    <p>Server Settings</p> 
    <Settings className="h-4 w-4 mt-0 ml-auto"/>
    </DropdownMenuItem></div>}
{isModerator&&<div> <DropdownMenuItem className="flex items-center px-3 py-2 text-sm cursor-pointer"> 
    <p>Manage Members</p> 
    <User className="h-4 w-4 mt-0 ml-auto"/>
    </DropdownMenuItem></div>}
{isModerator&&<div onClick={()=>{onOpen('createChannel')}}> <DropdownMenuItem className="flex items-center px-3 py-2 text-sm cursor-pointer"> 
    <p>Create Channel</p> 
    <PlusCircle className="h-4 w-4 mt-0 ml-auto"/>
    </DropdownMenuItem></div>}
{isModerator&& <DropdownMenuSeparator/>}
{isModerator&&<div> <DropdownMenuItem className="flex text-rose-500 items-center px-3 py-2 text-sm cursor-pointer"> 
    <p >Delete Server</p> 
    <Trash2 className="h-4 w-4 mt-0 ml-auto"/>
    </DropdownMenuItem></div>}
{!isModerator&& <div> <DropdownMenuItem className="flex text-rose-500 items-center px-3 py-2 text-sm cursor-pointer"> 
    <p >Leave Server</p> 
    <LogOut className="h-4 w-4 mt-0 ml-auto"/>
    </DropdownMenuItem></div>}
        </DropdownMenuContent>
    </DropdownMenu> 


    );
}
 
export default ServerHeader;