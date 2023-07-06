import { create } from "zustand";

interface SubscribeModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useSubscribeModal = create<SubscribeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSubscribeModal;
