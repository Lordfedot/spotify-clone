import usePlaylistsModal from "@/hooks/usePlaylistsModal";
import Modal from "./Modal";

const PlaylistsModal = () => {
  const { isOpen, onClose } = usePlaylistsModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      description=""
      isOpen={isOpen}
      title="Add songs to playlist"
      onChange={onChange}
    >
      <div>dfgfdg</div>
    </Modal>
  );
};

export default PlaylistsModal;
