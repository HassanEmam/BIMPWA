import Sidenav from "./Sidenav";
import Tabs from "./Tabs";
import ThreeViewer from "./ThreeViewer";

const ModelLayout = () => {
  const tabs = [
    { label: "Schedule", content: <div>This is the content of Tab 1.</div> },
    { label: "Quantity", content: <div>This is the content of Tab 2.</div> },
    { label: "Pictures", content: <div>This is the content of Tab 3.</div> },
  ];

  return (
    <div className="flex h-full w-full sm:flex-row">
      <div className="fixed sm:static sm:h-full sm:flex-col">
        <Sidenav />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex sm:flex-row flex-1 max-h-10 justify-center font-bold text-2xl p-2 text-slate-200 bg-slate-900">
          Constology BIM App
        </div>
        <div className=" flex flex-col sm:flex-1 sm:flex-row flex-1 bg-slate-600">
          <div className="sm:min-w-[60%]">
            <ThreeViewer />
          </div>
          <div className="w-full  sm:w-[30%] bg-slate-950 sm:min-w-[40%] min-h-[30%]">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelLayout;
