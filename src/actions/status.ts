"use server";

import prisma from "@/lib/prisma";
import { Status } from "@prisma/client";

type Payload = Omit<Status, "id">;

export const getStatuses = async () => {
  try {
    const res = await prisma.status.findMany({
      include: { tasks: { include: { images: true }, orderBy: { slot: "asc" } } },
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createStatus = async (data: Payload) => {
  try {
    const res = await prisma.status.create({ data });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateStatus = async (id: string, data: Partial<Payload>) => {
  try {
    const res = await prisma.status.update({ where: { id }, data });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
