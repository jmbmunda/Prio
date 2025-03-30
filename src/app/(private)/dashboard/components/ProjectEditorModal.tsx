"use client";

import { useTransition } from "react";
import { Button, Input } from "@headlessui/react";
import { createProject, editProject } from "@/actions/projects";
import { CgSpinner } from "react-icons/cg";
import { isEmptyObject } from "@/lib/helpers";
import { Project } from "@/lib/types";
import clsx from "clsx";
import toast from "react-hot-toast";

export type ProjectEditorModalProps = {
  editValues?: Project | null;
  onClose: () => void;
};

export default function ProjectEditorModal({ editValues, onClose }: ProjectEditorModalProps) {
  const [isPending, startTransition] = useTransition();

  const handleAddProject = (formData: FormData) => {
    startTransition(async () => {
      const toastID = toast.loading("Creating project...");
      try {
        const data = {
          name: formData.get("name") as string,
          color: formData.get("color") as string,
        };
        await createProject(data);
        toast.success("Project created successfully", { id: toastID });
      } catch {
        toast.error("Failed to create project", { id: toastID });
      }
    });
  };

  const handleUpdateProject = (formData: FormData) => {
    startTransition(async () => {
      const toastID = toast.loading("Updating project...");
      try {
        const id = editValues?.id;
        if (!id) return;
        const data = {
          name: formData.get("name") as string,
          color: formData.get("color") as string,
        };
        await editProject(id, data);
        toast.success("Project updated successfully", { id: toastID });
      } catch {
        toast.error("Failed to update project", { id: toastID });
      }
    });
  };

  const handleSubmit = (formData: FormData) => {
    if (isEmptyObject(editValues!)) {
      handleAddProject(formData);
    } else {
      handleUpdateProject(formData);
    }
    onClose();
  };

  const renderSubmitLabel = () => {
    if (isEmptyObject(editValues!)) return isPending ? "Creating..." : "Create";
    return isPending ? "Updating..." : "Update";
  };

  return (
    <form action={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Input
          defaultValue={editValues?.name ?? ""}
          name="name"
          placeholder="Enter project name"
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        />
        <Input
          defaultValue={editValues?.color ?? ""}
          name="color"
          placeholder="Enter color"
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        />
      </div>
      <div className="mt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
        >
          {isPending && <CgSpinner className="animate-spin text-base" />}
          {renderSubmitLabel()}
        </Button>
      </div>
    </form>
  );
}
