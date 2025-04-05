"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDuration } from "@/lib/helpers";
import { AddNotesProps } from "@/lib/types";
import { FC, memo, useState } from "react";

const AddNotes: FC<AddNotesProps> = ({
  id,
  call_type,
  duration,
  from,
  to,
  via,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  console.log("id", id);
  const handleDeleteUser = async () => {
    setIsLoading(true);

    try {
    } catch (error) {
      console.error("Error adding category:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-end items-center w-full">
          <Button
            variant="default"
            size="sm"
            className="bg-blue-600 text-white"
          >
            Add Note
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Notes</DialogTitle>
          <DialogDescription className="text-blue-600">
            Call ID {id}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <p>Call Type</p>
          <p className="text-blue-600">{call_type}</p>
          <p>Durations</p>
          <p>{formatDuration(Number(duration))}</p>
          <p>From</p>
          <p>{from}</p>
          <p>To</p>
          <p>{to}</p>
          <p>Via</p>
          <p>{via}</p>
        </div>
        <div className="space-y-4">
          <p>Notes</p>
          <textarea
            className="w-full h-32 border border-gray-300 rounded-md p-2"
            placeholder="Add your notes here..."
          ></textarea>
        </div>
        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>
        )}
        <DialogFooter>
          <Button
            loading={isLoading}
            type="submit"
            variant="destructive"
            color="red"
            onClick={handleDeleteUser}
          >
            Delete
          </Button>
          <Button type="button" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(AddNotes);
