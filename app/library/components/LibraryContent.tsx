"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Playlist, Song } from "@/types";
import img from "@/public/images/liked.png";
import { useUser } from "@/hooks/useUser";

type Props = {
  songs: Song[];
  playlists: Playlist[];
};

const LibraryContent = ({ songs, playlists }: Props) => {
  const router = useRouter();
  const onPlay = useOnPlay(songs);
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, router, user]);

  return (
    <div className="px-6">
      <div className="mt-2 mb-7 px-6">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
          {playlists.map((playlist) => (
            <li
              onClick={() => router.push(`/playlist/${playlist.id}`)}
              key={playlist.id}
              className="flex relative group flex-col items-center justify-center rounded-md gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
            >
              <div className="relative aspect-square w-full h-full rounded-md">
                <Image
                  sizes="100%"
                  fill
                  alt={playlist.title}
                  src={img}
                  className="object-cover "
                />
                <div className="w-full h-full absolute transition inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-[#00000099] from-0% via-[#00000040] via-25% to-[#00000000] to-100%"></div>
              </div>
              <div className="flex flex-col items-start w-full pt-4 gap-y-2">
                <p className="font-semibold truncate w-full">
                  {playlist.title}
                </p>
                <p className="text-neutral-400 text-sm pb-4 w-full  truncate">
                  Playlist
                </p>
              </div>
            </li>
          ))}
          {songs.map((song) => (
            <SongItem onClick={(id) => onPlay(id)} data={song} key={song.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LibraryContent;
