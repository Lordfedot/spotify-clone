import { Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
  isPlaying: boolean;
  ids: string[];
  activeId?: string;
  songs?: Song[];
  play: (() => void) | null;
  pause: (() => void) | null;
  reset: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setId: (id: string) => void;
  setIds: (id: string[]) => void;
  setPause: (pauseFunc: (() => void) | null) => void;
  setPlay: (playFunc: (() => void) | null) => void;
  setSongs: (songs: Song[]) => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  isPlaying: false,
  ids: [],
  activeId: undefined,
  songs: [],
  play: null,
  pause: null,
  reset: () => set({ ids: [], activeId: undefined }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying: isPlaying }),
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  setPause: (pauseFunc) => set({ pause: pauseFunc }),
  setPlay: (playFunc) => set({ play: playFunc }),
  setSongs: (songs: Song[]) => set({ songs: songs }),
}));

export default usePlayer;
