import React from "react";
import DashboardSection from "../dashboard/components/DashboardSection";
import Projects from "../dashboard/components/Projects";
const projects = [
  {
    id: "1",
    name: "Project 1",
    status: "ongoing",
    tasks: 12,
    color: "bg-yellow-50",
    updated_at: "now",
  },
  {
    id: "2",
    name: "Project 2",
    status: "completed",
    tasks: 3,
    color: "bg-red-50",
    updated_at: "2 hours ago",
  },
  {
    id: "3",
    name: "Project 3",
    status: "upcoming",
    tasks: 5,
    color: "bg-indigo-50",
    updated_at: "1 day ago",
  },
];

const ProjectsPage = () => {
  return (
    <div>
      <DashboardSection title="My Projects" className="col-span-2">
        <Projects projects={projects} />
      </DashboardSection>
    </div>
  );
};

export default ProjectsPage;
