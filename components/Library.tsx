"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { Song } from "@/types";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";

import MediaItem from "./MediaItem";

type Props = {
  songs: Song[];
};

const Library = ({ songs }: Props) => {
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user, subscription } = useUser();
  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className=" text-neutral-500 font-medium">Your library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      {!user && (
        <p className="text-neutral-300 font-medium self-center mt-4 px-2">
          To get access to your music or to add new song, please, authorized ☺!
        </p>
      )}
      {user && (
        <ul className="flex flex-col gap-y-2 mt-4 px-3">
          {songs.map((song) => (
            <MediaItem
              onClick={(id: string) => onPlay(id)}
              data={song}
              key={song.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Library;
