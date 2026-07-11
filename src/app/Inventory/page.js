"use client";

import Navbar from "../components/Navbar";
import Upper from "../components/Inventory/Upper";
import MiddleOne from "../components/Inventory/MiddleOne";
import Bottom from "../components/Inventory/Bottom";
import { Header } from "../components/Base/PageTitle";

export default function Home() {
  const download = () => {
    window.open(`${apiBaseUrl}/api/inventory/downloadpdf`, "_blank");
    alert("Download successfully");
  };

  return (
    <div className="flex min-h-screen flex-col p-8 gap-8">
      <Header title="Inventory" Download={download} />
      <Upper />
      <MiddleOne />
      <Bottom />
    </div>
  );
}
