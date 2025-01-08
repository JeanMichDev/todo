import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getTodo = async (todoId: string, userId: string) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id: todoId,
      userId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      deadline: true,
      priority: true,
      isDone: true,
    },
  });

  if (!todo) return null;

  return todo;
};

export type TodoView = NonNullable<Prisma.PromiseReturnType<typeof getTodo>>;
