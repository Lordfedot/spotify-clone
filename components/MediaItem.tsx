"use client";
import Image from "next/image";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { convertTime } from "@/helpers/convertTime";
import OptionsButton from "./OptionsButton";
import LikeButton from "./LikeButton";
import PlayButton from "./PlayButton";

type Props = {
  data: Song;
  onClick?: Function;
  currentTime?: number;
  className?: string;
  like?: boolean;
  options?: boolean;
  play?: boolean;
};

const MediaItem = ({
  data,
  onClick,
  currentTime,
  like,
  className,
  options,
  play,
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
        `flex items-center relative group minw-[250px] justify-between gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-t-xl`,
        currentSong
          ? className
          : "border-b-[1px] border-neutral-400 last:border-transparent"
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
      <div className="flex gap-2 items-center">
        {options && <OptionsButton songId={data.id} />}
        {currentTime ? (
          <p className="text-neutral-400 text-sm truncate hidden md:block">
            {convertedTime} - {data.duration}
          </p>
        ) : (
          <p className="text-neutral-400 text-sm truncate hidden md:block">
            {data.duration}
          </p>
        )}
        {like && <LikeButton songId={data.id} />}
      </div>
      {play && (
        <div className="absolute left-2 -top-1">
          <PlayButton songId={data.id} />
        </div>
      )}
    </div>
  );
};

export default MediaItem;
