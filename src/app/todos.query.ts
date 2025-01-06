import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getAllActiveTodos = async (userId?: string) => {
  return await prisma.todo.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      isDone: true,
      userId: true,
      content: true,
      priority: true,
      deadline: true,
      canceledAt: true,
    },
  });
};

export type Todo = Prisma.PromiseReturnType<typeof getAllActiveTodos>[number];

// model Todo {
//   id         String    @id @default(cuid())
//   title      String
//   slug       String    @unique
//   priority   String    @default("medium")
//   content    String?
//   done       Boolean   @default(false)
//   createdAt  DateTime  @default(now())
//   deadline   DateTime?
//   canceledAt DateTime?
//   User       User      @relation(fields: [userId], references: [id])
//   userId     String

//   @@index(slug)
// }
