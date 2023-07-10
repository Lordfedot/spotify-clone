import { create } from "zustand";

interface AddPlaylistModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useAddPlaylistModal = create<AddPlaylistModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddPlaylistModal;
