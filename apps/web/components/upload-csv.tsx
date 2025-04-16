"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { useStore } from "tinybase/ui-react";
import { WORKOUT_STORE_ID } from "@/stores/WorkoutStore";
import { SheetClose, SheetFooter } from "./ui/sheet";

export function UploadWorkoutCSV() {
  const store = useStore(WORKOUT_STORE_ID);
  const [rows, setRows] = useState<any[]>([]); // type error

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setRows(result.data as any[]); // type error
      },
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleImport = () => {
    if (!store || !rows.length) return;

    for (const row of rows) {
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `w_${Date.now()}_${Math.random()}`;

      store.setRow("workouts", id, row);
    }

    setRows([]);
  };

  return (
    <div className=" p-4 rounded-xl space-y-4">
      <div
        {...getRootProps()}
        className="cursor-pointer border-2 border-dashed rounded-md p-6 text-center hover:bg-muted/50"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the CSV here…</p>
        ) : (
          <p>Drag and drop a workout CSV file here, or click to select</p>
        )}
      </div>
      {rows.length > 0 && (
        <SheetFooter>
          {/* <Button onClick={handleAddWorkout}>Add Workout</Button> */}
          <div className="animate-fade-in">
            <p className="text-sm text-muted-foreground">
              {rows.length} rows parsed. First:{" "}
              <code>{rows[0]?.excercise}</code>
            </p>
            <SheetClose asChild>
              <Button className="" onClick={handleImport}>
                Import to TinyBase
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      )}
    </div>
  );
}
