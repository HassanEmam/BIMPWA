import ProjectCard from "./ProjectCard";

const ProjectsList = () => {
  return (
    <div
      id="projects-list"
      className="bg-slate-700 grid p-4 gap-4 grid-cols-4 text-white"
    >
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </div>
  );
};

export default ProjectsList;
