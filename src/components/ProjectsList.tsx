import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { Project } from "./ProjectCard";

const ProjectsList = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const { authToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (authToken) {
      console.log("auth", authToken);
      axios
        .get("https://bim.constology.com/api/project/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("authToken"),
          },
        })
        .then((response) => {
          console.log(response.data.data);
          setProjects(response.data.data); // Assuming response.data is an array of projects
        })
        .catch((error) => {
          console.error("Failed to fetch projects:", error);
        });
    } else {
      console.log(authToken, "Failed");
    }
  }, []);

  const handleProjectClick = (projectId: string) => {
    console.log(projectId);
    navigate(`/modelviewer/${projectId}`);
  };
  return (
    <div
      id="projects-list"
      className="bg-slate-700 flex flex-col m-2 gap-2 sm:grid p-4 sm:gap-4 sm:grid-cols-4 text-white overflow-auto max-h-[90%]"
    >
      {projects.map((project) => (
        <ProjectCard
          onClick={handleProjectClick}
          projectData={project}
          key={project.public_id}
        />
      ))}
    </div>
  );
};

export default ProjectsList;
