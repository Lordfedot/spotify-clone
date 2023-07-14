import Image from "next/image";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import img from "@/public/images/liked.png";
import { useUser } from "@/hooks/useUser";
import { Playlist } from "@/types";
import useDeleteFromPlaylistModal from "@/hooks/useDeleteFromPlaylistModal";
import useIdForPlaylist from "@/hooks/useIdForPlaylist";

import Modal from "./Modal";

const DeleteFromPlaylistModal = () => {
  const { isOpen, onClose } = useDeleteFromPlaylistModal();
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();
  const router = useRouter();
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
  const { id: idForPlaylist } = useIdForPlaylist();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleRemoveFromPlaylist = async (
    songId: string,
    playlistId: string
  ) => {
    const { error } = await supabaseClient
      .from("playlisted_songs")
      .delete()
      .eq("user_id", user?.id)
      .eq("playlist_id", playlistId)
      .eq("song_id", songId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Removed from playlist");
      onClose();
    }
  };

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchPlaylists = async () => {
      const { data, error } = await supabaseClient
        .from("playlisted_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", idForPlaylist);

      if (!error && data) {
        const ids = data.map((playlist) => playlist.playlist_id);
        const { data: playlistData, error: playlistError } =
          await supabaseClient
            .from("playlists")
            .select("*")
            .eq("user_id", user.id)
            .in("id", ids);

        if (!playlistError && playlistData) {
          setPlaylists(playlistData);
        }
      }
    };
    if (isOpen) {
      fetchPlaylists();
    }
  }, [idForPlaylist, supabaseClient, user?.id, isOpen]);

  return (
    <Modal
      description=""
      isOpen={isOpen}
      title="Remove song from playlists"
      onChange={onChange}
    >
      <div className="relative">
        <ul>
          {playlists?.map((playlist) => (
            <li
              onClick={() =>
                handleRemoveFromPlaylist(idForPlaylist!, playlist.id)
              }
              className="flex items-center overflow-hidden justify-between gap-x-3 cursor-pointer opacity-100 hover:opacity-80 w-full p-2 rounded-md"
              key={playlist.id}
            >
              <div className="flex items-center  gap-x-3  w-[calc(100%-28px)] overflow-hidden">
                <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                  <Image
                    sizes="100%"
                    className="object-cover"
                    fill
                    alt={"data.title"}
                    src={img}
                  />
                </div>
                <div className="flex flex-col gap-y-1 overflow-hidden w-full">
                  <p className="text-white truncate w-full block">
                    {playlist.title}
                  </p>
                  <p className="text-neutral-400 text-sm truncate block  w-full">
                    {playlist.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default DeleteFromPlaylistModal;
