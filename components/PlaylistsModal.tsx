import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import usePlaylistsModal from "@/hooks/usePlaylistsModal";
import img from "@/public/images/liked.png";
import useAddPlaylistModal from "@/hooks/useAddPlaylistModal";
import { useUser } from "@/hooks/useUser";
import { Playlist } from "@/types";

import Modal from "./Modal";
import Button from "./Button";
import toast from "react-hot-toast";
import useIdForPlaylist from "@/hooks/useIdForPlaylist";

const PlaylistsModal = () => {
  const AddPlaylistModal = useAddPlaylistModal();
  const { isOpen, onClose } = usePlaylistsModal();
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

  const handleAddSongToPlaylist = async (
    songId: string,
    playlistId: string
  ) => {
    const { data } = await supabaseClient
      .from("playlisted_songs")
      .select("*, songs(*)")
      .eq("user_id", user?.id)
      .eq("playlist_id", playlistId);
    if (data) {
      const checkSong = data.find((item) => item.songs.id === songId);
      if (checkSong) {
        return toast.error("This song is already in this playlist");
      }
    }

    const { error } = await supabaseClient
      .from("playlisted_songs")
      .insert({ user_id: user?.id, playlist_id: playlistId, song_id: songId });
    if (error) {
      return toast.error(error.message);
    } else {
      return toast.success("Added to playlist! ♥");
    }
  };

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchPlaylists = async () => {
      const { data, error } = await supabaseClient
        .from("playlists")
        .select("*")
        .eq("user_id", user.id);

      if (!error && data) {
        setPlaylists(data);
      }
    };
    fetchPlaylists();
  }, [supabaseClient, user?.id]);

  return (
    <Modal
      description=""
      isOpen={isOpen}
      title="Add songs to playlist"
      onChange={onChange}
    >
      <div className="relative">
        <div
          onClick={() => {
            router.push("/liked");
            onClose();
          }}
          className="flex items-center overflow-hidden justify-between gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
        >
          <div className="flex items-center  gap-x-3 overflow-hidden">
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
              <p className="text-white truncate w-full block">Liked songs</p>
              <p className="text-neutral-400 text-sm truncate block  w-full">
                Songs
              </p>
            </div>
          </div>
        </div>
        <h2>All playlists</h2>
        <ul>
          {playlists?.map((playlist) => (
            <li
              onClick={() =>
                handleAddSongToPlaylist(idForPlaylist!, playlist.id)
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

        <Button
          onClick={() => AddPlaylistModal.onOpen()}
          className="sticky bottom-1 ml-auto right-1 w-[130px] flex items-center justify-between text-sm"
        >
          <AiOutlinePlus size={16} />
          New playlist
        </Button>
      </div>
    </Modal>
  );
};

export default PlaylistsModal;
