import { create } from "zustand";

interface DeleteFromPlaylistModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useDeleteFromPlaylistModal = create<DeleteFromPlaylistModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteFromPlaylistModal;