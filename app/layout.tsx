import { Inter, K2D } from "next/font/google";
import "../styles/globals.css";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter, redirect, usePathname } from 'next/navigation'
import { SessionProvider, useSession } from "next-auth/react";
import CheckSession from "@/components/auth/CheckSessionClient";
import NavBar from "@/components/header/Navbar";
import initialScripts from "@/lib/initial-scripts";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Umbrella",
  description: "University Management Application",
};

const font = K2D({
  subsets: ["latin"],
  weight: "200",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await initialScripts();

  const session: any = await auth();
  // console.log("session".bgCyan, session);

  // const route = useRouter();
  // console.log(route);
  // const firstPortion = route.split('/')[0];
  // console.log(firstPortion);
  
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional" />
      </head>
      <body className="h-screen">
        <div className={`${font.className} h-full`}> {/* bg-black text-white h-svh mt-0 mb-0 ml-0 mr-0 overflow-hidden */}
          <SessionProvider session={session}>
            <CheckSession>
              <NavBar />
              {/* <div className="bg-gray-400 max-h-max"> */}
                {children}
              {/* </div> */}
            </CheckSession>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
