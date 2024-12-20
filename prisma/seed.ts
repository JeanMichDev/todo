import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const initialTodos: Prisma.TodoCreateInput[] = [
  {
    title: "Learn React",
    slug: "learn-react",
    User: {
      connectOrCreate: {
        where: {
          email: "zob@gmail.com",
        },
        create: {
          email: "zob@gmail.com",
        },
      },
    },
  },
];

async function main() {
  console.log("Start seeding ...");
  for (const todo of initialTodos) {
    await prisma.todo.create({
      data: todo,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
