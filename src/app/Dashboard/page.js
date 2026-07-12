import Navbar from "../components/Base/SideBar/Navbar";
import Upper from "../components/dashboard/Upper";
import Bottom from "../components/dashboard/Bottom";
import Assigntask from "../components/dashboard/assigntask";
import { Header as PageTitle } from "../components/Base/PageTitle";
export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col p-4 sm:p-8">
      <div className="flex flex-col gap-4">
        <PageTitle title="Dashboard" />
        <Upper />
      </div>
      <Bottom />
      <Assigntask />
    </div>
  );
}
