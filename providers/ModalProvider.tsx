"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";

import { ProductWithPrice } from "@/types";

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
      <SubscribeModal products={products} />
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
