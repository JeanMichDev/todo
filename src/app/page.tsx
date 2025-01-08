import { createTodo } from "@/action/action";
import { InputDiv } from "@/components/InputDiv";
import { TodoItem } from "./TodoItem";
import { getAllActiveTodos, Todo } from "./todos.query";

import { getAuthSession, getRequiredAuthSession } from "@/lib/authentication";
import TodoForm from "./TodoForm";

export default async function Home() {
  const session = await getAuthSession();

  const todos = await getAllActiveTodos(session?.user?.id);

  return (
    <main className="m-auto size-full max-w-3xl border bg-indigo-100 2xl:max-w-7xl">
      <section className="flex flex-col items-center justify-center gap-4 p-5">
        <h1 className="text-center text-xl font-semibold">Todo List</h1>
        <TodoForm userId={session?.user?.id} />
        <section className="flex w-full flex-col items-start justify-center gap-4">
          {todos.map((todo: Todo) =>
            todo.isDone ? null : <TodoItem key={todo.id} todo={todo} />
          )}
        </section>
      </section>
    </main>
  );
}
