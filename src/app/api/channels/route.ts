import { currentProfil } from "@/lib/current-profil";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth, redirectToSignIn } from "@clerk/nextjs/server";

 export  async function POST(req:Request){
const {name,type}= await req.json()
const profil=currentProfil()
if(!profil){
    auth().redirectToSignIn()
}

}