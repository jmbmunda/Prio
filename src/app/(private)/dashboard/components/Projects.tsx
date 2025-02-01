import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { capitalize, cn } from "@/lib/utils";
import { FaClockRotateLeft } from "react-icons/fa6";

type Project = {
  id: string;
  name: string;
  status: string;
  tasks: number;
  color: string;
  updated_at: string;
};

type Props<T> = {
  projects: T[];
};

type ProjectStatus = keyof typeof MAP_PROJECT_COLOR;

const MAP_PROJECT_COLOR = {
  ongoing: "warning",
  completed: "success",
  upcoming: "secondary",
} as const;

const Projects = <T extends Project>({ projects }: Props<T>) => {
  return (
    <div className="space-y-4">
      {/* ITEM */}
      {projects.map((project) => (
        <div key={project.id} className={cn("p-4 flex flex-col border-sm cursor-pointer shadow-lg", project.color)}>
          <div className="flex justify-between items-center">
            <p>{project.name}</p>
            <Badge variant={MAP_PROJECT_COLOR[project.status as ProjectStatus]}>{capitalize(project.status)}</Badge>
          </div>
          <p className="text-gray-500 text-sm">{project.tasks} / 10 tasks</p>
          <div className="flex justify-between items-center">
            <div className="flex flex-1 items-center gap-2 mt-2">
              <Progress value={33} className="w-1/2" />
              <p className="text-gray-500 text-xs">33%</p>
            </div>
            <div className="flex gap-1 items-center mt-2 self-end">
              <FaClockRotateLeft size={12} className="text-gray-500" />
              <p className="text-gray-500 text-xs">{project.updated_at}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
