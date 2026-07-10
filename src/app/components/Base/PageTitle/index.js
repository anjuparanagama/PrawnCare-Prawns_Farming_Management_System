"use client";

export const Header = ({ title }) => {
  return (
    <div className="flex justify-left pl-3">
      <h1 className="text-2xl font-bold text-[#1C00B8]">{title}</h1>
    </div>
  );
};
