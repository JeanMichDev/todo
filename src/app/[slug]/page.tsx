import { Button } from "@/components/Button";
import { DoneUndoneForm } from "@/components/doneUndoneForm";
import { SetPriorityForm } from "@/components/setPriorityForm";
import prisma from "@/lib/db";
import { unstable_cache as cache } from "next/cache";
import { notFound } from "next/navigation";
import { EditContentForm } from "./EditContentForm";

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
  params: { slug: string };
}) {
  const { slug } = await params;
  const todo = await getCachedTodo(slug);
  if (!todo) notFound();

  const deadline = todo.deadline
    ? new Intl.DateTimeFormat("fr-FR").format(new Date(todo.deadline))
    : "No deadline";

  return (
    <main className="m-auto size-full max-w-3xl border bg-indigo-100">
      <header className="flex flex-col items-center justify-center gap-4 p-5">
        <h1 className="text-center text-xl font-semibold">Todo List</h1>
        <h2 className="self-start text-lg font-medium">{todo.title}</h2>
      </header>
      <section className="flex w-full flex-row items-start justify-center gap-4   border border-black p-5">
        <EditContentForm actualContent="flex h-full flex-[3] flex-col items-start justify-center  gap-4 border border-black" />

        <div className="flex w-full flex-1 flex-col items-end justify-center gap-4 border border-black">
          <h3>Statut</h3>
          <DoneUndoneForm todo={todo} />
          <h3>Priority</h3>
          <SetPriorityForm todo={todo} />
          <h3>Deadline</h3>
          <p>{deadline}</p>
        </div>
      </section>
    </main>
  );
}
