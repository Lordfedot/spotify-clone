"use client";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

type Props = {
  songId: string;
};

const LikeButton = ({ songId }: Props) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("song_id", songId)
        .eq("user_id", user.id)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };
    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Liked! ♥");
      }
    }

    router.refresh();
  };
  return (
    <button
      onClick={handleLike}
      className="cursor-pointer hover:opacity-75 transition"
    >
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
