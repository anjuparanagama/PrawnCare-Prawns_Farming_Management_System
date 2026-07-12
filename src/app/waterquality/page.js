"use client";
import Navbar from "../components/Base/SideBar/Navbar";
import Header from "../components/waterquality/Header";
import Box from "../components/waterquality/Box";
import Table from "../components/waterquality/Table";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col p-4 sm:p-8 gap-8">
      <Header />
      <Box />
      <Table />
    </div>
  );
}
