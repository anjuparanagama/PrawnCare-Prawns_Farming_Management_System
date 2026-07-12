"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import ToastProvider from "./ToastProvider";

const AUTH_ROUTES = new Set(["/", "/Login", "/Signup"]);

export default function AppShell({ children }) {
  const pathname = usePathname();
  const showSidebar = !AUTH_ROUTES.has(pathname);

  return (
    <>
      <ToastProvider />

      {!showSidebar ? (
        children
      ) : (
        <div className="min-h-screen bg-white lg:flex">
          <Navbar />

          <div className="hidden lg:block lg:w-64 lg:shrink-0" />

          <main className="min-h-screen flex-1 pt-16 lg:pt-0 pb-20 lg:pb-0">
            {children}
          </main>
        </div>
      )}
    </>
  );
}
