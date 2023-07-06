import "./globals.css";
import { Figtree } from "next/font/google";

import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/GetSongsByUserId";
import Player from "@/components/Player";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";

const fort = Figtree({ subsets: ["latin"] });
export const revalidate = 0;
export const metadata = {
  title: "Spotify-clone",
  description: "Lose yourself to the music!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices()
  return (
    <html lang="en">
      <body className={`${fort.className} h-full`}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products}/>
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
