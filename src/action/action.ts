"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createTodo = async (formData: FormData) => {
  // on vérifie si la date est renseignée pour ne pas avoir undefined et éviter une erreur
  const deadline = formData.get("deadline")
    ? new Date(formData.get("deadline") as string)
    : null;

  try {
    await prisma.todo.create({
      data: {
        title: formData.get("title") as string,
        slug: (formData.get("title") as string)
          .replace(/\s/g, "-")
          .toLowerCase(),
        priority: formData.get("priority") as string,
        content: formData.get("content") as string,
        isDone: false,
        deadline,

        User: {
          connect: {
            email: "zob@gmail.com",
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
  }
  revalidatePath("/"); // pour refresh la page automatiquement et afficher le nouveau todo
};

export const updateIsDoneTodo = async (formData: FormData) => {
  try {
    await prisma.todo.update({
      where: {
        id: formData.get("id") as string,
      },
      data: {
        isDone: formData.get("isDone") === "true", // pour transformer le string en boolean
        canceledAt: new Date(),
      },
    });
  } catch (e) {
    console.log("error", formData, formData.get("isDone"));
    console.error(e);
  }
  revalidatePath("/");
};

export const updateDeadline = async (formData: FormData) => {
  const deadline = formData.get("deadline")
    ? new Date(formData.get("deadline") as string)
    : null;
  try {
    await prisma.todo.update({
      where: {
        id: formData.get("id") as string,
      },
      data: {
        deadline,
      },
    });
  } catch (e) {
    console.error(e);
  }
  revalidatePath("/");
};

export const updatePriority = async (formData: FormData) => {
  try {
    await prisma.todo.update({
      where: {
        id: formData.get("id") as string,
      },
      data: {
        priority: formData.get("priority") as string,
      },
    });
  } catch (e) {
    console.error(e);
  }
  revalidatePath("/");
};

export const deleteForeverTodo = async (id: string) => {
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    console.error(e);
  }
  revalidatePath("/");
};

export const removeTodo = async (id: string) => {
  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        canceledAt: new Date(),
      },
    });
  } catch (e) {
    console.error(e);
  }
  revalidatePath("/");
};
