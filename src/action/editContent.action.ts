"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const editContent = async (formData: FormData) => {
  try {
    await prisma.todo.update({
      where: {
        id: formData.get("id") as string,
      },
      data: {
        content: formData.get("content") as string,
      },
    });
    console.log("content updated");
  } catch (e) {
    console.error(e);
  }
  revalidatePath("/");
};
