import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return  <div><div> <p className="text-black">Login Daten zum Testen: Email:test+clerk_test@example.com Password:testdiscordclone</p>
   <p className="text-black">Email:test2+clerk_test@example.com Password:test2discordclone</p></div>
  <SignIn /></div>;
}