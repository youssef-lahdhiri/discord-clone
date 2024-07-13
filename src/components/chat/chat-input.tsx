"use client";
import { Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { Plus } from "lucide-react";
import axios from "axios";
import { useState } from 'react';
import qs from 'query-string';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormControl, Form, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";

}
const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({ apiUrl, name, type, query }: ChatInputProps) => {
  const register = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
        const url=qs.stringifyUrl({
            url:apiUrl,
            query
        })
        await axios.post(url,value)
        console.log(url)
        register.reset()
    } catch (error) {
        console.log(error)
    }
  };
  const [open,setOpen]=useState(false)
  const isLoading = register.formState.isSubmitting;
  return (
    <Form {...register}>
      <form onSubmit={register.handleSubmit(onSubmit)}>
        <FormField
          control={register.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => {}}
                    className=" absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600
                            dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center
                            "
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    disabled={isLoading}
                    className=" px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0
                  text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message  #${name}`}
                    {...field}  
                    
                  />
                  <div className='hidden md:block w-10 h-10 absolute top-9 right-[22rem]  '><EmojiPicker className='absolute z-10    -top-[500px] '  open={open} onEmojiClick={(emoji)=>register.setValue( "content", `${register.getValues("content")} ${emoji.emoji}`) } /> </div> 
                  <div  className='hidden md:block size-5  top-7 right-8 rounded-2xl absolute '> <button type="button" className='relative' onClick={()=>{
                    setOpen((prev)=>!prev)}}> <Smile className='w-5 h-5' /> </button> </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
