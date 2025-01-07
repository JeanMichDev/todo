import { DoneUndoneForm } from "@/components/doneUndoneForm";
import { SetDeadlineForm } from "@/components/setDeadlineForm";
import { SetPriorityForm } from "@/components/setPriorityForm";
import prisma from "@/lib/prisma";
import { unstable_cache as cache } from "next/cache";
import { notFound } from "next/navigation";
import { EditContentForm } from "./EditContentForm";
import { getTodo } from "./todo.query";

const getCachedTodo = await cache((slug) => {
  return prisma.todo.findUnique({
    where: {
      slug,
    },
  });
});

export default async function UniqueTodo({
  params,
}: {
  params: { todoId: string };
}) {
  const { todoId } = await params;
  const todo = await getTodo(todoId);
  if (!todo) notFound();

  return (
    <main className="m-auto size-full max-w-3xl border bg-indigo-100">
      <header className="flex flex-col items-center justify-center gap-4 p-5">
        <h1 className="text-center text-xl font-semibold">Todo List</h1>
        <h2 className="self-start text-lg font-medium">{todo.title}</h2>
      </header>
      <section className="flex w-full flex-row items-start justify-center gap-4   border border-black p-5">
        <EditContentForm todo={todo} />
        <div className="flex w-full flex-1 flex-col items-end justify-center gap-4 border border-black">
          <h3>Statut</h3>
          <DoneUndoneForm todo={todo} />
          <h3>Priority</h3>
          <SetPriorityForm todo={todo} />
          <h3>Deadline</h3>
          <SetDeadlineForm todo={todo} />
        </div>
      </section>
    </main>
  );
}
