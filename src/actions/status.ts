"use server";

import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

type Payload = Omit<Status, "id">;

export const getStatuses = async () => {
  try {
    const res = await prisma.status.findMany({
      include: { tasks: { include: { images: true, tags: true }, orderBy: { slot: "asc" } } },
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createStatus = async (data: Payload) => {
  try {
    const res = await prisma.status.create({ data });
    revalidatePath("/tasks");
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateStatus = async (id: string, data: Partial<Payload>) => {
  try {
    const res = await prisma.status.update({ where: { id }, data });
    revalidatePath("/tasks");
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteStatus = async (id: string) => {
  try {
    const res = await prisma.status.delete({ where: { id } });
    revalidatePath("/tasks");
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
