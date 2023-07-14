"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

type Props = {
  songs: Song[];
};

const LikedContent = ({ songs }: Props) => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, router, user]);

  if (songs.length === 0) {
    return (
      <p className="flex flex-col gap-y-2 w-full px-6 text-neutral-600">
        No liked songs
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => (
        <MediaItem
          like
          options
          play
          key={song.id}
          onClick={(id: string) => onPlay(id)}
          data={song}
        />
      ))}
    </ul>
  );
};

export default LikedContent;
