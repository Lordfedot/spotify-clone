import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

import useIdForPlaylist from "@/hooks/useIdForPlaylist";
import usePlaylistsModal from "@/hooks/usePlaylistsModal";
import useDeleteFromPlaylistModal from "@/hooks/useDeleteFromPlaylistModal";

type Props = {
  songId: string;
};

const OptionsButton = ({ songId }: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setId } = useIdForPlaylist();
  const [isDropdown, setIsDropdown] = useState(false);
  const playlistsModal = usePlaylistsModal();
  const deleteModal = useDeleteFromPlaylistModal();

  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  const handleAddToPlaylist = () => {
    playlistsModal.onOpen();
    setId(songId);
    setIsDropdown(false);
  };
  const handleDeleteFromPlaylist = () => {
    deleteModal.onOpen();
    setId(songId);
    setIsDropdown(false);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div onClick={stopPropagation} ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsDropdown(!isDropdown)}
        className="opacity-100 md:opacity-0 group-hover:opacity-100 rounded-full p-2 hover:bg-neutral-400/20"
      >
        <SlOptionsVertical size={16} />
      </button>
      {isDropdown && (
        <ul className="absolute w-[172px] top-[25px] -left-[98px]  md:-left-[165px] rounded-sm bg-neutral-800 px-2 py-5 md:w-[200px] z-50 flex flex-col gap-2">
          <li
            onClick={handleAddToPlaylist}
            className="hover:bg-neutral-700 rounded-sm px-2"
          >
            <p>Add to playlist +</p>
          </li>
          <li
            onClick={handleDeleteFromPlaylist}
            className="hover:bg-neutral-700 rounded-sm px-2"
          >
            <p>Delete from playlist</p>
          </li>
        </ul>
      )}
    </div>
  );
};

export default OptionsButton;
