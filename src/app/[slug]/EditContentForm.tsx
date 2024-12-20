"use client";

import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type EditContentFormProps = {
  actualContent?: string;
};

export const EditContentForm = ({ actualContent }: EditContentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  console.log(isEditing);
  return (
    <div className="flex h-full flex-[3] flex-col items-start justify-center  gap-4 border border-black">
      {isEditing ? (
        <form className="flex w-full flex-col gap-2">
          <label htmlFor="content">
            <h3 className="font-medium">Content</h3>
          </label>
          <textarea
            name="content"
            id="content"
            className={cn(
              "min-h-32 w-full flex-1 rounded-md border bg-muted marker:text-base",
              {
                "bg-muted": isEditing,
              }
            )}
            defaultValue={actualContent}
          />
          <div className="ml-auto flex flex-row gap-2">
            <Button type="submit" size="md">
              Save
            </Button>
            <Button
              size="md"
              className="ml-auto"
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
            {actualContent}
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
