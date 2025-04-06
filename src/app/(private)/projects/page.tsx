import React from "react";
import Projects from "../tasks/components/Projects";
import TransparentContainer from "@/components/TransparentContainer";
import { getProjects } from "@/actions/projects";

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <TransparentContainer title="My Projects" hasHeader={false} className="col-span-2">
      <Projects projects={projects} />
    </TransparentContainer>
  );
};

export default ProjectsPage;
