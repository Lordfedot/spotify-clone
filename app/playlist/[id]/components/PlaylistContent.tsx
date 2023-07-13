"use client";
import Image from "next/image";
import { MdOutlineModeEditOutline } from "react-icons/md";

import { Playlist, Song } from "@/types";
import img from "@/public/images/liked.png";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { convertTime } from "@/helpers/convertTime";
import Button from "@/components/Button";
import useEditPlaylistModal from "@/hooks/useEditPlaylistModal";

type Props = {
  songs: Song[];
  playlist: Playlist;
};

const PlaylistContent = ({ songs, playlist }: Props) => {
  const onPlay = useOnPlay(songs);
  const { user } = useUser();
  const {
    onOpen,
    setPlaylist,
  } = useEditPlaylistModal();

  const totalDuration = songs.reduce((total, song) => {
    const [minutes, seconds] = song.duration.split(":").map(Number);
    return total + minutes * 60 + seconds;
  }, 0);

  const formatedTotalDuration = convertTime(totalDuration);

  return (
    <>
      <div className="flex gap-2 mb-4 items-center overflow-hidden">
        <div className="relative h-44 w-44 sm:h-56 sm:w-56 md:h-44 md:w-44 lg:h-56 lg:w-56">
          <Image
            className="object-cover rounded-md"
            src={img}
            alt={playlist.title}
            fill
            sizes="100%"
          />
        </div>
        <div className="flex flex-col gap-y-3 overflow-hidden self-start">
          <h1 className="text-white text-2xl md:text-4xl font-semibold truncate">
            {playlist.title}
          </h1>
          <div>
            <p className="text-neutral-300 text-lg font-normal truncate">
              {user?.email}
            </p>
            <p className="text-neutral-300 text-lg font-normal truncate">
              {songs.length} songs • {formatedTotalDuration}
            </p>
          </div>
          <p className="text-neutral-300 text-sm font-normal truncate">
            {playlist.description}
          </p>
          <Button
            onClick={() => {
              setPlaylist(playlist);
              onOpen();
            }}
            className="w-[100px] p-1 bg-white flex items-center gap-1 justify-center"
          >
            <MdOutlineModeEditOutline className="inline" size={16} />
            Edit
          </Button>
        </div>
      </div>
      <ul>
        {songs.map((song) => (
          <MediaItem
            key={song.id}
            options
            like
            play
            data={song}
            onClick={(id: string) => onPlay(id)}
            className={"bg-neutral-800/50 border-b-[1px] border-green-500"}
          />
        ))}
      </ul>
    </>
  );
};

export default PlaylistContent;
