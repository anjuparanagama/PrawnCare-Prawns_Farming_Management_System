"use client";
import Navbar from "../components/Navbar";
import { Header } from "../components/Base/PageTitle";
import Ordertable from "../components/ordlist/Ordertable";
import Graph from "../components/ordlist/Graph";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col p-4 sm:p-8 gap-4">
      <Header title="Order List" />
      <Ordertable />
      <Graph />
    </div>
  );
}
