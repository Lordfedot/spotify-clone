import { FaPlay, FaPause} from "react-icons/fa";

const PlayButton = () => {
  const Icon = false ? FaPlay : FaPause
  return (
    <button className="transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:tranclate-y-0 hover:scale-110">
      <Icon className="text-black" />
    </button>
  );
};

export default PlayButton;
