const ProjectCard = () => {
  return (
    <div className="bg-[#26282b] rounded-lg cursor-pointer hover:outline hover:outline-2 hover:outline-[#029AE0]">
      <div className="flex gap-2 p-4 align-middle justify-start border-b-[#3b3c3f]">
        <p className="bg-[#ca8134] p-2 border-r-2 aspect-square">HC</p>
        <div>
          <h5>Project Name</h5>
          <p>Project Description Goes Here...</p>
        </div>
      </div>
      <div className="p-2 flex-col">
        <div className="flex items-center justify-between w-full">
          <p className=" text-[#969696]">Status</p>
          <p>Active</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-[#969696]">Role</p>
          <p>Engineer</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-[#969696]">Cost</p>
          <p>$2'000.000</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-[#969696]">Estimated Progress</p>
          <p>45%</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
