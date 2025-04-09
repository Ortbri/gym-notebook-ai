'use server';

import { TestClient } from '~/components/testClient';
// import { ChatUI } from '~/components/ChatUI';
import { AI } from '~/providers/AiProvider';

export async function renderRoot() {
  return (
    <AI>
      <TestClient />
    </AI>
  );
}
