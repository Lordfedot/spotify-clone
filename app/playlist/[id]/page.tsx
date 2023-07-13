import getPlaylistSongs from "@/actions/getPlaylistSongs";
import getPlaylistById from "@/actions/getPlaylistById";
import Header from "@/components/Header";

import PlaylistContent from "./components/PlaylistContent";

type Props = {
  params: {
    id: string;
  };
};

const PlaylistPage = async ({ params: { id } }: Props) => {
  const playlistSongs = await getPlaylistSongs(id);
  const playlist = await getPlaylistById(id);
  if (!playlist || !playlistSongs) {
    return null;
  }
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header />
      <div className="px-6">
        <PlaylistContent playlist={playlist} songs={playlistSongs} />
      </div>
    </div>
  );
};

export default PlaylistPage;
