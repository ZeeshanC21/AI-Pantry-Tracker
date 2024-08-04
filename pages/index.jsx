"use client";

import Home from "@/components/Home";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "@/components/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry AI",
  description: "Pantry AI",
};

export default function RootLayout({ children }) {
  return (
    <div className={inter.className} >
      <AuthContextProvider>
        <Home />
        {children}
      </AuthContextProvider>
    </div>
  );
}
