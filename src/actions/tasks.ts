"use server";

import { TaskPayload } from "@/app/(private)/tasks/components/TaskEditorModal/utils/types";
import prisma from "@/lib/prisma";
import { Task } from "@/lib/types";
import { revalidatePath } from "next/cache";

export type Payload = Pick<Task, "title" | "description" | "status_id" | "slot"> &
  Pick<TaskPayload, "images">;

export const getTasks = async (params?: { q?: string; limit?: number }) => {
  try {
    const res = await prisma.task.findMany({
      take: params?.limit ?? 10,
      include: { user: true, project: true, images: true },
      where: { OR: [{ title: { contains: params?.q } }, { id: params?.q }] },
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTaskById = async (id: string) => {
  try {
    const res = await prisma.task.findUnique({
      where: { id: id },
      include: { status: true, images: true },
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeTask = async (id: string) => {
  try {
    await prisma.task.delete({ where: { id } });
    revalidatePath("/tasks");
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTask = async (id: string, data: Partial<Payload>) => {
  try {
    const res = await prisma.task.update({
      where: { id },
      data: { ...data, images: { create: data.images } },
    });
    revalidatePath("/tasks");
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createTask = async (data: Payload) => {
  try {
    await prisma.task.create({ data: { ...data, images: { create: data.images } } });
    revalidatePath("/tasks");
  } catch (error) {
    return Promise.reject(error);
  }
};

type UpdateTaskPositionPayload = {
  taskId: string;
  newColumnId: string;
  oldColumnId: string;
  newIndex: number;
  oldIndex: number;
};

export const updateTaskPosition = async (payload: UpdateTaskPositionPayload) => {
  try {
    // Update the old column
    await prisma.task.updateMany({
      where: {
        status_id: payload.oldColumnId,
        slot: { gt: payload.oldIndex },
      },
      data: {
        slot: { decrement: 1 },
      },
    });

    // Update the new column
    await prisma.task.updateMany({
      where: {
        status_id: payload.newColumnId,
        slot: { gte: payload.newIndex },
      },
      data: {
        slot: { increment: 1 },
      },
    });

    // Update the task iteself
    await prisma.task.update({
      where: { id: payload.taskId },
      data: { slot: payload.newIndex, status_id: payload.newColumnId },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
