"use client";

import { removeTodo } from "@/action/action";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Todo } from "./todos.query";
import { DoneUndoneForm } from "@/components/doneUndoneForm";
import { SetDeadlineForm } from "@/components/setDeadlineForm";
import { SetPriorityForm } from "@/components/setPriorityForm";

type TodoItemProps = {
  todo: Todo;
  className?: string;
};

export const TodoItem = ({ todo, className }: TodoItemProps) => {

  return (
    <div className="flex w-full flex-row items-center justify-items-center gap-4 rounded-md border border-black px-2 py-4 ">
      <h2 className="text-lg font-semibold">
        <Link href={`/${todo.id}`}>{todo.title}</Link>
      </h2>
      <DoneUndoneForm todo={todo} className="ml-auto" />
      <SetPriorityForm todo={todo} />
      <SetDeadlineForm todo={todo} />
      <button
        className="bg-red-400 text-red-500"
        onClick={() => {
          removeTodo(todo.id);
        }}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};
