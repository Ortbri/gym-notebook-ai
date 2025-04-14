'use client';

import dynamic from 'next/dynamic';

// Skeleton for loading state
function NotebookSkeleton() {
  return (
    <div className="mt-10 relative bg-background">
      <div 
        className="w-[850px] h-[1100px] rounded-3xl relative shadow-2xl animate-pulse bg-gray-200 dark:bg-gray-800"
      ></div>
    </div>
  );
}

// Dynamic import with client-side only rendering
const DynamicNotebook = dynamic(() => import('./Notebook'), { 
  loading: () => <NotebookSkeleton />,
  ssr: false 
});

export function NotebookWrapper() {
  return <DynamicNotebook />;
} 