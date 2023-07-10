"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";
import PlaylistsModal from "@/components/PlaylistsModal";
import { ProductWithPrice } from "@/types";
import AddPlaylistModal from "@/components/AddPlaylistModal";

type Props = {
  products: ProductWithPrice[];
};

const ModalProvider = ({ products }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AddPlaylistModal />
      <SubscribeModal products={products} />
      <AuthModal />
      <UploadModal />
      <PlaylistsModal />
    </>
  );
};

export default ModalProvider;
