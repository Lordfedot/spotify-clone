import Header from "@/components/Header";

import LibraryContent from "./components/LibraryContent";
import getSongsByUserId from "@/actions/GetSongsByUserId";
import getPlaylists from "@/actions/getPlaylistsByUserId";

const Library = async () => {
  const songs = await getSongsByUserId();
  const playlists = await getPlaylists()
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header />
      <div className="px-6">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Your playlists and songs
          </h1>
        </div>
        <LibraryContent playlists={playlists} songs={songs} />
      </div>
    </div>
  );
};

export default Library;
