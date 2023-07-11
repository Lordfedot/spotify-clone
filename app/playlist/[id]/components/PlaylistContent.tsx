"use client";
import Image from "next/image";

import { Playlist, Song } from "@/types";
import img from "@/public/images/liked.png";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import LikeButton from "@/components/LikeButton";

type Props = {
  songs: Song[];
  playlist: Playlist;
};

const PlaylistContent = ({ songs, playlist }: Props) => {
  const onPlay = useOnPlay(songs);
  const { user } = useUser();

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <div className="relative aspect-square w-1/4 h-1/4 rounded-md ">
          <Image
            className="object-cover rounded-md"
            src={img}
            alt={playlist.title}
            fill
            sizes="100%"
          />
        </div>
        <div className="flex flex-col gap-2 px-2 py-6">
          <h1 className="text-white text-4xl font-semibold truncate">
            {playlist.title}
          </h1>
          <div>
            <p className="text-neutral-300 text-lg font-normal truncate">
              {user?.email}
            </p>
            <p className="text-neutral-300 text-lg font-normal truncate">
              {songs.length} songs •{" "}
            </p>
          </div>
          <p className="text-neutral-300 text-sm font-normal truncate">
            {playlist.description}
          </p>
        </div>
      </div>
      <ul>
        {songs.map((song) => (
          <li className="flex items-center gap-x-4 w-full" key={song.id}>
            <div className="flex-1 overflow-hidden">
              <MediaItem
                data={song}
                onClick={(id: string) => onPlay(id)}
                className={"bg-neutral-800/50 border-b-[1px] border-green-500"}
              ></MediaItem>
            </div>
            <LikeButton songId={song.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistContent;
