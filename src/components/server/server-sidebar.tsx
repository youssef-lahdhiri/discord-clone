import { currentProfil } from "@/lib/current-profil";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import ServerHeader from "@/components/server/server-header";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import ServerSearch from "./server-search";
import { Hash, Mic, Shield, ShieldCheck, Video } from "lucide-react";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VEDIO]: <Video className="mr-2 h-4 w-4" />,
};
const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.ADMIN]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
  [MemberRole.MEMBER]: null,
};

const ServerSideBar = async ({ serverId }: { serverId: string }) => {

  const profil = await currentProfil();
  if (!profil) {
    return redirect("/");
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profil: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const vediochannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VEDIO
  );
  const members = server?.members.filter(
    (member) => member.profilId !== profil.id
  );
  if (!server) {
    return redirect("/");
  }
  const role = server.members.find(
    (member) => member.profilId === profil.id
  )?.role;
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />

      <ScrollArea>
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "text channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "audio channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "video channels",
                type: "channel",
                data: vediochannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profil.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-700 rounded-md my-2" />
        {!!textChannels?.length &&( <div>
            <ServerSection sectionType="channels" 
            channelType={ChannelType.TEXT}
            role={role}
            label="text channels"
            />
            {textChannels.map((channel)=>(
                <ServerChannel
                server={server}
                key={channel.id}
                channel={channel}
                role={role}

                
                ></ServerChannel>
            ))}

       </div> )}
        {!!audioChannels?.length &&( <div>
            <ServerSection sectionType="channels" 
            channelType={ChannelType.TEXT}
            role={role}
            label="audio channels"
            />
            {audioChannels.map((channel)=>(
                <ServerChannel
                server={server}
                key={channel.id}
                channel={channel}
                role={role}

                
                ></ServerChannel>
            ))}

       </div> )}
        {!!vediochannels?.length &&( <div>
            <ServerSection sectionType="channels" 
            channelType={ChannelType.TEXT}
            role={role}
            label="video channels"
            />
            {vediochannels.map((channel)=>(
                <ServerChannel
                server={server}
                key={channel.id}
                channel={channel}
                role={role}

                
                ></ServerChannel>
            ))}

       </div> )}
       
      </ScrollArea>
    </div>
  );
};

export default ServerSideBar;
