"use client";
import { updateDeadline } from "@/action/action";
import { TodoView } from "@/app/[todoId]/todo.query";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { RefObject, useEffect, useRef, useState } from "react";

type SetDeadlineProps = {
  todo: TodoView;
  className?: string;
};

export const SetDeadlineForm = ({ todo, className }: SetDeadlineProps) => {
  const defaultDeadline = todo.deadline
    ? todo.deadline.toISOString().split("T")[0]
    : "No deadline";

  const inputRef = useRef<HTMLInputElement>(null);

  const [isDeadlineFormOpen, setIsDeadlineFormOpen] = useState(() =>
    defaultDeadline === "No deadline" ? false : true
  );

  return isDeadlineFormOpen ? (
    <DeadlineInput
      defaultDeadline={defaultDeadline}
      ref={inputRef}
      setIsDeadlineFormOpen={() => setIsDeadlineFormOpen(false)}
      todo={todo}
    />
  ) : (
    <div
      className="flex flex-row items-center justify-center gap-2"
      onClick={() => {
        setIsDeadlineFormOpen(true);
        console.log(inputRef.current);
        inputRef.current?.focus();
      }}
    >
      <p>{defaultDeadline}</p>
      <Calendar size={16} />
    </div>
  );
};

type DeadlineInputProps = {
  todo: TodoView;
  defaultDeadline: string;
  ref: RefObject<HTMLInputElement>;
  setIsDeadlineFormOpen: (arg: boolean) => void;
  className?: string;
};

const DeadlineInput = ({
  todo,
  defaultDeadline,
  ref,
  setIsDeadlineFormOpen,
  className,
}: DeadlineInputProps) => {
  useEffect(() => {
    // on focus uniquement lorsque l'on a cliqué sur "No deadline" ou le calendrier
    if (ref.current && !ref.current.value) {
      ref.current.focus();
    }
  });

  return (
    <form
      onChange={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        updateDeadline(formData);
      }}
      className={cn("", className)}
    >
      {/* //hidden input pour choper le id  et l'utiliser dans la query updateTodo*/}
      <input type="hidden" name="id" value={todo.id} />
      <label htmlFor="deadline" className="hidden">
        Deadline
      </label>
      <input
        type="date"
        name="deadline"
        id="deadline"
        defaultValue={defaultDeadline}
        onBlur={() => {
          if (!ref.current?.value) {
            setIsDeadlineFormOpen(false);
          }
        }}
        ref={ref}
        className="bg-red-400 focus:bg-slate-200"
      />
    </form>
  );
};
