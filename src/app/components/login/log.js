"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
    /\/$/,
    "",
  );

  async function handleLogin(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(`${apiBaseUrl}/api/login/login`, {
        userName: userName,
        password: password,
        rememberMe: rememberMe,
      });

      console.log("Login Success:", response.data);

      if (rememberMe) {
        localStorage.setItem("token", response.data.token);
      } else {
        sessionStorage.setItem("token", response.data.token);
      }

      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      router.push("/Dashboard");
    } catch (error) {
      console.log("Login Error:", error.response?.data);

      alert(
        "Login Failed: " + (error.response?.data?.message || "Server Error"),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full h-screen bg-[#052E3E] relative overflow-hidden">
      {/* ambient wave texture across the whole page */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 h-64 w-full opacity-[0.06]"
        viewBox="0 0 300 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0 90 C 40 60, 80 120, 120 90 S 200 60, 240 90 S 300 60, 300 90 V0 H0 Z"
          fill="#5FE8D9"
        />
      </svg>

      <div className="illustration-container relative z-10 min-h-screen w-1/2 hidden md:flex items-center justify-center">
        <img
          src="/images/login.png"
          alt="Abstract illustration of a person holding a key, standing in front of a door shaped like a shield, with a gradient purple and blue background"
          className="w-[100%] h-[90%] pl-14 object-contain mix-blend-screen opacity-90"
        />
      </div>

      <div className="form-container relative z-10 w-full md:w-1/2 p-8 md:p-12 md:pl-20 flex flex-col justify-center">
        <div className="w-full max-w-sm mx-auto md:mx-0">
          {/* logo */}
          <div className="flex items-center gap-3 mb-10">
            <span className="text-lg font-semibold text-white">
              Prawn<span className="text-cyan-300">Care</span>
            </span>
          </div>

          <h1 className="text-3xl font-semibold text-white mb-2">
            Welcome back
          </h1>
          <p className="text-slate-400 mb-8 text-sm">
            Sign in to your account to continue
          </p>

          <form id="loginForm" className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-slate-300"
              >
                User name
              </label>
              <input
                type="text"
                id="text"
                placeholder="Enter user name"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/60 transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/60 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-cyan-300 focus:outline-none transition-colors"
                >
                  {showPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M2 2L22 22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-400/60 focus:ring-offset-0"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-slate-400"
                >
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className={`w-full text-sm font-medium py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                loading
                  ? "bg-cyan-800/50 text-cyan-200/70 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-400 to-teal-600 text-[#052E3E] hover:from-cyan-300 hover:to-teal-500 shadow-md shadow-cyan-900/30"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Please wait...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
