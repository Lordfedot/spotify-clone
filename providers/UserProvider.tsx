"use client";

import { MyUserContextProvider } from "@/hooks/useUser";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const UserProvider = ({ children }: Props) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
