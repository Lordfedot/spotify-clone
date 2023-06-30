"use client";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

type Props = {
  songs: Song[];
};

const PageContent = ({ songs }: Props) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return <p className="mt-4 text-neutral-400">No songs available</p>;
  }
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((song) => (
        <SongItem onClick={(id) => onPlay(id)} data={song} key={song.id} />
      ))}
    </ul>
  );
};

export default PageContent;
