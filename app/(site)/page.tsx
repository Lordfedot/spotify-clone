import Header from "@/components/Header";
import getPlaylists from "@/actions/getPlaylistsByUserId";

import getSongs from "@/actions/GetSongs";
import PageContent from "./components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  const playlists = await getPlaylists()
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header />
      <PageContent playlists={playlists} songs={songs} />
    </div>
  );
}
