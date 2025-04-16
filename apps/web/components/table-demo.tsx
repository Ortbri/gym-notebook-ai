'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useWorkoutPage } from '@/stores/WorkoutStore';

const title: (keyof ReturnType<typeof useWorkoutPage>[number])[] = [
  'excercise',
  'short_demo',
  'difficulty',
];

export function TableDemo() {
  const workouts = useWorkoutPage(0); // This updates reactively via TinyBase
  // console.log(useWorkoutPage(0))

  // console.log('🧠 Live Workouts:', workouts);
  // console.log("hello")
  // console.log('WORKOUTS:', JSON.stringify(workouts, null, 2));
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {title.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {workouts.map((workout) => (
            <TableRow key={workout.id}>
              {title.map((col) => (
                <TableCell key={col}>
                  {typeof workout[col] === 'string' || typeof workout[col] === 'number'
                    ? workout[col]
                    : ''}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
