import { InitialModal } from "@/components/modals/initial-modal";
import { ModeToggle } from "@/components/mode-togle";
import { db } from "@/lib/db";
import  {initialProfile}  from "@/lib/initial-profil";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SetupPage = async() => {
    const profil =  await initialProfile();
    const server =await db.server.findFirst({
        where:{
            members:{
                some:{
                    profilId:profil.id
                }
            }
        }
    });
    if(server){
        return redirect(`/servers/${server.id}`)
    }
    return ( <> <InitialModal/></> );
}
 
export default SetupPage;