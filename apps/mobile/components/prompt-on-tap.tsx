'use client';

import { useActions, useUIState } from 'ai/rsc';
import { useCallback } from 'react';
import { TouchableOpacityProps } from 'react-native';

import TouchableBounce from './TouchableBounce';
import { UserMessage } from './user-message';
import type { AI } from '../providers/AiProvider';

// import type { AI } from '@/components/ai-context';
export function PromptOnTap({
  prompt,
  onPress,
  ...props
}: { prompt: string | [string, string] } & TouchableOpacityProps) {
  const onPressPrompt = usePromptOnPress(prompt);
  return (
    <TouchableBounce
      {...props}
      sensory
      onPress={async (e) => {
        onPress?.(e);
        onPressPrompt();
      }}
    />
  );
}

function usePromptOnPress(prompt: string | [string, string]) {
  const [, setMessages] = useUIState<typeof AI>();
  const { onSubmit } = useActions<typeof AI>();

  return useCallback(async () => {
    const [displayPrompt, detailedPrompt] = Array.isArray(prompt) ? prompt : [prompt, prompt];
    setMessages((currentMessages: any[]) => [
      ...currentMessages,
      {
        id: Date.now(),
        display: <UserMessage>{displayPrompt}</UserMessage>,
      },
    ]);
    const response = await onSubmit(detailedPrompt);
    setMessages((currentMessages: any[]) => [...currentMessages, response]);
  }, [setMessages, onSubmit, prompt]);
}
