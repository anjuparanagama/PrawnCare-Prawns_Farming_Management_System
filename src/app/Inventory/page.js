"use client";

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
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <Upper />
        </div>
        <div className="flex-1">
          <Bottom />
        </div>
      </div>
    </div>
  );
}
