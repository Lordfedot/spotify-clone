import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import useAddPlaylistModal from "@/hooks/useAddPlaylistModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";

import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import usePlaylistsModal from "@/hooks/usePlaylistsModal";

const AddPlaylistModal = () => {
  const { onClose, isOpen } = useAddPlaylistModal();
  const playlistModal = usePlaylistsModal()
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const { register, handleSubmit, reset, } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const onSumbit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      if (!user) {
        return;
      }
      
      const { error: supabaseError } = await supabaseClient
        .from("playlists")
        .insert({
          user_id: user.id,
          title: values.title,
          description: values.description,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Playlist created! :)");
      reset();
      onClose()
      playlistModal.onClose()
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };
  return (
    <Modal
      description=""
      title="New playlist"
      onChange={onChange}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit(onSumbit)}>
        <label>
          Title
          <Input
            disabled={isLoading}
            id="title"
            {...register("title", { required: true })}
          />
        </label>
        <label>
          Description
          <Input
            id="description"
            disabled={isLoading}
            {...register("description", { required: true })}
          />
        </label>
        <div className="flex gap-2 mt-6">
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
          <Button
            disabled={isLoading}
            onClick={onClose}
            className="bg-transparent text-white hover:bg-neutral-600"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPlaylistModal;
