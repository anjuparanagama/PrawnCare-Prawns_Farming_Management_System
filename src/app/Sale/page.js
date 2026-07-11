"use client";

import Header from "../components/sales/Header";
import Salestable from "../components/sales/Salestable";
import Graph from "../components/sales/Graph";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col p-8 gap-4">
      <Header />
      <Graph />
      <Salestable />
    </div>
  );
}
