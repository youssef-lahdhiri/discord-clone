import { Hash, Menu } from "lucide-react";
import { SocketIndicator } from "../socket-indicator";
import { MobileToggle } from "../mobil-toggle";
interface ChatHeaderProps {
  id: string;
  name: string;
  type: "conversation" | "channel";
  imageUrl?: string;
}
const ChatHeader = ({ id, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={id} />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}{" "}
      <p className="font-semibold text-md text-black dark:text-white ">
        {name}
      </p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
