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

export const updateTodo = async (formData: FormData) => {
  await prisma.todo.update({
    where: {
      id: formData.get("id") as string,
    },
    data: {
      isDone: formData.get("isDone") === "true",
    },
  });
  revalidatePath("/");
};

export const deleteTodo = async (slug: string) => {
  await prisma.todo.delete({
    where: {
      slug,
    },
  });
  revalidatePath("/");
};
