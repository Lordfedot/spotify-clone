"use client";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";

import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import { convertTimeToNumber } from "@/helpers/convertTime";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";

type Props = {
  song: Song;
  songUrl: string;
};

const PlayerContent = ({ song, songUrl }: Props) => {
  const [volume, setVolume] = useState(1);
  const { isPlaying, setIsPlaying, ids, setId, activeId } = usePlayer();
  const [currentTime, setCurrentTime] = useState<number>(0);

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
  const max = convertTimeToNumber(song.duration);
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <input
        max={max}
        onChange={(e) => {
          setCurrentTime(Number(e.target.value));
          sound.seek(e.target.value);
        }}
        type="range"
        className="absolute top-0 left-0 w-full h-1 color-red-800"
        value={currentTime}
      ></input>

      <div className="flex w-full justify-start">
        <div className="flex w-full items-center gap-x-4">
          <MediaItem currentTime={currentTime} data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white cursor-pointer p-1"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[772px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutal-400 cursor-poiner hover:text-white transition"
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
          className="text-neutal-400 cursor-poiner hover:text-white transition"
        />
      </div>

      <div className="hidden items-center md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            size={34}
            onClick={toggleMute}
            className="cursor-pointer "
          />
        </div>
        <Slider value={volume} onChange={(value) => setVolume(value)} />
      </div>
    </div>
  );
};

export default PlayerContent;
