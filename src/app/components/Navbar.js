"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaFileAlt,
  FaBoxes,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaTint,
  FaUserCircle,
} from "react-icons/fa";
import LogoutModal from "./LogoutModal";

export default function Navbar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <div className="w-64 h-screen bg-[#052E3E] border-r border-white/5 flex flex-col justify-between fixed z-30 overflow-hidden">
        {/* ambient wave texture in the background */}
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-40 w-full opacity-[0.08]"
          viewBox="0 0 300 160"
          preserveAspectRatio="none"
        >
          <path
            d="M0 90 C 40 60, 80 120, 120 90 S 200 60, 240 90 S 300 60, 300 90 V0 H0 Z"
            fill="#5FE8D9"
          />
        </svg>

        <div className="relative z-10 flex flex-col">
          {/* Logo / Branding */}
          <div className="p-6 pb-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-300 to-teal-600 flex items-center justify-center text-[#052E3E] shadow-lg shadow-cyan-900/30">
              <FaTint className="text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white leading-none">
                Prawn<span className="text-cyan-300">Care</span>
              </h1>
              <span className="text-[10px] font-semibold text-cyan-400/70 tracking-wider uppercase mt-1 block">
                Aquaculture
              </span>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="px-4 py-2 mt-3">
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase px-4 block mb-2">
              Main menu
            </span>

            <nav className="flex flex-col gap-1">
              <SidebarItem
                icon={<FaTachometerAlt />}
                label="Dashboard"
                href="/Dashboard"
                active={pathname === "/Dashboard" || pathname === "/"}
              />
              <SidebarItem
                icon={<FaShoppingCart />}
                label="Orders"
                href="/Orderlist"
                active={
                  pathname.startsWith("/Orderlist") ||
                  pathname.startsWith("/Orders")
                }
              />
              <SidebarDropdown
                icon={<FaFileAlt />}
                label="Reports"
                items={["Sales", "Purchasing", "Water Quality"]}
                active={
                  pathname.startsWith("/Sale") ||
                  pathname.startsWith("/report") ||
                  pathname.startsWith("/Report") ||
                  pathname.startsWith("/waterquality")
                }
              />
              <SidebarItem
                icon={<FaBoxes />}
                label="Inventory"
                href="/Inventory"
                active={pathname.startsWith("/Inventory")}
              />
            </nav>

            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase px-4 block mt-6 mb-2">
              System
            </span>
            <nav className="flex flex-col gap-1">
              <SidebarItem
                icon={<FaCog />}
                label="Settings"
                href="/Settings"
                active={pathname.startsWith("/Settings")}
              />
            </nav>
          </div>
        </div>

        {/* User Profile & Logout Area */}
        <div className="relative z-10 p-4 border-t border-white/10">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-between text-slate-300 hover:text-rose-300 px-4 py-2.5 rounded-xl border border-rose-400/20 hover:bg-rose-400/10 transition-all duration-200 group text-sm font-medium"
          >
            <div className="flex items-center gap-3">
              <FaSignOutAlt className="text-rose-400/70 group-hover:text-rose-300 transition-colors" />
              <span>Log out</span>
            </div>
          </button>
        </div>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => setShowLogoutModal(false)}
      />
    </>
  );
}

function SidebarItem({ icon, label, active = false, href }) {
  const content = (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 relative group ${
        active
          ? "bg-gradient-to-r from-cyan-400 to-teal-600 text-[#052E3E] font-medium shadow-md shadow-cyan-900/30"
          : "text-slate-300 hover:text-white hover:bg-white/5"
      }`}
    >
      <span
        className={`text-[15px] transition-colors ${
          active
            ? "text-[#052E3E]"
            : "text-cyan-300/70 group-hover:text-cyan-200"
        }`}
      >
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="no-underline">
        {content}
      </Link>
    );
  }

  return content;
}

function SidebarDropdown({ icon, label, items, active = false }) {
  const [open, setOpen] = useState(active);

  const routeMap = {
    Sales: "/Sale",
    Purchasing: "/Report",
    "Water Quality": "/waterquality",
  };

  return (
    <div className="flex flex-col">
      <div
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 relative group ${
          active || open
            ? "bg-white/5 text-white font-medium"
            : "text-slate-300 hover:text-white hover:bg-white/5"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`text-[15px] transition-colors ${
              active || open
                ? "text-cyan-300"
                : "text-cyan-300/70 group-hover:text-cyan-200"
            }`}
          >
            {icon}
          </span>
          <span className="text-sm">{label}</span>
        </div>
        <span className="text-slate-400 text-xs transition-transform duration-200">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      {open && (
        <div className="ml-6 pl-4 mt-1 mb-2 flex flex-col gap-0.5 border-l border-white/10">
          {items.map((item) => {
            const itemHref = routeMap[item] || "#";
            return (
              <Link
                key={item}
                href={itemHref}
                className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-slate-400 hover:text-cyan-200 hover:bg-white/5 transition-all duration-150 block"
              >
                {item}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
