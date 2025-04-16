'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { UploadWorkoutCSV } from './upload-csv';

function CreateWorkoutSheet() {

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
        <UploadWorkoutCSV />
      </SheetContent>
    </Sheet>
  );
}

export default CreateWorkoutSheet;
