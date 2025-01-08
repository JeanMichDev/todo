"use client";

import { createTodo } from "@/action/action";
import { Button } from "@/components/Button";
import { InputDiv } from "@/components/InputDiv";
import { useState } from "react";

type TodoFormProps = {
  userId?: string;
};

function TodoForm({ userId }: TodoFormProps) {
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  return (
    <form
      className="flex w-full flex-col items-center justify-center gap-2 border border-black"
      action={async (formData: FormData) => {
        await createTodo(formData, userId);
      }}
    >
      <div className="grid w-full grid-cols-6 gap-2 border border-black">
        <InputDiv className="col-start-1 col-end-4">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title" // Pour que label fonctionne bien il faut le lier à un id
            placeholder="Name your task"
            required
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
      </div>
      <div
        className="relative size-fit border-4 border-red-700"
        onMouseEnter={() => (!userId ? setIsWarningOpen(true) : null)}
        onMouseLeave={() => setIsWarningOpen(false)}
      >
        <Button
          type="submit"
          size="lg"
          className="rounded-md border bg-indigo-300 py-1 transition hover:bg-indigo-500"
          disabled={!userId}
        >
          Add
        </Button>
        {isWarningOpen ? (
          <div className="absolute top-10 rounded-sm bg-red-400 p-2 font-thin italic transition">
            You need to be logged in to add a task
          </div>
        ) : null}
      </div>
    </form>
  );
}

export default TodoForm;
