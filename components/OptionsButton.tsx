import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

const OptionsButton = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdown, setIsDropdown] = useState(false);

  const handleToggleDropdown: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsDropdown(!isDropdown);

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
    <div ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className="opacity-0 group-hover:opacity-100 rounded-full p-2 hover:bg-neutral-400/20"
      >
        <SlOptionsVertical size={16} />
      </button>
      {isDropdown && (
        <ul className="absolute top-30 -left-142 bg-neutral-800 px-2 py-5 w-[200px] z-50">
          <li className="hover:bg-neutral-700">
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
