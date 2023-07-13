"use client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import useEditPlaylistModal from "@/hooks/useEditPlaylistModal";

import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";

const EditPlaylistModal = () => {
  const { onClose, isOpen, playlist } = useEditPlaylistModal();
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: playlist?.title,
      description: playlist?.description,
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
        .update({
          title: values.title,
          description: values.description,
        })
        .eq("id", playlist?.id)

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Playlist updated! :)");
      reset();
      onClose();
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };

  return (
    <Modal
      description=""
      title={`${playlist?.title}`}
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
            Edit
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

export default EditPlaylistModal;
