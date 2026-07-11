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
} from "react-icons/fa";
import LogoutModal from "./LogoutModal";
import Logo from "../../../public/images/logo.png";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col justify-between border-r border-slate-200 bg-white/90 backdrop-blur-xl shadow-2xl">
        {/* Logo */}
        <div>
          <div className="border-b border-slate-100 px-7 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold font-sans text-blue-700">
                  PrawnCare
                </h1>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 px-5 py-6">
            <SidebarItem
              icon={<FaTachometerAlt />}
              label="Dashboard"
              href="/Dashboard"
              active={pathname === "/Dashboard"}
            />

            <SidebarItem
              icon={<FaShoppingCart />}
              label="Orders"
              href="/Orderlist"
              active={pathname === "/Orderlist"}
            />

            <SidebarDropdown
              icon={<FaFileAlt />}
              label="Reports"
              items={["Sales", "Purchasing", "Water Quality"]}
              active={
                pathname.startsWith("/Sale") ||
                pathname.startsWith("/Report") ||
                pathname.startsWith("/waterquality")
              }
            />

            <SidebarItem
              icon={<FaBoxes />}
              label="Inventory"
              href="/Inventory"
              active={pathname === "/Inventory"}
            />

            <SidebarItem
              icon={<FaCog />}
              label="Settings"
              href="/Settings"
              active={pathname === "/Settings"}
            />
          </nav>
        </div>

        {/* Logout */}
        <div className="border-t border-slate-100 p-5">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-red-200 py-3 font-medium text-red-500 transition-all duration-300 hover:bg-red-50 hover:shadow-md"
          >
            <FaSignOutAlt />
            Log Out
          </button>
        </div>
      </aside>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => setShowLogoutModal(false)}
      />
    </>
  );
}

function SidebarItem({ icon, label, active = false, href }) {
  return (
    <Link href={href}>
      <div
        className={`group relative flex items-center gap-4 rounded-2xl px-5 py-3 transition-all duration-300

        ${
          active
            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        {active && (
          <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white"></div>
        )}

        <div
          className={`text-lg ${
            active ? "text-white" : "text-slate-500 group-hover:text-cyan-600"
          }`}
        >
          {icon}
        </div>

        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
}

function SidebarDropdown({ icon, label, items, active = false }) {
  const [open, setOpen] = useState(active);

  const pathname = usePathname();

  const routeMap = {
    Sales: "/Sale",
    Purchasing: "/Report",
    "Water Quality": "/waterquality",
  };

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        className={`group flex cursor-pointer items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300

        ${
          active || open
            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`text-lg ${
              active || open
                ? "text-white"
                : "text-slate-500 group-hover:text-cyan-600"
            }`}
          >
            {icon}
          </div>

          <span className="font-medium">{label}</span>
        </div>

        {open ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 mt-2" : "max-h-0"
        }`}
      >
        <div className="ml-7 flex flex-col gap-2 border-l border-slate-200 pl-5">
          {items.map((item) => {
            const href = routeMap[item];

            return (
              <Link
                key={item}
                href={href}
                className={`rounded-xl px-3 py-2 text-sm transition-all

                ${
                  pathname === href
                    ? "bg-cyan-100 font-medium text-cyan-700"
                    : "text-slate-500 hover:bg-cyan-50 hover:text-cyan-600"
                }`}
              >
                {item}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
