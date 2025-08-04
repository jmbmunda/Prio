"use server";

import prisma from "@/lib/prisma";

type Payload = { name: string; color: string };

export const getTags = async (params: { q?: string }) => {
  try {
    const res = await prisma.tag.findMany({ where: { name: params.q } });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createTag = async (data: Payload) => {
  try {
    const res = await prisma.tag.create({ data });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTag = async (id: string, data: Payload) => {
  try {
    const res = await prisma.tag.update({ where: { id }, data });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteTag = async (id: string) => {
  try {
    const res = await prisma.tag.delete({ where: { id } });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const assignTagToTask = async (tag_id: string, task_id: string) => {
  try {
    const data = await prisma.tasktag.findFirst({ where: { tag_id, task_id } });
    if (data) return { success: 0, message: "Tag already assigned to this task" };
    const newTaskTag = await prisma.tasktag.create({ data: { tag_id, task_id } });
    return { success: 1, message: "Successfully assigned tag to task", data: newTaskTag };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const unassignTagFromTask = async (tag_id: string, task_id: string) => {
  try {
    const data = await prisma.tasktag.findFirst({ where: { tag_id, task_id } });
    if (!data) return { success: 0, message: "Tag is not assigned to this task" };
    const deleted = await prisma.tasktag.delete({ where: { task_id_tag_id: { tag_id, task_id } } });
    return { success: 1, message: "Successfully unassigned tag from task", data: deleted };
  } catch (error) {
    return Promise.reject(error);
  }
};
