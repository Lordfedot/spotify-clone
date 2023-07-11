import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Playlist } from "@/types";
import { cookies } from "next/headers";

export const getPlaylistById = async (
  playlistId: string
): Promise<Playlist | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    console.log(sessionError.message);
    return null;
  }

  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("id", playlistId)
    .eq("user_id", sessionData.session?.user.id)
    .single();
  if (error) {
    console.log(error.message);
  }
  return data as any;
};

export default getPlaylistById;
