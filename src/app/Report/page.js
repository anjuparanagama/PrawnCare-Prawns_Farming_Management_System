import PurchaseUpper from "../components/purchase/PurchaseUpper";
import Navbar from "../components/Base/SideBar/Navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col p-4 sm:p-8">
      <PurchaseUpper />
    </div>
  );
}
