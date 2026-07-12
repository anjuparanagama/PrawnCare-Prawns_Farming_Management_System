"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const AUTH_ROUTES = new Set(["/", "/Login", "/Signup"]);

export default function AppShell({ children }) {
  const pathname = usePathname();
  const showSidebar = !AUTH_ROUTES.has(pathname);

  if (!showSidebar) {
    return children;
  }

  return (
    <div className="min-h-screen bg-white lg:flex">
      <div className="hidden lg:block lg:w-64 lg:shrink-0">
        <Navbar />
      </div>

      <main className="min-h-screen flex-1">{children}</main>
    </div>
  );
}
