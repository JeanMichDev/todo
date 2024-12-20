"use client";
import { updateTodo } from "@/action/action";
import { Todo } from "@/app/todos.query";
import { cn } from "@/lib/utils";

type SetPriorityProps = {
  todo: Todo;
  className?: string;
};

export const SetPriorityForm = ({ todo, className }: SetPriorityProps) => {
  return (
    <form
      onChange={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        updateTodo(formData);
        console.log(formData, "updated");
      }}
      className={cn("", className)}
    >
      {/* //hidden input pour choper le id  et l'utiliser dans la query updateTodo*/}
      <input type="hidden" name="id" value={todo.id} />
      <select name="priority" id="priority" defaultValue={todo.priority}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </form>
  );
};
