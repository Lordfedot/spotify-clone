"use client";
import { useState } from "react";

import useGetSongById from "@/hooks/useGetSongsById";
import useLoadSongUrl from "@/hooks/useLoadSong";
import usePlayer from "@/hooks/usePlayer";

import PlayerContent from "./PlayerContent";
import PlayerDropdown from "./PlayerDropdown";

const Player = () => {
  const { activeId } = usePlayer();
  const { song } = useGetSongById(activeId);
  const songUrl = useLoadSongUrl(song!);
  const [activeDropdown, setActiveDropdown] = useState(false);

  const toggleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };

  if (!song || !songUrl || !activeId) {
    return null;
  }
  return (
    <>
      <div className="fixed bottom-0 bg-neutral-900 w-full py-2 h-[80px] px-4 z-50">
        <PlayerContent
          activeDropdown={activeDropdown}
          toggleDropdown={toggleDropdown}
          key={songUrl}
          song={song}
          songUrl={songUrl}
        />
      </div>
      <PlayerDropdown activeDropdown={activeDropdown} song={song} />
    </>
  );
};

export default Player;
