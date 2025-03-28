"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type ProjectPayload = { name: string; color: string };

export const createProject = async (data: ProjectPayload) => {
  try {
    await prisma.project.create({ data });
    revalidatePath("/projects");
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editProject = async (id: string, data: ProjectPayload) => {
  try {
    await prisma.project.update({ where: { id }, data });
    revalidatePath("/projects");
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteProject = async (id: string) => {
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/projects");
  } catch (error) {
    return Promise.reject(error);
  }
};
