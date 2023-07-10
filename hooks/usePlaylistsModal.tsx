import { create } from "zustand";

interface PlaylistsModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const usePlaylistsModal = create<PlaylistsModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePlaylistsModal;