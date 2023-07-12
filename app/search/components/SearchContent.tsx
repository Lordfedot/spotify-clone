"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

type Props = {
  songs: Song[];
};

const SearchContent = ({ songs }: Props) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return (
      <p className="flex mt-3  flex-col gap-y-2 w-full px-6 text-neutral-400">
        Sorry! No songs found
      </p>
    );
  }
  return (
    <ul className=" mt-3 flex flex-col gap-y-2 w-full px-1 md:px-6">
      {songs.map((song) => (
        <MediaItem
          options
          like
          play
          key={song.id}
          data={song}
          onClick={(id: string) => onPlay(id)}
          className={"bg-neutral-800/50 border-b-[1px] border-green-500"}
        />
      ))}
    </ul>
  );
};

export default SearchContent;
