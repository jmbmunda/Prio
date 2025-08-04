import React from "react";

import { getProjects } from "@/actions/projects";
import TransparentContainer from "@/components/TransparentContainer";

import Projects from "./components/Projects";

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <TransparentContainer title="My Projects" hasHeader={false} className="col-span-2">
      <Projects projects={projects} />
    </TransparentContainer>
  );
};

export default ProjectsPage;
