import Sidenav from "./Sidenav";
import ProjectsList from "./ProjectsList";
const Dashboard = () => (
  <div className="flex h-full w-full sm:flex-row">
    <div className="fixed sm:static sm:h-full sm:flex-col">
      <Sidenav />
    </div>
    <div className=" flex-1 bg-slate-700">
      Projects List
      <ProjectsList />
    </div>
  </div>
);

export default Dashboard;
