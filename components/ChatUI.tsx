'use client';

import * as AC from '@bacons/apple-colors';
import { useActions, useAIState, useUIState } from 'ai/rsc';
import { Stack } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconSymbol } from './IconSymbol';
import { AI } from './ai-context';
import { AnimatedLogo } from './animated-logo';
import { ChatToolbarInner } from './chat-toolbar';
import { KeyboardFriendlyScrollView } from './keyboard-friendly-scrollview';
// import { HeaderButton } from './ui/Header';

// import { nanoid } from '~/util/nanoid';
// import { tw } from '~/util/tw';

const HEADER_HEIGHT = 0;

function MessagesScrollView() {
  const [messages] = useUIState<typeof AI>();

  const { top } = useSafeAreaInsets();

  const textInputHeight = 8 + 36;

  return (
    <>
      <KeyboardFriendlyScrollView
        style={[{ flex: 1 }, tw`md:w-[768px] max-w-[768px] md:mx-auto`]}
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: top + HEADER_HEIGHT + 24,
          paddingBottom: textInputHeight,
          gap: 16,
          flex: messages.length ? undefined : 1,
        }}>
        {
          // View messages in UI state
          messages.map((message) => (
            <View key={message.id}>{message.display}</View>
          ))
        }
      </KeyboardFriendlyScrollView>
      {messages.length === 0 && <AnimatedLogo />}
    </>
  );
}

export function ChatUI() {
  const [, setAIState] = useAIState<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <>
              {!!messages.length && (
                // <HeaderButton
                //   pressOpacity={0.7}
                //   style={[
                //     process.env.EXPO_OS === 'web'
                //       ? {
                //           paddingHorizontal: 16,
                //           alignItems: 'center',
                //           display: 'flex',
                //         }
                //       : {
                //           // Offset on the side so the margins line up. Unclear how to handle when this is used in headerLeft.
                //           // We should automatically detect it somehow.
                //           marginRight: -8,
                //         },
                //   ]}
                //   onPress={() => {
                //     setAIState({ chatId: nanoid(), messages: [] });
                //     setMessages([]);
                //   }}>
                //   <IconSymbol name="square.and.pencil" color={AC.label} />
                // </HeaderButton>
                <TouchableOpacity>
                  <IconSymbol name="square.and.pencil" color={AC.label} />
                </TouchableOpacity>
              )}
            </>
          ),
        }}
      />

      <MessagesScrollView />

      <ChatToolbar />
    </View>
  );
}

function ChatToolbar() {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { onSubmit } = useActions<typeof AI>();

  return <ChatToolbarInner messages={messages} setMessages={setMessages} onSubmit={onSubmit} />;
}

// import { StyleProp, View, ViewStyle } from "react-native";
// Media queries for web layout.

// export function ChatContainer({
//   children,
//   style,
// }: {
//   children: React.ReactNode;
//   style?: StyleProp<ViewStyle>;
// }) {
//   return (
//     <View
//       style={[
//         {
//           flex: 1,
//           alignItems: "stretch",
//         },
//         // @ts-expect-error
//         process.env.EXPO_OS === "web" && { maxHeight: "100vh" },
//       ]}
//     >
//       <View style={[{ flex: 1, flexGrow: 1 }, style]}>{children}</View>
//     </View>
//   );
// }
