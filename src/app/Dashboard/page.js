import Navbar from "../components/Navbar";
import Upper from "../components/dashboard/Upper";
import Bottom from "../components/dashboard/Bottom";
import Assigntask from "../components/dashboard/assigntask";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col p-4 sm:p-8">
      <Upper />
      <Bottom />
      <Assigntask />
    </div>
  );
}
