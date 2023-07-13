"use client";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IoIosArrowUp } from "react-icons/io";
import useSound from "use-sound";
import { twMerge } from "tailwind-merge";

import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import { convertTimeToNumber } from "@/helpers/convertTime";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";

type Props = {
  song: Song;
  songUrl: string;
  toggleDropdown: Dispatch<SetStateAction<boolean>>;
  activeDropdown: boolean;
};

const PlayerContent = ({
  song,
  songUrl,
  toggleDropdown,
  activeDropdown,
}: Props) => {
  const [volume, setVolume] = useState(
    parseFloat(localStorage.getItem("volume")!) || 1
  );
  const [currentTime, setCurrentTime] = useState<number>(0);

  const { isPlaying, setIsPlaying, ids, setId, activeId, setPlay, setPause } =
    usePlayer();

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    setPause(pause);
    setPlay(play);
  }, [setPause, setPlay, pause, play]);

  useEffect(() => {
    if (sound) {
      sound.play();

      const interval = setInterval(() => {
        const seekedTime = sound?.seek();
        setCurrentTime(seekedTime);
      }, 1000);

      return () => {
        clearInterval(interval);
        sound?.unload();
      };
    }
  }, [sound]);

  useEffect(() => {
    localStorage.setItem("volume", volume.toString());
  }, [volume]);

  const handleOnChangeBar = (newValue: number[]) => {
    setCurrentTime(Number(newValue));
    sound?.seek(newValue);
  };
  const handlePlay = useCallback(() => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }, [isPlaying, play, pause]);

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const onPlayNext = () => {
    if (ids.length === 0) {
      return;
    }
    const currentIndex = ids.findIndex((id) => id === activeId);
    const nextSong = ids[currentIndex + 1];

    if (!nextSong) {
      return setId(ids[0]);
    }
    setId(nextSong);
  };
  const onPlayPrevious = () => {
    if (ids.length === 0) {
      return;
    }
    const currentIndex = ids.findIndex((id) => id === activeId);
    const previousSong = ids[currentIndex - 1];

    if (!previousSong) {
      return setId(ids[ids.length - 1]);
    }
    setId(previousSong);
  };

  const maxDuration = convertTimeToNumber(song.duration);
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  return (
    <div className="grid grid-cols-[1fr_4fr] md:grid-cols-[1fr_3fr_1fr] gap-4 h-full">
      <Slider
        max={maxDuration}
        value={currentTime}
        className="absolute left-0 top-[-12px]"
        onChange={handleOnChangeBar}
      />

      <div className="flex md:hidden col-auto w-full justify-center items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white cursor-pointer p-1"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="hidden h-full md:flex justify-center items-center w-full gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="cursor-pointer text-neutal-400 cursor-poiner hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          size={30}
          onClick={onPlayNext}
          className="cursor-pointer text-neutal-400 cursor-poiner hover:text-white transition"
        />
      </div>

      <div className="flex w-full justify-start items-center gap-2 overflow-hidden">
        <MediaItem
          options
          like
          onClick={toggleDropdown}
          currentTime={currentTime}
          data={song}
        >
          <IoIosArrowUp
            size={20}
            className={twMerge(
              `transition duration-400`,
              activeDropdown && "-rotate-180"
            )}
          />
        </MediaItem>
      </div>

      <div className="hidden items-center md:flex w-full justify-end">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            size={34}
            onClick={toggleMute}
            className="cursor-pointer "
          />
        </div>
        <Slider value={volume} onChange={(value: number) => setVolume(value)} />
      </div>
    </div>
  );
};

export default PlayerContent;
