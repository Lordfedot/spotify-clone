import { create } from "zustand";

interface PlaylistStore {
  id?: string;
  setId: (id: string) => void;
}

const useIdForPlaylist = create<PlaylistStore>((set) => ({
  id: undefined,
  setId: (id: string) => set({ id: id }),
}));

export default useIdForPlaylist;
