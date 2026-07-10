"use client";

export const Header = ({ title }) => {
  return (
    <div className="flex justify-left mb-3">
      <h1 className="text-4xl font-bold text-blue-900">{title}</h1>
    </div>
  );
};
