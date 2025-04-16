"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useWorkoutPage } from "@/stores/WorkoutStore";

// Define a more specific type for a workout
type Workout = ReturnType<typeof useWorkoutPage>[number];

const visibleCols: (keyof Workout)[] = [
  "id",
  "name",
  "difficulty",
  "muscle_group",
  "equipment_main",
];

const PAGE_SIZE = 200;

export function TableDemo() {
  const [pageIndex, setPageIndex] = useState(0);
  const workouts = useWorkoutPage(pageIndex);

  console.log(`page index ------ ${pageIndex} `);
  // Use the specific Workout type
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const handleNext = () => {
    if (workouts.length === PAGE_SIZE) setPageIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (pageIndex > 0) setPageIndex((prev) => prev - 1);
  };

  return (
    <div className="overflow-auto space-y-4">
      <Table className="">
        <TableHeader>
          <TableRow>
            {visibleCols.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {workouts.map((workout) => (
            <TableRow
              key={`${workout.id}-${pageIndex}`} // ← force key uniqueness across pages
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => setSelectedWorkout(workout)}
            >
              {visibleCols.map((col) => (
                <TableCell key={col}>
                  {typeof workout[col] === "string" ||
                  typeof workout[col] === "number"
                    ? workout[col]
                    : ""}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              className={
                pageIndex === 0 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm text-muted-foreground px-2">
              Page {pageIndex + 1}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={
                workouts.length < PAGE_SIZE
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Detail Sheet */}
      <Sheet
        open={!!selectedWorkout}
        onOpenChange={(open) => !open && setSelectedWorkout(null)}
      >
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">
              {selectedWorkout?.name ?? "Workout"}
            </SheetTitle>
          </SheetHeader>
          <div className="m-4 space-y-1 text-sm">
            {selectedWorkout &&
              Object.entries(selectedWorkout).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between border-b py-1 text-muted-foreground"
                >
                  <span className="font-medium text-primary">{key}</span>
                  <span>{String(value)}</span>
                </div>
              ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
