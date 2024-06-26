
import { auth } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handelAuth=()=>{
    const {userId}=auth()
    if(!userId) throw new Error("unauthorized")
        return{userId:userId}
}
 

export const ourFileRouter = {
serverImage:f({image:{maxFileSize:'4MB',maxFileCount:1}})
.middleware(()=>handelAuth())
.onUploadComplete(()=>{}),
messageFile:f(['image','pdf'])
.middleware(()=>handelAuth())
.onUploadComplete(()=>{})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;