"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";

type Props = {
  songs: Song[];
};

const LikedContent = ({ songs }: Props) => {
  const router = useRouter();
  const { user, isLoading } = useUser();

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
        <li className="flex items-center gap-x-4 w-full" key={song.id}>
          <div className="flex-1">
            <MediaItem onClick={() => {}} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </li>
      ))}
    </ul>
  );
};

export default LikedContent;
