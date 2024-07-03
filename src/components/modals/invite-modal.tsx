'use client';
import { Button } from '../ui/button';
import { Check, Copy, TicketCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { RefreshCw } from 'lucide-react';
import { Dialog,
DialogHeader,
DialogContent,
DialogFooter,
DialogTitle,
DialogDescription,

 } from "../ui/dialog";
 import { Label } from '../ui/label';
import { useModal } from '../../../hooks/use-modal-store';
import { useOrigin } from '../../../hooks/use-origin';
import { useState } from 'react';
import axios from 'axios';

export const InviteModal=()=>{
    const {onOpen,isOpen,onClose,type,data}=useModal()
    const router=useRouter()
   const isModalOpen=isOpen && type==="invite";
   const origin=useOrigin()
   const {server}=data;
   const inviteUrl=`${origin}/invite/${server?.inviteCode}`
   const [copied,setCopied]=useState(false)
   const [isLoading,setIsLoading]=useState(false)
   const onCopy=()=>{
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
    setTimeout(()=>{setCopied(false)},1000)
   }
   const onNew=async()=>{
    try {
        setIsLoading(true)
        const response=await axios.patch(`/api/servers/${server?.id}/invite-code`)
        onOpen('invite',{server:response.data})
    } catch (error) {
        console.log(error)
        
    }finally{
        setIsLoading(false)
    }
   }



    return(
    <>
    
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            

            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6" >
                    <DialogTitle className="text-2xl text-center font-bold ">
                        Invite Friends

                    </DialogTitle>
              
                </DialogHeader>
               <div className='p-6 '> 
               <Label className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70
               
               '> server invite link</Label>
               <div className='flex items-center mb-4  gap-x-2'>
<Input readOnly className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0' value={inviteUrl}/>
<Button disabled={isLoading} onClick={onCopy} size='icon'>
   {copied?<Check className='w-4 h-4'/>: <Copy className='w-4 h-4'/>}
</Button>

               </div>
               <Button onClick={onNew} disabled={isLoading}  variant='link' size='sm' className='text-xs text-zinc-500 mt-4 '>Generate a new Link <RefreshCw className='w-4 h-4 ml-2'/></Button>
               </div>
            </DialogContent>
        </Dialog>
        </>
    )
}