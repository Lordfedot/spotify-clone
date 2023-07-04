import { PlayFunction } from "use-sound/dist/types";
import { create } from "zustand";

interface PlayerStore {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (id: string[]) => void;
  reset: () => void;
  pause: (() => void) | null;
  play: (() => void) | null;
  setPause: (pauseFunc: (() => void) | null) => void;
  setPlay: (playFunc: (() => void) | null) => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  pause: null,
  play: null,
  setPause: (pauseFunc) => set({ pause: pauseFunc }),
  setPlay: (playFunc) => set({ play: playFunc }),
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying: isPlaying }),
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;
