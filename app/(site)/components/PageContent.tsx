"use client";
import Glider from "react-glider";
import "../../globals.css";

import ListItem from "@/components/ListItem";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Playlist, Song } from "@/types";

type Props = {
  songs: Song[];
  playlists: Playlist[];
};

const PageContent = ({ songs, playlists }: Props) => {
  const onPlay = useOnPlay(songs);
  const { user } = useUser();
  if (songs.length === 0) {
    return <p className="mt-4 text-neutral-400">No songs available</p>;
  }
  return (
    <div className="px-6">
      <h1 className="text-white text-3xl font-semibold mb-4"> Welcome back</h1>
      {user && (
        <Glider
          hasDots
          draggable
          hasArrows
          slidesToShow={1}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 424,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
          ]}
        >
          <ListItem href="liked" name="Liked Songs" image="/images/liked.png" />
          {playlists.map(({ id, title }) => (
            <ListItem
              image="/images/liked.png"
              name={title}
              key={id}
              href={`playlist/${id}`}
            />
          ))}
        </Glider>
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
