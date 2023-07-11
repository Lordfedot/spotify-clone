import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Playlist } from "@/types";
import { cookies } from "next/headers";

export const getPlaylists = async (): Promise<Playlist[]> => {
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
    .from("playlists")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error.message);
  }
  return (data as any) || [];
};

export default getPlaylists;
