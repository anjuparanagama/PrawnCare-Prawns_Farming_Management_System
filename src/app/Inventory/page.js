import Navbar from "../components/Navbar";
import Upper from "../components/Inventory/Upper";
import MiddleOne from "../components/Inventory/MiddleOne";
import Bottom from "../components/Inventory/Bottom";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col p-8">
      <Upper />
      <MiddleOne />
      <Bottom />
    </div>
  );
}
