import usePlaylistsModal from "@/hooks/usePlaylistsModal";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

const OptionsButton = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdown, setIsDropdown] = useState(false);
  const { onOpen } = usePlaylistsModal();

  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
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
    <div onClick={stopPropagation} ref={dropdownRef}>
      <button
        onClick={() => setIsDropdown(!isDropdown)}
        className="opacity-0 group-hover:opacity-100 rounded-full p-2 hover:bg-neutral-400/20"
      >
        <SlOptionsVertical size={16} />
      </button>
      {isDropdown && (
        <ul className="absolute top-[30px] -left-[142px] bg-neutral-800 px-2 py-5 w-[200px] z-50 flex flex-col gap-2">
          <li
            onClick={() => {
              onOpen();
              setIsDropdown(false);
            }}
            className="hover:bg-neutral-700"
          >
            <p>Add to playlist +</p>
          </li>
          <li className="hover:bg-neutral-700">
            <p>Delete from playlist</p>
          </li>
        </ul>
      )}
    </div>
  );
};

export default OptionsButton;
