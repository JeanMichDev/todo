"use client";

import { deleteTodo, updateTodo } from "@/action/action";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Todo } from "./todos.query";
import { DoneUndoneForm } from "@/components/doneUndoneForm";

type TodoItemProps = {
  todo: Todo;
  className?: string;
};

export const TodoItem = ({ todo, className }: TodoItemProps) => {
  const deadline = todo.deadline
    ? new Intl.DateTimeFormat("fr-FR").format(todo.deadline)
    : "No deadline";

  return (
    <div className="flex w-full flex-row items-center justify-items-center gap-4 rounded-md border border-black px-2 py-4 ">
      <h2 className="text-lg font-semibold">
        <Link href={`/${todo.slug}`}>{todo.title}</Link>
      </h2>
      <DoneUndoneForm todo={todo} className="ml-auto" />
      <p className="text-base">{todo.priority}</p>
      <p className="text-base">{deadline}</p>
      <button
        className="bg-red-400 text-red-500"
        onClick={() => {
          deleteTodo(todo.slug);
        }}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};
