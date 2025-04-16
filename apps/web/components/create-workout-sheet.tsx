'use client';

import React, { useState } from 'react';
import { WORKOUT_STORE_ID } from '@/stores/WorkoutStore';
import { useStore } from 'tinybase/ui-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

function CreateWorkoutSheet() {
  const store = useStore(WORKOUT_STORE_ID);

  const [exerciseName, setExerciseName] = useState('');
  const [shortDemo, setShortDemo] = useState('');
  const [difficulty, setDifficulty] = useState('');
  // console.log({ exerciseName, shortDemo, difficulty });

  const handleAddWorkout = () => {
    if (!exerciseName) return;

    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `w_${Date.now()}`;

    store?.setRow('workouts', id, {
      excercise: exerciseName,
      short_demo: shortDemo,
      difficulty,
    });

    setExerciseName('');
    setShortDemo('');
    setDifficulty('');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Create Workout</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Workout</SheetTitle>
          <SheetDescription>Add a new workout to the TinyBase store.</SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4 mx-4">
          <div className="gap-2 flex flex-col">
            <Label htmlFor="exerciseName">Exercise Name</Label>
            <Input
              id="exerciseName"
              placeholder="Push-Up (Full)"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
            />
          </div>

          <div className="gap-2 flex flex-col">
            <Label htmlFor="shortDemo">Short Demo Link</Label>
            <Input
              id="shortDemo"
              placeholder="https://youtu.be/..."
              value={shortDemo}
              onChange={(e) => setShortDemo(e.target.value)}
            />
          </div>

          <div className="gap-2 flex flex-col">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Input
              id="difficulty"
              placeholder="Beginner"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            />
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleAddWorkout}>Add Workout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default CreateWorkoutSheet;
