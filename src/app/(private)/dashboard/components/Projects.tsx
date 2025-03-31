"use client";

import React, { useState } from "react";
// import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { FaClockRotateLeft } from "react-icons/fa6";
// import { MAP_PROJECT_COLOR } from "@/lib/constants";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteProject } from "@/actions/projects";
import toast from "react-hot-toast";
import { Button } from "@headlessui/react";
import { useModal } from "@/context/modal";
import ProjectEditorModal, { ProjectEditorModalProps } from "./ProjectEditorModal";
import { ProjectType } from "@/lib/types";

type Props = {
  projects: ProjectType[];
};

const Projects = ({ projects = [] }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showModal } = useModal();

  const handleShowModal = (editProject: ProjectType | null = null) => {
    showModal<ProjectEditorModalProps>({
      id: "Sample",
      title: !editProject ? "Create A New Project" : "Edit Project",
      component: ProjectEditorModal,
      props: {
        editValues: editProject,
        onClose: () => {
          toast.error("asdsads");
        },
      },
    });
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    const toastID = toast.loading("Deleting a project...");
    try {
      await deleteProject(id);
      toast.success("Project deleted!", { id: toastID });
    } catch {
      toast.error("Failed to delete project", { id: toastID });
    }
    setIsLoading(false);
    close();
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={() => handleShowModal()}
        className="rounded-md bg-black py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white my-4"
      >
        + New
      </Button>
      {projects?.map((project) => (
        <div
          key={project.id}
          className={cn("p-4 flex flex-col border-sm cursor-pointer shadow-lg", project.color)}
        >
          <div className="flex justify-between items-center">
            <p>{project.name}</p>
            {/* <Badge variant={MAP_PROJECT_COLOR[project.status as ProjectStatus]}>
              {capitalize(project?.status ?? "To Do")}
            </Badge> */}
            <div className="flex gap-2">
              <button onClick={() => handleShowModal(project)}>
                <FaEdit className="cursor-pointer" />
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                disabled={isLoading}
                aria-disabled={isLoading}
                className={cn("cursor-pointer text-red-500")}
              >
                <FaTrash />
              </button>
            </div>
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
