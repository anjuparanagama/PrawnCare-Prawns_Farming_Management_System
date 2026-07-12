"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const toastStyle = {
  background: "rgba(5, 46, 62, 0.96)",
  color: "#ecfeff",
  border: "1px solid rgba(95, 232, 217, 0.25)",
  boxShadow: "0 18px 40px rgba(3, 18, 27, 0.28)",
  borderRadius: "14px",
  padding: "12px 16px",
  fontSize: "14px",
};

export default function ToastProvider() {
  const [position, setPosition] = useState("top-right");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updatePosition = () => {
      setPosition(mediaQuery.matches ? "top-center" : "top-right");
    };

    updatePosition();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePosition);
    } else {
      mediaQuery.addListener(updatePosition);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updatePosition);
      } else {
        mediaQuery.removeListener(updatePosition);
      }
    };
  }, []);

  return (
    <Toaster
      position={position}
      gutter={12}
      toastOptions={{
        duration: 3500,
        style: toastStyle,
        success: {
          iconTheme: {
            primary: "#5fe8d9",
            secondary: "#052e3e",
          },
        },
        error: {
          iconTheme: {
            primary: "#fb7185",
            secondary: "#052e3e",
          },
        },
      }}
    />
  );
}
