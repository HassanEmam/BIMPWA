import Sidenav from "./Sidenav";
import ThreeViewer from "./ThreeViewer";

const Dashboard = () => (
  <div className="flex h-full w-full sm:flex-row">
    <div className="fixed sm:static sm:h-full sm:flex-col">
      <Sidenav />
    </div>
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 max-h-10 justify-center font-bold text-2xl p-2 text-slate-200 bg-slate-900">
        Constology BIM App
      </div>
      <div className=" flex flex-col sm:flex-row flex-1">
        <ThreeViewer />
        <div className="w-full  sm:w-[30%] bg-slate-950 sm:min-w-[40%] min-h-[30%]">
          Info
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
