import { auth,currentUser } from "@clerk/nextjs/server";
// import { currentUser } from "@clerk/nextjs";
import {db} from '@/lib//db';
import { redirect } from "next/navigation";
export const initialProfile = async ()=>{

    const  user= await currentUser();
if(!user){
    return auth().redirectToSignIn()

}

const profil =await db.profil.findUnique({
    where:{
        userId:user.id
    }
});
if(profil){
    return profil;

}
const newProfil =await db.profil.create({
    data:{
        userId:user.id,
        name:`${user.firstName} ${user.lastName}`,
        imageUrl:user.imageUrl,
        email:user.emailAddresses[0].emailAddress,


    }
});
return newProfil;
}