"use client";


import { WorkoutStoreProvider } from "@/stores/WorkoutStore";
import React from "react";
import { Provider as TinyBaseProvider } from "tinybase/ui-react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <TinyBaseProvider>

      <WorkoutStoreProvider />
        <div>{children}</div>
    </TinyBaseProvider>
  );
}

export default AdminLayout;
