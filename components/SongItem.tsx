"use client";
import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

import PlayButton from "./PlayButton";
import OptionsButton from "./OptionsButton";

type Props = {
  data: Song;
  onClick: (id: string) => void;
};

const SongItem = ({ data, onClick }: Props) => {
  const imagePath = useLoadImage(data);
  return (
    <li
      onClick={() => onClick(data.id)}
      className="flex relative group flex-col items-center justify-center rounded-md gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md">
        <Image
          sizes="100%"
          fill
          alt={data.title}
          src={imagePath || "/public/images/liked.png"}
          className="object-cover "
        />
        <div className="w-full h-full absolute transition inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-[#00000099] from-0% via-[#00000040] via-25% to-[#00000000] to-100%"></div>
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
      <div className="absolute top-5 right-5">
        <OptionsButton songId = {data.id}/>
      </div>
    </li>
  );
};

export default SongItem;
