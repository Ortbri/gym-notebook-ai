'use server';

import { ChatUI } from '~/components/ChatUI';
import { AI } from '~/providers/AiProvider';

export async function renderRoot() {
  return (
    <AI>
      <ChatUI />
    </AI>
  );
}
