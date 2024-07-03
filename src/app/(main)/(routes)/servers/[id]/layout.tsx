
import { currentProfil } from "@/lib/current-profil";
import { redirect, useParams } from "next/navigation";
import { db } from "@/lib/db";
import ServerSideBar from '@/components/server/server-sidebar';



const ServerIdLayout = async({children,params}:{children:React.ReactNode,params:{id:string}}) => {
    // const params=useParams()
const profil = await currentProfil()
if(!profil){
    redirect('/sign-in')
}
const server=await db.server.findUnique({
    where:{
        id:params.id,
        members:{
            some:{
             profilId:profil.id,   
            }
        }
    }
})
if(!server){
    redirect('/')
}
    return (<div className="h-full">
        <div className=" md:block  hidden md-flex h-full w-60 z-20 flex-col  fixed inset-y-0">

        <ServerSideBar serverId={params.id} />


        </div>
        
        <main className="h-full md:pl-60">
        {children} 
    
    </main>
    
    </div>  );
}
 
export default ServerIdLayout;