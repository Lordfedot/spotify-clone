import { Playlist } from "@/types";
import { create } from "zustand";

interface EditPlaylistModalStore {
  playlist?: Playlist;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setPlaylist: (playlist: Playlist) => void;
}

const useEditPlaylistModal = create<EditPlaylistModalStore>((set) => ({
  playlist: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setPlaylist: (playlist: Playlist) => set({ playlist }),
}));

export default useEditPlaylistModal;
