import {v4 as uuidv4} from 'uuid';
import { NextResponse } from "next/server";
import { currentProfil } from "@/lib/current-profil";
import { db } from "@/lib/db";
import { MemberRole } from '@prisma/client';

export async function POST(req:Request){

    try {
        const {name,imageUrl}=await req.json();
        const profil=await currentProfil()
        if(!profil){
            return new NextResponse('Unauthorized ',{status:401})
        }
        const server=await db.server.create({
            data:{
                profilId:profil.id,
                serverName:name,
                imageUrl,
                inviteCode:uuidv4(),
                channels:{
                    create:[
                    {name:'general',profilId:profil.id}
                ]},
                members:{
                    create:[
                        {profilId:profil.id, role:MemberRole.ADMIN}
                    ]
                }
            }
        })
        return NextResponse.json(server)
    } catch (error) {
        console.log("[SERVER_POST ]",error);
        return new NextResponse("Internel Error",{status:500});
        
    }
}