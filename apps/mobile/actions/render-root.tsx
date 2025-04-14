'use server';

import { ChatUI } from '~/components/ChatUI';
import { TestClient } from '~/components/testClient';
import { AI } from '~/providers/AiProvider';

export async function renderRoot() {
  return (
    <AI>
      <TestClient />
    </AI>
  );
}
