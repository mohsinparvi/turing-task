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
import { AddNotesApi } from "@/services/call-service";
import React, { FC, memo, useState } from "react";

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
  const [content, setContent] = useState<string>("");

  const callDetails = [
    {
      label: "Call Type",
      value: call_type,
      extraClass: "text-blue-600 capitalize",
    },
    { label: "Durations", value: formatDuration(Number(duration)) },
    { label: "From", value: from },
    { label: "To", value: to },
    { label: "Via", value: via },
  ];

  const handleSaveNote = async () => {
    setIsLoading(true);
    try {
      const response = await AddNotesApi(id, content);
      if (response) {
        setOpen(false);
        setContent("");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
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
          {callDetails.map(({ label, value, extraClass }, index) => (
            <React.Fragment key={index}>
              <p>{label}</p>
              <p className={extraClass || ""}>{value}</p>
            </React.Fragment>
          ))}
        </div>
        <div className="space-y-4">
          <p>Notes</p>
          <textarea
            className="w-full h-32 border border-gray-300 rounded-md p-2"
            placeholder="Add your notes here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>
        )}
        <DialogFooter>
          <Button
            loading={isLoading}
            type="submit"
            variant="default"
            color="blue"
            disabled={content.length === 0}
            onClick={handleSaveNote}
            className="w-full"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(AddNotes);
