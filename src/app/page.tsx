import { createTodo } from "@/action/action";
import { InputDiv } from "@/components/InputDiv";
import prisma from "@/lib/prisma";
import { TodoItem } from "./TodoItem";
import { getAllActiveTodos, Todo } from "./todos.query";
import Header from "@/components/layout/Header";
import { auth } from "root/auth";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  const todos = await getAllActiveTodos(user?.id);

  console.log(todos);

  return (
    <main className="m-auto size-full max-w-3xl border bg-indigo-100">
      <Header />
      <section className="flex flex-col items-center justify-center gap-4 p-5">
        <h1 className="text-center text-xl font-semibold">Todo List</h1>
        <form
          className="grid w-full grid-cols-6 gap-2 border border-black"
          action={createTodo}
        >
          <InputDiv className="col-start-1 col-end-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title" // Pour que label fonctionne bien il faut le lier à un id
              placeholder="Name your task"
            />
          </InputDiv>
          <InputDiv className="col-start-6">
            <label htmlFor="deadline">Deadline</label>
            <input type="date" name="deadline" id="deadline" />
          </InputDiv>
          <InputDiv className="col-start-1 col-end-5">
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              id="content"
              placeholder="Describe your task"
            />
          </InputDiv>
          <InputDiv className="col-start-6">
            <label htmlFor="priority">Priority</label>
            <select name="priority" id="priority" defaultValue="low">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </InputDiv>
          <button
            type="submit"
            className="col-start-3 col-end-5 rounded-md border bg-indigo-300 py-1 hover:bg-indigo-500"
          >
            Add
          </button>
        </form>
        <section className="flex w-full flex-col items-start justify-center gap-4">
          {todos.map((todo: Todo) =>
            todo.isDone ? null : <TodoItem key={todo.id} todo={todo} />
          )}
        </section>
      </section>
    </main>
  );
}
