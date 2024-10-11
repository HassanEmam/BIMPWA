import Sidenav from "./Sidenav";
import ThreeViewer from "./ThreeViewer";

const Dashboard = () => (
  <div className="flex h-full">
    <div className="fixed sm:relative sm:h-full">
      <Sidenav />
    </div>
    <div className="sm:flex-1 h-full">
      <div className=" hidden font-bold text-2xl p-2 sm:flex justify-center text-slate-200 bg-slate-900">
        Constology BIM App
      </div>
      <div className="sm:h-full sm:flex">
        <div className="sm:w-[20%] bg-slate-950 sm:min-w-[40%]">Info</div>
        <ThreeViewer />
      </div>
    </div>
  </div>
);

export default Dashboard;
