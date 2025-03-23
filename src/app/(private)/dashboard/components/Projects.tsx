import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { capitalize, cn } from "@/lib/utils";
import { FaClockRotateLeft } from "react-icons/fa6";
import { Project, ProjectStatus } from "@/lib/types";
import { MAP_PROJECT_COLOR } from "@/lib/constants";

type Props = {
  projects: Project[];
};

const Projects = ({ projects = [] }: Props) => {
  return (
    <div className="space-y-4">
      {projects?.map((project) => (
        <div
          key={project.id}
          className={cn("p-4 flex flex-col border-sm cursor-pointer shadow-lg", project.color)}
        >
          <div className="flex justify-between items-center">
            <p>{project.name}</p>
            <Badge variant={MAP_PROJECT_COLOR[project.status as ProjectStatus]}>
              {capitalize(project?.status ?? "To Do")}
            </Badge>
          </div>
          <p className="text-gray-500 text-sm">0 / {project.tasks?.length} tasks</p>
          <div className="flex justify-between items-center">
            <div className="flex flex-1 items-center gap-2 mt-2">
              <Progress value={33} className="w-1/2" />
              <p className="text-gray-500 text-xs">33%</p>
            </div>
            <div className="flex gap-1 items-center mt-2 self-end">
              <FaClockRotateLeft size={12} className="text-gray-500" />
              <p className="text-gray-500 text-xs">{project.updated_at?.toString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
