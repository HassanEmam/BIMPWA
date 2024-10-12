import Sidenav from "./Sidenav";

const Dashboard = () => (
  <div className="flex h-full w-full sm:flex-row">
    <div className="fixed sm:static sm:h-full sm:flex-col">
      <Sidenav />
    </div>
    <div className="flex flex-1 justify-center">Projects List</div>
  </div>
);

export default Dashboard;
