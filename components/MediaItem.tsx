"use client";
import Image from "next/image";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { convertTime } from "@/helpers/convertTime";

type Props = {
  data: Song;
  onClick?: Function;
  currentTime?: number;
  children?: ReactNode;
  className?: string;
};

const MediaItem = ({
  data,
  onClick,
  currentTime,
  children,
  className,
}: Props) => {
  const { activeId } = usePlayer();
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  };
  const convertedTime = convertTime(Number(currentTime));
  const currentSong = activeId === data.id;
  return (
    <div
      onClick={handleClick}
      className={twMerge(
        `flex items-center overflow-hidden justify-between gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md`,
        currentSong ? className : "border-b-[1px] border-neutral-400 "
      )}
    >
      <div className="flex items-center  gap-x-3  w-[calc(100%-28px)] overflow-hidden">
        <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
          <Image
            sizes="100%"
            className="object-cover"
            fill
            alt={data.title}
            src={imageUrl || "/public/images/liked.png"}
          />
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden w-full">
          <p className="text-white truncate w-full block">{data.title}</p>
          <p className="text-neutral-400 text-sm truncate block  w-full">
            {data.author}
          </p>
        </div>
      </div>
      <div className="justify-self-end">
        {currentTime ? (
          <p className="text-neutral-400 text-sm truncate hidden md:block">
            {convertedTime} - {data.duration}
          </p>
        ) : (
          <p className="text-neutral-400 text-sm truncate hidden md:block">
            {data.duration}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

export default MediaItem;
