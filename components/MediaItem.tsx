"use client";
import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import { convertTime } from "@/helpers/convertTime";

type Props = {
  data: Song;
  onClick?: (id: string) => void;
  currentTime?: number;
};

const MediaItem = ({ data, onClick, currentTime }: Props) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  };
  const convertedTime = convertTime(Number(currentTime));
  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="flex items-center  gap-x-3">
        <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
          <Image
            sizes="100%"
            className="object-cover"
            fill
            alt={data.title}
            src={imageUrl || "/public/images/liked.png"}
          />
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className="text-white truncate">{data.title}</p>
          <p className="text-neutral-400 text-sm truncate ">{data.author}</p>
        </div>
      </div>
      <div className="justify-self-end">
        {currentTime ? (
          <p className="text-neutral-400 text-sm truncate ">
            {convertedTime} - {data.duration}
          </p>
        ) : (
          <p className="text-neutral-400 text-sm truncate ">{data.duration}</p>
        )}
      </div>
    </div>
  );
};

export default MediaItem;
