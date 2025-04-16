'use client';

import CreateWorkoutSheet from '@/components/create-workout-sheet';
import { WorkoutStoreProvider } from '@/stores/WorkoutStore';
import { Provider as TinyBaseProvider } from 'tinybase/ui-react';

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <TinyBaseProvider>
      <WorkoutStoreProvider />
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Admin</h1>
        <CreateWorkoutSheet />
      </header>
      <main className="p-4">{children}</main>
    </TinyBaseProvider>
  );
}

export default AdminLayout;
