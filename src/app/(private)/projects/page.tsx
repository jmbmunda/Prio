import React from "react";
import DashboardSection from "../dashboard/components/DashboardSection";
import Projects from "../dashboard/components/Projects";
import { getProjects } from "@/actions/projects";

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <div>
      <DashboardSection title="My Projects" hasHeader={false} className="col-span-2">
        <Projects projects={projects} />
      </DashboardSection>
    </div>
  );
};

export default ProjectsPage;
