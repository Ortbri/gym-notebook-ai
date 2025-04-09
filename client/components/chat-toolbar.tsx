'use client';

import { useActions, useUIState } from 'ai/rsc';
// import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputSubmitEditingEventData,
  // useColorScheme,
  View,
} from 'react-native';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUnistyles } from 'react-native-unistyles';

import { IconSymbol } from './IconSymbol';
import TouchableBounce from './TouchableBounce';
import { FirstSuggestions } from './first-suggestions';
import { UserMessage } from './user-message';
import type { AI } from '../providers/AiProvider';

// import { nanoid } from '@/util/nanoid';
// import { tw } from '@/util/tw';
import { nanoid } from '~/utils/nanoid';

// const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

interface ChatToolbarInnerProps {
  messages: ReturnType<typeof useUIState<typeof AI>>[0];
  setMessages: ReturnType<typeof useUIState<typeof AI>>[1];
  onSubmit: ReturnType<typeof useActions<typeof AI>>['onSubmit'];
  disabled?: boolean;
}

export function ChatToolbarInner({
  messages,
  setMessages,
  onSubmit,
  disabled = false,
}: ChatToolbarInnerProps) {
  const { theme, rt } = useUnistyles();
  const [inputValue, setInputValue] = useState('');
  const textInput = useRef<TextInput>(null);
  const { bottom } = useSafeAreaInsets();
  const keyboard = useAnimatedKeyboard();

  const translateStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: -keyboard.height.value }],
    }),
    [bottom]
  );

  const blurStyle = useAnimatedStyle(() => {
    const assumedKeyboardHeight = 100;
    const inverse = Math.max(
      0,
      Math.min(1, (assumedKeyboardHeight - keyboard.height.value) / assumedKeyboardHeight)
    );

    return {
      paddingBottom: 8 + bottom * inverse,
    };
  }, [bottom]);

  const onSubmitMessage = useCallback(
    (value: string) => {
      if (value.trim() === '') {
        textInput.current?.blur();
        return;
      }

      if (process.env.EXPO_OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }

      setTimeout(() => {
        textInput.current?.clear();
      });

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: nanoid(),
          display: <UserMessage>{value}</UserMessage>,
        },
      ]);

      onSubmit(value).then((responseMessage) => {
        setMessages((currentMessages) => [...currentMessages, responseMessage]);
      });

      setInputValue('');
    },
    [textInput, setMessages, onSubmit]
  );

  const onSubmitEditing = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      onSubmitMessage(e.nativeEvent.text);
    },
    [onSubmitMessage]
  );

  // const theme = useColorScheme();

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
          gap: 8,
          pointerEvents: 'box-none',
        },
        translateStyle,
      ]}>
      <View style={{ width: '100%', maxWidth: 768, marginHorizontal: 'auto' }}>
        {!disabled && messages.length === 0 && <FirstSuggestions />}
      </View>

      <Animated.View
        // tint={theme === 'light' ? 'systemChromeMaterial' : 'systemChromeMaterialDark'}
        style={[
          {
            backgroundColor: 'black',
            paddingTop: 8,
            paddingBottom: 8,
            paddingHorizontal: 16,
            alignItems: 'stretch',
          },
          blurStyle,
        ]}>
        <View
          style={[
            {
              flexDirection: 'row',
              gap: 8,

              alignItems: 'stretch',
            },
            // tw`md:w-[768px] max-w-[768px] md:mx-auto`,
          ]}>
          <TextInput
            ref={textInput}
            onChangeText={setInputValue}
            keyboardAppearance={rt.themeName === 'light' ? 'light' : 'dark'}
            // cursorColor={AC.label}
            returnKeyType="send"
            blurOnSubmit={false}
            // selectionHandleColor={AC.label}
            // selectionColor={AC.label}
            style={{
              pointerEvents: disabled ? 'none' : 'auto',
              color: theme.colors.text.primary,
              padding: 16,
              borderColor: theme.colors.border.light,
              backgroundColor: theme.colors.bg.secondary,
              borderWidth: 1,
              borderRadius: 999,
              paddingVertical: 8,
              fontSize: 16,
              outline: 'none',
              flex: 1,
            }}
            placeholder="Ask anything"
            autoCapitalize="sentences"
            autoCorrect
            // placeholderTextColor={AC.systemGray2}
            onSubmitEditing={onSubmitEditing}
          />

          <SendButton enabled={!!inputValue.length} onPress={() => onSubmitMessage(inputValue)} />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

function SendButton({ enabled, onPress }: { enabled?: boolean; onPress: () => void }) {
  const { theme } = useUnistyles();
  return (
    <TouchableBounce
      disabled={!enabled}
      sensory
      // @ts-expect-error
      style={
        process.env.EXPO_OS === 'web'
          ? {
              display: 'grid',
              marginRight: 8,
            }
          : {}
      }
      onPress={onPress}>
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            borderColor: theme.colors.border.light,
            // borderColor: AC.separator,
            borderWidth: 1,
            aspectRatio: 1,
            backgroundColor: theme.colors.bg.secondary,
            // backgroundColor: AC.label,
            borderRadius: 999,
          },
          !enabled && { opacity: 0.5 },
          // tw`transition-transform hover:scale-95`,
        ]}>
        <IconSymbol name="arrow.up" size={20} color="white" />
      </View>
    </TouchableBounce>
  );
}
