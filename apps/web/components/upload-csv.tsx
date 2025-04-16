"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { useStore } from "tinybase/ui-react";
import { WORKOUT_STORE_ID } from "@/stores/WorkoutStore";

export function UploadWorkoutCSV() {
  const store = useStore(WORKOUT_STORE_ID);
  const [batchInfo, setBatchInfo] = useState({ count: 0, current: 0 });
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
  const getFieldUsage = () => {
    const usage: Record<string, boolean> = {};
    for (const field of REQUIRED_FIELDS) {
      usage[field] = rows.some((row) => {
        const val = row[field];
        return val !== null && val !== undefined && String(val).trim() !== "";
      });
    }
    return usage;
  };

  const BATCH_SIZE = 100;
  const BATCH_DELAY = 0;

  const handleImport = () => {
    if (!store || !rows.length) return;

    let index = 0;
    let batchCount = 0;

    const importChunk = () => {
      const chunk = rows.slice(index, index + BATCH_SIZE);
      batchCount++;

      console.log(`📦 Importing batch #${batchCount} (${chunk.length} rows)`);

      for (const row of chunk) {
        const id = row.id?.trim();
        if (!id) continue;
        store.setRow("workouts", id, { ...row, id });
    }
    
    setBatchInfo({
      count: Math.ceil(rows.length / BATCH_SIZE),
      current: batchCount,
    });
      index += BATCH_SIZE;
      if (index < rows.length) {
        setTimeout(importChunk, BATCH_DELAY);
      } else {
        console.log("✅ Import complete");
        console.log(`Total batches: ${batchCount}`);
        setRows([]);
      }
    };

    importChunk();
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
      {batchInfo.count > 0 && (
        <div className="text-sm text-muted-foreground">
          Importing batch {batchInfo.current} of {batchInfo.count}…
        </div>
      )}
      {rows.length > 0 && (
        <>
          <div className="text-sm text-muted-foreground">
            ✅ {rows.length} rows parsed. First: <code>{rows[0]?.name}</code>
          </div>

          {/* Field usage checklist */}
          <div className="text-left max-h-60 overflow-auto border rounded-md p-3 text-sm bg-muted">
            <p className="font-medium mb-2">📋 Field usage checklist:</p>
            <ul className="grid grid-cols-2 gap-y-1 text-muted-foreground">
              {Object.entries(getFieldUsage()).map(([field, used]) => (
                <li key={field}>
                  {used ? "✔️" : "❌"} <code>{field}</code>
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={handleImport} className="cursor-pointer">
            Import to TinyBase
          </Button>
        </>
      )}
    </div>
  );
}

const REQUIRED_FIELDS = [
  "id",
  "name",
  "short_demo",
  "long_demo",
  "difficulty",
  "muscle_group",
  "muscle_1",
  "muscle_2",
  "muscle_3",
  "equipment_main",
  "equipment_main_qty",
  "equipment_secondary",
  "equipment_secondary_qty",
  "posture",
  "arm_type",
  "arm_mode",
  "grip",
  "load_position",
  "leg_mode",
  "foot_elevation",
  "combo_type",
  "pattern_1",
  "pattern_2",
  "pattern_3",
  "plane_1",
  "plane_2",
  "plane_3",
  "region",
  "force_type",
  "mechanics",
  "laterality",
  "category",
];
