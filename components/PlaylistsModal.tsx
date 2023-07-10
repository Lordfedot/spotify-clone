import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";


import usePlaylistsModal from "@/hooks/usePlaylistsModal";
import img from "@/public/images/liked.png";
import useAddPlaylistModal from "@/hooks/useAddPlaylistModal";

import Modal from "./Modal";
import Button from "./Button";

const PlaylistsModal = () => {
  const AddPlaylistModal = useAddPlaylistModal();
  const { isOpen, onClose } = usePlaylistsModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      description=""
      isOpen={isOpen}
      title="Add songs to playlist"
      onChange={onChange}
    >
      <div className="relative">
        <h2>All playlists</h2>
        <ul>
          <li
            onClick={() => {}}
            className="flex items-center overflow-hidden justify-between gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
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
                <p className="text-white truncate w-full block">Liked songs</p>
                <p className="text-neutral-400 text-sm truncate block  w-full">
                  Songs
                </p>
              </div>
            </div>
          </li>
        </ul>
        <Button
          onClick={() => AddPlaylistModal.onOpen()}
          className="fixed bottom-5 right-5 w-[150px] flex items-center justify-between gap-2 text-sm"
        >
          <AiOutlinePlus size={16} />
          New playlist
        </Button>
      </div>
    </Modal>
  );
};

export default PlaylistsModal;
