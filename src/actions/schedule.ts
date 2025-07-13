"use server";

import { TaskSchedule } from "@prisma/client";

import prisma from "@/lib/prisma";

type Payload = TaskSchedule;

export const getSchedules = async () => {
  try {
    const res = await prisma.taskSchedule.findMany({
      include: { task: { include: { status: true } } },
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateSchedule = async (id: string, data: Payload) => {
  try {
    const res = await prisma.taskSchedule.update({ where: { id }, data });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteSchedule = async (id: string) => {
  try {
    const res = await prisma.taskSchedule.delete({ where: { id } });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
