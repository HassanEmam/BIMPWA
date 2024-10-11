import Sidenav from "./Sidenav";
import ThreeViewer from "./ThreeViewer";

const Dashboard = () => (
  <div className="flex h-full">
    <div className="fixed sm:relative sm:h-full sm:flex-col">
      <Sidenav />
    </div>
    <div className="sm:flex-1 sm:flex-col">
      <div className=" hidden font-bold text-2xl p-2 sm:flex justify-center text-slate-200 bg-slate-900 min-h-10">
        Constology BIM App
      </div>
      <div className="h-full flex flex-col-reverse sm:flex-row sm:flex-1">
        <div className="w-full sm:w-[30%] bg-slate-950 sm:min-w-[40%] sm:h-full min-h-[30%] flex-1">
          Info
        </div>
        <ThreeViewer />
      </div>
    </div>
  </div>
);

export default Dashboard;
