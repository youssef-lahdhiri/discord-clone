import { currentProfil } from "@/lib/current-profil"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"


export default async function Page({params}:{params:{id:string}}) {
  const profil=await currentProfil()
  const server= await db.server.findUnique({
    where:{
      id:params.id

    },
    include:{
      channels:{
        where:{
          name:'general'
        },
      orderBy:{
        createdAt:'asc'
      }
    }
      },
      

  })
  const initialChannel=server?.channels[0]

    return redirect(`/servers/${params?.id}/channels/${initialChannel?.id}`)
  }