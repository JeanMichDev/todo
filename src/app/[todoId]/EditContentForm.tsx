"use client";

import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Todo } from "../todos.query";
import { editContent } from "@/action/editContent.action";
import { TodoView } from "./todo.query";

type EditContentFormProps = {
  todo: TodoView;
};

export const EditContentForm = ({ todo }: EditContentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  console.log(todo.content);
  return (
    <div className="flex h-full flex-[3] flex-col items-start justify-center  gap-4 border border-black">
      {isEditing ? (
        <form className="flex w-full flex-col gap-2" action={editContent}>
          <label htmlFor="content">
            <h3 className="font-medium">Content</h3>
          </label>
          <input type="hidden" name="id" value={todo.id} />
          <textarea
            name="content"
            id="content"
            className={cn(
              "min-h-32 w-full flex-1 rounded-md border bg-muted marker:text-base",
              {
                "bg-muted": isEditing,
              }
            )}
            defaultValue={todo.content ? todo.content : ""}
          />
          <div className="ml-auto flex flex-row gap-2">
            <Button type="submit" size="md">
              Save
            </Button>
            <Button
              size="md"
              className=""
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex w-full flex-col gap-2">
          <h3 className="font-medium">Content</h3>
          <p className="min-h-32 w-full flex-1 rounded-md border bg-muted/70 text-base">
            {todo.content ? todo.content : "No content"}
          </p>
          <Button
            size="md"
            className="ml-auto disabled:opacity-90"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
      )}
    </div>
  );
};
