"use client";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    router.push("/Login");
  };

  return (
    <div className="fixed inset-0 bg-[#052E3E]/60 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-[#0A3B4D] rounded-2xl p-6 w-80 shadow-2xl border border-white/10 relative overflow-hidden">
        {/* subtle wave texture, consistent with sidebar */}
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full opacity-[0.08]"
          viewBox="0 0 300 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60 C 40 30, 80 90, 120 60 S 200 30, 240 60 S 300 30, 300 60 V0 H0 Z"
            fill="#5FE8D9"
          />
        </svg>

        <div className="relative z-10">
          <div className="w-11 h-11 rounded-xl bg-rose-400/10 border border-rose-400/20 flex items-center justify-center mb-4">
            <FaSignOutAlt className="text-rose-300 text-lg" />
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">
            Confirm logout
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            Are you sure you want to log out of PrawnCare?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
              No
            </button>
            <button
              onClick={() => {
                handleLogout();
                onConfirm();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl hover:from-rose-400 hover:to-rose-500 shadow-md shadow-rose-900/30 transition-all"
            >
              Yes, log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
