import usePlayer from "@/hooks/usePlayer";
import { FaPlay, FaPause } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

type Props = {
  songId: string;
};

const PlayButton = ({ songId }: Props) => {
  const { isPlaying, activeId, setIsPlaying, play, pause } = usePlayer();
  const activeSong = songId === activeId;

  const Icon = isPlaying && activeSong ? FaPause : FaPlay;
  
  const handlePlay = () => {
    if (play && pause) {
      setIsPlaying(!isPlaying);
      if (!isPlaying) {
        play();
      } else {
        pause();
      }
    }
  };
  return (
    <button
      onClick={handlePlay}
      className={twMerge(
        `transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:tranclate-y-0 hover:scale-110`,
        activeSong && "opacity-100"
      )}
    >
      <Icon size={16} className="text-black" />
    </button>
  );
};

export default PlayButton;
