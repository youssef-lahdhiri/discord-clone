import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentProfil } from "@/lib/current-profil";
import NavigationAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigatio-item";
import Image from "next/image";
import { ModeToggle } from "../mode-togle";
import { UserButton } from "@clerk/nextjs";

export const NavigationSideBar = async () => {
  const profil = await currentProfil();
  if (!profil) {
    return redirect("/");
  }
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profilId: profil.id,
        },
      },
    },
  });
  return (
    <div
      className="space-y-4 flex flex-col items-center h-full text-primary w-full
        dark:bg-[#1e1f22] py-3"
    >
      {" "}
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div className="mb-4" key={server.id}>
            <NavigationItem
              serverName={server.serverName}
              imageUrl={server.imageUrl}
              id={server.id}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4 ">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};
