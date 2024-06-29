
import { currentProfil } from "@/lib/current-profil";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth, redirectToSignIn } from "@clerk/nextjs/server";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

 export  async function POST(req:Request){

try{  
const profil= await currentProfil()  
const {name,type}= await req.json()
const {searchParams}=new URL(req.url)
const serverId=searchParams.get("id")
console.log(`SERVER ID :${serverId}`)

if(!profil){
    return new NextResponse('unauthorized',{status:401})
}
if(!serverId){
    return new NextResponse("Server ID missing",{status:400})
}
if(name==='general'){
    return new NextResponse("name cannot be 'general",{status:400})
}
const server=await db.server.update({
    where:{
        id:serverId,
        members:{
            some:{
                profilId:profil.id,
                role:{
                    in:[MemberRole.ADMIN]
                }
            }
        }},
    data:{
        channels:{
            create:{
                profilId:profil.id,
                name,
                type,

            }
        }
    }
    
})
return  NextResponse.json(server)
}
catch(error){
    console.log("CHANNEL_POST",error)
    return new NextResponse('internal error ',{status:500})
}
}