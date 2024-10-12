import Sidenav from "./Sidenav";
import ProjectsList from "./ProjectsList";
const Dashboard = () => (
  <div className="flex h-full w-full sm:flex-row">
    <div className="fixed sm:static sm:h-full sm:flex-col">
      <Sidenav />
    </div>
    <div className=" flex flex-col flex-1 bg-slate-700">
      <div className="flex text-xl justify-center min-h-8">Projects List</div>
      <ProjectsList />
    </div>
  </div>
);

export default Dashboard;
