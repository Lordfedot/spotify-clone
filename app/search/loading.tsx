"use client";

import Box from "@/components/Box";
import { PacmanLoader } from "react-spinners";

const Loading = () => {
  return (
    <Box className="h-full flex justify-center items-center">
      <PacmanLoader color="#22c55e" size={50}/>
      Loading...
    </Box>
  );
};

export default Loading;
