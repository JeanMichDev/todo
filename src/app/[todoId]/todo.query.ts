import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getTodo = async (todoId: string) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id: todoId,
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
