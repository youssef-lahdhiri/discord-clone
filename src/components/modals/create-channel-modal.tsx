'use client';
import { useRouter } from 'next/navigation';
import { ChannelType } from '@prisma/client';
import { UserButton } from '@clerk/nextjs';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
// import { FormField,FormItem } from '../ui/form';
import {Select,
    SelectItem,
    SelectTrigger,
    SelectContent,
    SelectValue,
} from '@/components/ui/select';
import { Dialog,
DialogHeader,
DialogContent,
DialogFooter,
DialogTitle,
DialogDescription,

 } from "../ui/dialog";
 import {Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,

 } from '../ui/form';

 import {Input ,

 }from '../ui/input';
 import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { useModal } from '../../../hooks/use-modal-store';
const formSchema=z.object({
    name:z.string().min(1,{
        message:'Channel name is required .'
    }).refine(name=>name!=="general",{
        message:"Channel name cannot be 'general'"
    }),
    type:z.nativeEnum(ChannelType)

    
})

export const CreateChannelModal=()=>{
    const {isOpen,onClose,type}=useModal()
    const router=useRouter()
   const isModalOpen=isOpen && type==="createChannel";
    const form =useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            
            name:"",
            type:ChannelType.TEXT,
        }
    });
const isLoading=form.formState.isSubmitting;
const onSubmit =async(values:z.infer<typeof formSchema>)=>{
    console.log('test')
try{
await axios.post("/api/channels",values);
form.reset()
router.refresh()
onClose()
}catch(error){console.log(error)

}
}
const handleClose=()=>{
form.reset();
onClose();
}

    return(
    <>
    
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            

            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6" >
                    <DialogTitle className="text-2xl text-center font-bold ">
                       Channel Name 

                    </DialogTitle>
                    
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8 '
                    >
                    <div className='space-y-8 px-6 '>
                       
                        <FormField
                        control={form.control}
                        name='name'
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className='uppercase text-xs font-bold 
                                text-zinc-500 dark:text-secondary/70 ' >
                                    Channel Name

                                </FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading}
                                    className='bg-zinc-300/50 border-0
                                    focus-visible:ring-0 text-black
                                    focus-visible:ring-offset-0
                                    '
                                    placeholder='enter Channel Name '
                                    {...field}
                    
                                     />
                                </FormControl>
                                <FormMessage/>

                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control }
                        name='type'
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Channel Type</FormLabel>
                                <Select 
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                >
                                <FormControl>
                                    <SelectTrigger className='bg-zinc-300/50 border-0 
                                    focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none
                                    '>
                                        <SelectValue placeholder='Select a Channel type'/>
                                        
                                         </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(ChannelType).map((type)=>(
                                        <SelectItem key={type} value={type} className='capitalize'> {type.toLowerCase()}</SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                        
                        />
                    </div>
                        <DialogFooter className='bg-gray-100 px-6 py-4 '>
<Button variant='indigo' disabled={isLoading}>Create </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
        </>
    )
}