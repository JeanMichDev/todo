"use client";
import { updateIsDoneTodo } from "@/action/action";
import { TodoView } from "@/app/[todoId]/todo.query";
import { Todo } from "@/app/todos.query";
import { cn } from "@/lib/utils";

type DoneUndoneProps = {
  todo: TodoView;
  className?: string;
};

export const DoneUndoneForm = ({ todo, className }: DoneUndoneProps) => {
  const isDoneString = todo.isDone.toString();
  return (
    <form
      onChange={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        updateIsDoneTodo(formData);
      }}
      className={cn("", className)}
    >
      {/* //hidden input pour choper le id  et l'utiliser dans la query updateTodo*/}
      <input type="hidden" name="id" value={todo.id} />
      <select name="isDone" id="isDone" defaultValue={isDoneString}>
        <option value="true">Done</option>
        <option value="false">Not done</option>
      </select>
    </form>
  );
};
