'use client';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Dialog,
DialogHeader,
DialogContent,
DialogFooter,
DialogTitle,
DialogDescription,

 } from "../ui/dialog";
 import { Label } from '../ui/label';
import { useModal } from '../../../hooks/use-modal-store';

export const InviteModal=()=>{
    const {isOpen,onClose,type}=useModal()
    const router=useRouter()
   const isModalOpen=isOpen && type==="invite";



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
               
               '> server invite link</Label></div>
               <div className='flex items-center mt-2 gap-x-2'>
<Input readOnly className=''/>

               </div>
            </DialogContent>
        </Dialog>
        </>
    )
}