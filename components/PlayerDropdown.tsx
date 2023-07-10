import Image from "next/image";
import { twMerge } from "tailwind-merge";

import { Song } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";

import MediaItem from "./MediaItem";
import PlayButton from "./PlayButton";
import { useState } from "react";

type Props = {
  song: Song;
  activeDropdown: boolean;
};

const PlayerDropdown = ({ song, activeDropdown }: Props) => {
  const { songs } = usePlayer();
  const imageUrl = useLoadImage(song);
  const onPlay = useOnPlay(songs!);

  return (
    <div
      className={twMerge(
        `absolute top-0 right-0 px-5 bg-black w-screen translate-y-full h-[calc(100%-80px)] flex justify-center gap-x-5 transition duration-400 overflow-hidden`,
        activeDropdown && `translate-y-0`
      )}
    >
      <div className="w-4/6 hidden md:flex items-end justify-center">
        <div className="relative overflow-hidden h-[400px] w-[400px] cursor-pointer">
          <Image
            className="object-cover"
            src={imageUrl!}
            fill
            sizes="100%"
            alt={song.title}
          />
          <div className="absolute transition inset-0 opacity-0 hover:opacity-100 bg-gradient-to-b from-[#00000099] from-0% via-[#00000040] via-25% to-[#00000000] to-100%"></div>
        </div>
      </div>

      <div className="md:w-2/4 h-full pt-8 w-full">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <h2 className="text-white text-1xl font-semibold after:absolute after:bottom-0 after:right-0  after:w-full after:h-[2px] after:bg-white">
              UP NEXT
            </h2>
          </div>
        </div>
        <ul className="overflow-y-auto h-[calc(100%-40px)] flex flex-col gap-y-2">
          {songs?.map((song) => (
            <li key={song.id} className="group relative ">
              <MediaItem
                className={"bg-neutral-800/50 border-b-[1px] border-green-500"}
                onClick={(id: string) => onPlay(id)}
                key={song.id}
                data={song}
              >
                <div className="absolute left-2 -top-1">
                  <PlayButton songId={song.id} />
                </div>
              </MediaItem>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlayerDropdown;
