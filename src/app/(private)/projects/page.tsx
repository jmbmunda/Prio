import React from "react";
import DashboardSection from "../dashboard/components/DashboardSection";
import Projects from "../dashboard/components/Projects";
import prisma from "@/lib/prisma";

const ProjectsPage = async () => {
  const projects = await prisma.project?.findMany({ take: 10, include: { tasks: true } });

  return (
    <div>
      <DashboardSection title="My Projects" className="col-span-2">
        <Projects projects={projects} />
      </DashboardSection>
    </div>
  );
};

export default ProjectsPage;
