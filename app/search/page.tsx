import getSongsByTitle from "@/actions/GetSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

type Props = {
  searchParams: {
    title: string;
  };
};

export const revalidate = 0;

const Search = async ({ searchParams }: Props) => {
  const songs = await getSongsByTitle(searchParams.title);
  return (
    <div className="bg-neutral-900 rounded-sm h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900" />
      <div className="px-6">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
        </div>
        <SearchInput />
        <SearchContent songs={songs} />
      </div>
    </div>
  );
};

export default Search;
