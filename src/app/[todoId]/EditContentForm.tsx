"use client";

import { editContent } from "@/action/editContent.action";
import { Button } from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { RefObject, useEffect, useRef, useState } from "react";
import { TodoView } from "./todo.query";

type EditContentFormProps = {
  todo: TodoView;
};

export const EditContentForm = ({ todo }: EditContentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex h-full flex-[3] flex-col items-start justify-center  gap-4 border border-black">
      {isEditing ? (
        <EditingContentForm
          todo={todo}
          ref={inputRef}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
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
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

type EditingContentFormProps = {
  todo: TodoView;
  ref: RefObject<HTMLTextAreaElement>;
  isEditing: boolean;
  setIsEditing: (arg: boolean) => void;
};

const EditingContentForm = ({
  todo,
  ref,
  isEditing,
  setIsEditing,
}: EditingContentFormProps) => {
  //on focus le textarea au montage du composant
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      // puis on place le curseur à la fin du texte
      ref.current.setSelectionRange(
        ref.current.value.length,
        ref.current.value.length
      );
    }
  });

  return (
    <form
      className="flex w-full flex-col gap-2"
      action={async (formData) => {
        await editContent(formData); // Appelle l'action asynchrone
        setIsEditing(false); // Change l'état après que l'action est terminée
      }}
    >
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
        ref={ref}
      />
      <div className="ml-auto flex flex-row gap-2">
        <Button type="submit" size="md">
          Save
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="md">Cancel</Button>
          </DialogTrigger>
          <DialogContent className="w-fit items-center justify-center p-10">
            <DialogHeader>
              <DialogTitle>Warning: you will lose your changes</DialogTitle>
              <DialogDescription>Do you wish to continue ?</DialogDescription>
            </DialogHeader>
            <DialogFooter className="w-full sm:justify-between">
              <DialogClose asChild>
                <Button size="md">Go back</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  size="md"
                  intent="default"
                  onClick={() => setIsEditing(false)}
                  className="ml-auto"
                >
                  Continue
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </form>
  );
};
