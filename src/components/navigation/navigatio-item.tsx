"use client";
import Image from "next/image";
import { Tooltip } from "../ui/tooltip";
import { ActionTooltip } from "../action-tooltip";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationItemProps {
  id: string;
  serverName: string;
  imageUrl: string;
}

const NavigationItem = ({ serverName, imageUrl, id }: NavigationItemProps) => {
  const route = useRouter();
  const params = useParams();
  const onClick = () => {
    route.push(`/servers/${id}`);
  };
  return (
    <ActionTooltip label={serverName} side="right" align="center">
      <button className="group relative flex items-center" onClick={onClick}>
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px] ",
            params?.id !== id && "group-hover:h-[20px]",
            params?.id === id ? "h-[36px] " : "h-[8px]"
          )}
        />
        <div
          className={cn(
            " relative group flex mx-4 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.id === id && "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={imageUrl} alt={serverName} />{" "}
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
