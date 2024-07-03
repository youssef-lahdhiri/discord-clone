import { currentProfil } from "@/lib/current-profil";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
interface inviteCodePageProps{
    params:{
        inviteCode:string;
    }
}

const InviteCodePage = async({params}:inviteCodePageProps) => {

const profil=await currentProfil()
if(!profil){
    return redirect('/sign-in')
}
if(!params.inviteCode){
    return(redirect('/'))
}
const existingServer=await db.server.findFirst({
    where:{
        inviteCode:params.inviteCode,
        members:{
            some:{
                profilId:profil.id
            }
        }
    }
})

if(existingServer){
    return redirect(`/servers/${existingServer.id}`)
}
const server=await db.server.update({
where:{
    inviteCode:params.inviteCode
},
data:{
    members:{
        create:{
            profilId:profil.id,
        }
    }
}
})
if (server){
    return redirect(`/servers/${server.id}`)
}
    return null;
}
 
export default InviteCodePage;