"use client";
import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

import PlayButton from "./PlayButton";

type Props = {
  data: Song;
  onClick: (id: string) => void;
};

const SongItem = ({ data, onClick }: Props) => {
  const imagePath = useLoadImage(data);
  return (
    <li
      onClick={() => onClick(data.id)}
      className="flex relative group flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          sizes="100%"
          fill
          alt={data.title}
          src={imagePath || "/public/images/liked.png"}
          className="object-cover "
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-2">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm pb-4 w-full  truncate">
          By {data.author}
        </p>
      </div>
      <div className="absolute bottom-31 right-5">
        <PlayButton songId={data.id} />
      </div>
    </li>
  );
};

export default SongItem;
