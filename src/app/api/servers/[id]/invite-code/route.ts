import { currentProfil } from "@/lib/current-profil";
import { NextResponse } from "next/server";
import {v4 as uuidv4} from 'uuid';
import { db } from "@/lib/db";
import { subBusinessDays } from "date-fns";

export async function PATCH(req:Request,
    {params}:{params:{
        id:string;

    }}
){
    try {
        const profil=await currentProfil()
        if(!profil){
            return new NextResponse("unauthorized ",{status:401})
        }
        if(!params.id){
            return new NextResponse("sercer id missing ",{status:400

            })
        }
        const server=await db.server.update({
            where: {
                id: params.id,
                profilId: profil.id,
            },
            data: {
                inviteCode:uuidv4()
            }
        })
        return  NextResponse.json(server)
    } catch (error) {
        console.log(error)
        return new NextResponse("internal error",{status:500})
    }
}