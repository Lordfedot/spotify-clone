import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Song } from "@/types";
import { cookies } from "next/headers";

export const getPlaylistSongs = async (playlistId: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from("playlisted_songs")
    .select("*, songs(*)")
    .eq("user_id", sessionData.session?.user.id)
    .eq("playlist_id", playlistId)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error.message);
  }
  if (!data) {
    return [];
  }
  return data.map((item) => ({
    ...item.songs,
  }));
};

export default getPlaylistSongs;
