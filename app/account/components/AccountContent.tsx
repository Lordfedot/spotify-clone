"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import Button from "@/components/Button";

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/");
    }
  }, [isLoading, router, user]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });
      window.location.assign(url);
    } catch (error) {
      if (error) {
        toast.error((error as Error)?.message);
      }
    }
    setLoading(false);
  };
  return (
    <div className="mb-7">
      {!subscription && (
        <div className="flex flex-col gap-x-4">
          <p className="">No active plan.</p>
          <Button className="w-[300px]" onClick={() => subscribeModal.onOpen}>
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4 ">
          <p>
            You are currently on{" "}
            <b>{subscription?.prices?.products?.name} plan.</b>
          </p>
          <Button
            onClick={redirectToCustomerPortal}
            disabled={loading || isLoading}
            className="w-[300px]"
          >
            Open Customer Portal
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
