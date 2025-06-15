"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export const deleteFile = async (uuid: string) => {
  try {
    if (!uuid) return Promise.reject(new Error("No uuid provided"));
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UPLOAD_CARE_BASE_URL}/files/${uuid}/storage/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Uploadcare.Simple ${process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY}:${process.env.UPLOADCARE_SECRET_KEY}`,
          Accept: "application/vnd.uploadcare-v0.7+json",
        },
      }
    );
    if (response.ok) {
      return Promise.resolve({ message: "File deleted successfully" });
    }
  } catch {
    return Promise.reject(new Error("Error Deleting File"));
  }
};

export const deleteAndUpdateFile = async (taskId: string, uuid: string, imageId: string) => {
  try {
    await deleteFile(uuid);
    await prisma.task.update({
      where: { id: taskId },
      data: { images: { delete: { id: imageId } } },
    });
    revalidatePath("/tasks");
  } catch {
    return Promise.reject(new Error("Error Deleting File"));
  }
};
