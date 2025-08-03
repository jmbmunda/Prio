"use server";

import { Status, Task } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { columnSchema } from "@/app/(private)/tasks/components/Columns/utils/schema";
import { PRIORITY_ORDER } from "@/app/(private)/tasks/components/SortAndFilter/utils/constants";
import { filterTasks } from "@/lib/helpers";
import prisma from "@/lib/prisma";

type Payload = Omit<Status, "id">;

export const getStatuses = async (params?: {
  filters?: Record<string, unknown>;
  sort?: { field?: keyof Task; order?: "asc" | "desc" };
}) => {
  try {
    const res = await prisma.status.findMany({
      include: {
        tasks: {
          include: { images: true, tags: true, user: true, schedule: true, status: true },
          orderBy: { slot: "asc" },
          where: { AND: params?.filters ? filterTasks(params?.filters) : [] },
        },
      },
    });
    if (Object.keys(params?.sort ?? {}).length === 0) return res;
    const sortedRes = res.map((status) => ({
      ...status,
      tasks: status.tasks.sort((a, b) => {
        const field = params?.sort?.field;
        const order = params?.sort?.order;
        const valueA = a[field!];
        const valueB = b[field!];

        if (field === "priority") {
          const weightA = PRIORITY_ORDER[valueA as keyof typeof PRIORITY_ORDER] ?? 0;
          const weightB = PRIORITY_ORDER[valueB as keyof typeof PRIORITY_ORDER] ?? 0;
          return order === "asc" ? weightA - weightB : weightB - weightA;
        }

        if (typeof valueA === "string" && typeof valueB === "string") {
          return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }

        return order === "asc"
          ? (valueA as number) - (valueB as number)
          : (valueB as number) - (valueA as number);
      }),
    }));
    return sortedRes;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getStatusByName = async (name: string) => {
  try {
    const res = await prisma.status.findUnique({ where: { name } });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createStatus = async (data: Payload) => {
  try {
    const parsedData = columnSchema.safeParse(data);
    if (!parsedData.success) return Promise.reject(parsedData.error);
    const res = await prisma.status.create({ data: parsedData.data });
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
