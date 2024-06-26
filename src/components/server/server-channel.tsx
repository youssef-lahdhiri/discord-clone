"use client";

import { cn } from "@/lib/utils";
import { MemberRole, Server, Channel, ChannelType } from "@prisma/client";
import { Hash, Mic, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface ServerChannelProps {
  server: Server;
  role?: MemberRole;
  channel: Channel;
}
const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VEDIO]: Video,
};
const ServerChannel = ({ server, role, channel }: ServerChannelProps) => {
  const router = useRouter();
  const params = useParams();
  const Icon = iconMap[channel.type];
  const onClick=()=>{
    router.push(`/servers/${params?.id}/channels/${channel.id}`)
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover=zinc-700/50 transition mb-1 ",
        params?.channelId===channel.id && 'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500  dark:text-zinc-400" />
      <p className={cn("line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark-group:text-zinc-300 transition",
params?.channelId==channel.id &&'text-primary dark:text-zinc-200 dark:group-hover:text-white'

      )}>
        {channel.name}
      </p>
    </button>
  );
};

export default ServerChannel;
