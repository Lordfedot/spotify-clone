"use client";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { IoLibrarySharp } from "react-icons/io5";
import { toast } from "react-hot-toast";
import Link from "next/link";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";

import Button from "./Button";

type Props = {
  className?: string;
};
const Header = ({ className }: Props) => {
  const router = useRouter();
  const player = usePlayer();
  const { onOpen } = useAuthModal();
  const pathname = usePathname();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };
  const active = pathname === "/library";
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="w-full flex items-center gap-x-2 justify-between ">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>

        <div className="flex md:hidden gap-x-1 items-center">
          <button
            onClick={() => router.push("/")}
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <HiHome size={20} className="text-black" />
          </button>
          <button
            onClick={() => router.push("/search")}
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <BiSearch size={20} className="text-black" />
          </button>
          <button
            onClick={() => router.push("/library")}
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <IoLibrarySharp size={20} className="text-black" />
          </button>
        </div>

        {user && (
          <Link
            className={twMerge(
              `text-2xl hidden md:inline relative text-white p-2 font-bold transition hover:text-green-500`,
              active &&
                "text-green-500 before:content-[''] before:absolute before:bottom-1 before:left-0 before:w-full before:h-[2px] before:bg-green-500"
            )}
            href="/library"
          >
            My library
          </Link>
        )}

        {user ? (
          <div className="flex md:gap-x-4 gap-x-1 items-center">
            <Button onClick={handleLogout} className="bg-white px-6 py-2">
              Logout
            </Button>
            <Button
              onClick={() => router.push("/account")}
              className="bg-white"
            >
              <FaUserAlt />
            </Button>
          </div>
        ) : (
          <div className="flex gap-x-1 items-center flex-col 360:flex-row">
            <div>
              <Button
                onClick={onOpen}
                className="bg-transparent text-neutral-300 font-medium"
              >
                Sign up
              </Button>
            </div>

            <div>
              <Button onClick={onOpen} className="bg-white px-6 py-2">
                Log in
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
