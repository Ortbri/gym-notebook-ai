import { renderLaunchDetail } from '@/functions/render-launch-id';
import React, { useMemo } from 'react';

import '@/global.css';
import LaunchDetailSkeleton from './launch-detail-skeleton';
import { BodyScrollView } from './ui/rnUi/BodyScrollView';

export default function LaunchDetail({ id }: { id: string }) {
  const screen = useMemo(() => renderLaunchDetail({ id }), [id]);

  return (
    <BodyScrollView>
      <React.Suspense fallback={<LaunchDetailSkeleton />}>{screen}</React.Suspense>
    </BodyScrollView>
  );
}
