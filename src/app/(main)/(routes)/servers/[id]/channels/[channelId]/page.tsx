import { currentProfil } from "@/lib/current-profil";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ChatHeader from "@/components/chat/chat-header";
import {ChatInput} from '@/components/chat/chat-input';
import { ChatMessages } from "@/components/chat/chat-messages";

interface ChannelIdPageProps {
  params: {
    channelId: string;
    id: string;
  };
}
const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profil = await currentProfil();
  if (!profil) {
    return auth().redirectToSignIn();
  }
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });
  const member = await db.member.findFirst({
    where: {
      serverId: params.id,
      profilId: profil.id,
    },
  });
  if (!channel || !member) {
    redirect("/");
  }
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader name={channel.name} id={channel.serverId} type="channel" />
      <ChatMessages member={member} 
      name={channel.id}
      chatId={channel.id}
      type='channel' 
      apiUrl='/api/messages'
      socketUrl="/api/soket/messages"
      socketQuery={{channelId:channel.id,
        serverId:channel.serverId
      }}
      paramKey="channelId"
      paramValue={channel.id}
      />
      <ChatInput name={channel.name} 
      type='channel'
      apiUrl='/api/socket/messages'
      query={{channelId:channel.id,
        serverId:channel.serverId
      }} />
    </div>
  );
};

export default ChannelIdPage;
