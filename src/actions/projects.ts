"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

type ProjectPayload = { name: string; color: string };

export const getProjects = async (params?: { limit?: number }) => {
  try {
    const res = await prisma.project?.findMany({
      take: params?.limit ?? 10,
      include: { tasks: true },
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

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
