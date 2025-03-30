"use server";

import prisma from "@/lib/prisma";
import { Checklist } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type ChecklistPayload = { text: string; is_checked: boolean };

export type getChecklistParams = {
  orderBy?: "asc" | "desc";
  offset?: number;
};

export const getChecklist = async (params?: getChecklistParams) => {
  const { orderBy = "asc", offset } = params || {};
  try {
    const res = await prisma.checklist.findMany({
      orderBy: { created_at: orderBy },
      take: offset,
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createChecklist = async ({ text }: Pick<Checklist, "text">) => {
  try {
    const res = await prisma.checklist.create({ data: { text, is_checked: false } });
    revalidatePath("/dashboard");
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteChecklist = async (id: string) => {
  try {
    const res = await prisma.checklist.delete({ where: { id } });
    revalidatePath("/dashboard");
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateChecklist = async (id: string, data: Partial<Checklist>) => {
  try {
    const res = await prisma.checklist.update({ where: { id }, data });
    revalidatePath("/dashboard");
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
