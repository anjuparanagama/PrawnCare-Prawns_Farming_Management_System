"use client";
import { useEffect, useState } from "react";
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
  FaBars,
  FaTimes,
} from "react-icons/fa";
import LogoutModal from "./LogoutModal";

export default function Navbar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col justify-between overflow-hidden border-r border-white/5 bg-[#052E3E] lg:flex">
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
      </aside>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => setShowLogoutModal(false)}
      />

      <div className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#052E3E]/95 text-white backdrop-blur-xl lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            href="/Dashboard"
            className="flex items-center gap-3 no-underline"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-teal-600 text-[#052E3E] shadow-lg shadow-cyan-900/30">
              <FaTint className="text-lg" />
            </div>
            <div>
              <h1 className="text-base font-semibold leading-none text-white">
                Prawn<span className="text-cyan-300">Care</span>
              </h1>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-cyan-400/70">
                Aquaculture
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
            aria-label="Open menu"
          >
            <FaBars className="text-lg" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#03212d]/80 backdrop-blur-sm lg:hidden">
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu overlay"
          />

          <div className="absolute inset-x-3 top-3 overflow-hidden rounded-3xl border border-white/10 bg-[#052E3E] shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-teal-600 text-[#052E3E] shadow-lg shadow-cyan-900/30">
                  <FaTint className="text-lg" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Prawn<span className="text-cyan-300">Care</span>
                  </h2>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-400/70">
                    Menu
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
                aria-label="Close menu"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-5.5rem)] overflow-y-auto px-4 py-4">
              <MobileSection title="Main menu">
                <MobileNavItem
                  icon={<FaTachometerAlt />}
                  label="Dashboard"
                  href="/Dashboard"
                  active={pathname === "/Dashboard" || pathname === "/"}
                />
                <MobileNavItem
                  icon={<FaShoppingCart />}
                  label="Orders"
                  href="/Orderlist"
                  active={
                    pathname.startsWith("/Orderlist") ||
                    pathname.startsWith("/Orders")
                  }
                />
                <MobileNavItem
                  icon={<FaBoxes />}
                  label="Inventory"
                  href="/Inventory"
                  active={pathname.startsWith("/Inventory")}
                />
              </MobileSection>

              <MobileSection title="Reports">
                <MobileNavItem
                  icon={<FaFileAlt />}
                  label="Sales"
                  href="/Sale"
                  active={pathname.startsWith("/Sale")}
                />
                <MobileNavItem
                  icon={<FaFileAlt />}
                  label="Purchasing"
                  href="/Report"
                  active={
                    pathname.startsWith("/Report") ||
                    pathname.startsWith("/report")
                  }
                />
                <MobileNavItem
                  icon={<FaFileAlt />}
                  label="Water Quality"
                  href="/waterquality"
                  active={pathname.startsWith("/waterquality")}
                />
              </MobileSection>

              <MobileSection title="System">
                <MobileNavItem
                  icon={<FaCog />}
                  label="Settings"
                  href="/Settings"
                  active={pathname.startsWith("/Settings")}
                />
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl border border-rose-400/20 px-4 py-3 text-left text-sm font-medium text-slate-200 transition-all duration-200 hover:bg-rose-400/10 hover:text-rose-200"
                >
                  <span className="text-rose-300">
                    <FaSignOutAlt />
                  </span>
                  <span>Log out</span>
                </button>
              </MobileSection>
            </div>
          </div>
        </div>
      )}
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

function MobileSection({ title, children }) {
  return (
    <section className="mb-4">
      <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
        {title}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}

function MobileNavItem({ icon, label, active = false, href }) {
  const content = (
    <div
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-cyan-400 to-teal-600 text-[#052E3E] shadow-md shadow-cyan-900/30"
          : "text-slate-200 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span
        className={`text-[15px] ${active ? "text-[#052E3E]" : "text-cyan-300/80"}`}
      >
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );

  return (
    <Link href={href} className="no-underline">
      {content}
    </Link>
  );
}
