export interface Project {
  id: string;
  public_id: string;
  name: string;
  description: string;
  startdate: string;
  enddate: string;
  percent_complete: number;
}
interface ProjectProps {
  projectData: Project;
  onClick: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectProps> = ({ projectData, onClick }) => {
  return (
    <div
      onClick={() => onClick(projectData.public_id)}
      className="bg-[#26282b] rounded-lg cursor-pointer hover:outline hover:outline-2 hover:outline-[#029AE0]"
    >
      <div className="flex gap-2 p-4 align-middle justify-start border-b-[#3b3c3f]">
        <p className="bg-[#ca8134] p-2 border-r-2 aspect-square">HC</p>
        <div>
          <h5>{projectData.name}</h5>
          <p>{projectData.description}</p>
        </div>
      </div>
      <div className="p-2 flex-col">
        <div className="flex items-center justify-between w-full">
          <p className="text-[#969696]">Start Date</p>
          <p>{new Date(projectData.startdate).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-[#969696]">Finish Date</p>
          <p>{new Date(projectData.enddate).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-[#969696]">Estimated Progress</p>
          <p>{projectData.percent_complete} %</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
