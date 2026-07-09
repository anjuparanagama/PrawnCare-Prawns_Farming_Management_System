import Login from "./Login/page";
import Dashboard from "./Dashboard/page";

export default function Home() {
  return (
    <div className="flex-grow flex flex-col">
      {/* < Login/>    */}
      <Dashboard />
    </div>
  );
}
