"use client";

import ListItem from "@/components/ListItem";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";

type Props = {
  songs: Song[];
};

const PageContent = ({ songs }: Props) => {
  const onPlay = useOnPlay(songs);
  const { user } = useUser();
  if (songs.length === 0) {
    return <p className="mt-4 text-neutral-400">No songs available</p>;
  }
  return (
    <div className="px-6">
      <h1 className="text-white text-3xl font-semibold"> Welcome back {user?.email}</h1>
      {user && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
          <ListItem href="liked" name="Liked Songs" image="/images/liked.png" />
        </div>
      )}
      <div className="mt-2 mb-7">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-2xl font-semibold">Newest songs</h2>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
          {songs.map((song) => (
            <SongItem onClick={(id) => onPlay(id)} data={song} key={song.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PageContent;
