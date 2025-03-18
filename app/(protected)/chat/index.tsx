import React from 'react';
import { Text, View } from 'tamagui';

export default function Chat() {
  return (
    <View>
      <Text>Chat</Text>
    </View>
  );
}

// import { sendMessage } from '@/actions/ai-processor';
// import ChatInput from '@/components/chat/ChatInput';
// import { Ionicons } from '@expo/vector-icons';
// import { useHeaderHeight } from '@react-navigation/elements';
// import { useTheme } from '@react-navigation/native';
// import { BlurView } from 'expo-blur';
// import { Stack, router } from 'expo-router';
// import { SFSymbol, SymbolView } from 'expo-symbols';
// import type React from 'react';
// import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { Animated, Keyboard, Platform, PlatformColor, useColorScheme } from 'react-native';
// import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Stack as TamaguiStack, Text, View, XStack, YStack, styled } from 'tamagui';

// interface ChatMessage {
//   id: number;
//   prompt: string;
//   response: React.ReactNode;
// }

// // Define styled components for consistent use
// const UserBubble = styled(XStack, {
//   maxW: '80%',
//   self: 'flex-end',
//   px: 14,
//   py: 10,
//   rounded: 24,
//   items: 'flex-end',
//   justify: 'flex-end',
//   bg: '$color',
// });

// export default function Chat() {
//   /* ---------------------------------- hooks --------------------------------- */
//   const headerHeight = useHeaderHeight();
//   const insets = useSafeAreaInsets();
//   const { colors } = useTheme();
//   const colorScheme = useColorScheme();

//   /* ---------------------------------- state --------------------------------- */
//   const [prompt, setPrompt] = useState('');
//   const [messages, setMessages] = useState<ChatMessage[]>(exampleMsg);
//   const [msgState, setMsgState] = useState({
//     isGenerating: false,
//     isLoading: false,
//     isError: false,
//     canSubmit: true,
//   });

//   /* ----------------------------------- ref ---------------------------------- */
//   const flatListRef = useRef<Animated.FlatList>(null);
//   /* ---------------------------- function for now ---------------------------- */
//   const handleSubmit = async () => {
//     if (!prompt.trim()) return;

//     const currentId = Date.now();
//     const streamingResponse = await sendMessage(prompt);

//     setMessages((prev) => [
//       ...prev,
//       {
//         id: currentId,
//         prompt,
//         response: streamingResponse,
//       },
//     ]);

//     setPrompt('');
//   };

//   /* ---------------------------- message renderer ---------------------------- */
//   const renderMessage = ({ item }: { item: ChatMessage }) => {
//     return (
//       <YStack key={item.id} px={10} gap={14}>
//         {/* User prompt bubble */}
//         <YStack>
//           <UserBubble>
//             <Text fontWeight="500" color={'$color1'}>
//               {item.prompt}
//             </Text>
//           </UserBubble>
//         </YStack>

//         {/* AI response */}
//         <Suspense fallback={<Text>Generating...</Text>}>
//           <XStack flex={1} gap={8} maxW="95%">
//             {/* AI avatar */}
//             <YStack justify="center" items="center" rounded={30} self="flex-start">
//               {Platform.OS === 'ios' ? (
//                 <SymbolView
//                   name="apple.intelligence"
//                   tintColor={colorScheme === 'dark' ? 'white' : 'black'}
//                   style={{
//                     width: 30,
//                     height: 30,
//                   }}
//                   type="palette"
//                 />
//               ) : null}
//             </YStack>

//             {/* AI response text */}
//             <YStack flex={1}>
//               <Text flex={1} fontSize={15} lh={22} color={colors.text}>
//                 {item.response}
//               </Text>
//             </YStack>
//           </XStack>
//         </Suspense>
//       </YStack>
//     );
//   };

//   useEffect(() => {
//     console.log('keyboard is visible:', Keyboard.isVisible());
//   }, []);

//   /* --------------------------------- return --------------------------------- */
//   return (
//     <View>
//       <Animated.FlatList
//         ref={flatListRef}
//         data={messages}
//         inverted
//         renderItem={renderMessage}
//         contentContainerStyle={{
//           gap: 24,
//           paddingBottom: 14,
//           paddingTop: insets.bottom + 46 + 8 + 10, // Keep this non-shorthand since it's in a style object
//         }}
//       />
//       <ChatInput value={prompt} setValue={setPrompt} onSubmit={handleSubmit} />
//     </View>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                                example data                                */
// /* -------------------------------------------------------------------------- */
// const exampleMsg = [
//   {
//     id: 1,
//     prompt: 'What is the weather in Tokyo?',
//     response: 'The weather in Tokyo is sunny and warm.',
//   },
//   {
//     id: 2,
//     prompt: 'Can you help me write a React component?',
//     response:
//       'I can help you create a React component. What functionality would you like it to have?',
//   },
//   {
//     id: 3,
//     prompt: 'What are some good books to learn JavaScript?',
//     response:
//       'Some popular books for learning JavaScript include "Eloquent JavaScript" by Marijn Haverbeke, "You Don\'t Know JS" series by Kyle Simpson, and "JavaScript: The Good Parts" by Douglas Crockford.',
//   },
//   {
//     id: 4,
//     prompt: 'How do I handle state in React Native?',
//     response:
//       'In React Native, you can manage state using useState hook for local component state, or use state management libraries like Redux or Context API for global state management.',
//   },
//   {
//     id: 5,
//     prompt: "What's the difference between flex and grid layouts?",
//     response:
//       'Flexbox is designed for one-dimensional layouts (either rows OR columns), while Grid is designed for two-dimensional layouts (rows AND columns). Flex is great for distributing space along a single axis, while Grid excels at creating complex grid-based layouts.',
//   },
//   {
//     id: 6,
//     prompt: 'How can I optimize my React Native app performance?',
//     response:
//       'To optimize React Native performance, you can use techniques like implementing proper memo and useCallback hooks, avoiding unnecessary re-renders, using FlatList for long lists, and optimizing images and animations.',
//   },
//   {
//     id: 7,
//     prompt: 'What are the best practices for error handling in JavaScript?',
//     response:
//       'Best practices include using try-catch blocks, implementing proper error boundaries, creating custom error classes, handling async errors with .catch(), and providing meaningful error messages to users.',
//   },
//   {
//     id: 8,
//     prompt: 'How do I implement dark mode in my app?',
//     response:
//       'You can implement dark mode by creating a theme context, using CSS variables or styled-components, storing user preferences, and responding to system theme changes using useColorScheme hook.',
//   },
//   {
//     id: 9,
//     prompt: "What's the difference between useMemo and useCallback?",
//     response:
//       'useMemo memoizes computed values while useCallback memoizes functions. useMemo prevents expensive calculations from running on every render, while useCallback prevents unnecessary re-renders of child components that depend on callback functions.',
//   },
//   {
//     id: 10,
//     prompt: 'How can I handle authentication in my app?',
//     response:
//       'You can implement authentication using JWT tokens, OAuth, or third-party services like Firebase Auth. Store tokens securely, implement protected routes, and handle token refresh logic.',
//   },
//   {
//     id: 11,
//     prompt: 'What are the best practices for API calls in React Native?',
//     response:
//       'Use axios or fetch with proper error handling, implement request interceptors, cache responses when appropriate, show loading states, and handle offline scenarios gracefully.',
//   },
//   {
//     id: 12,
//     prompt: 'How do I implement push notifications?',
//     response:
//       'You can use libraries like Firebase Cloud Messaging or OneSignal, request user permissions, handle both foreground and background notifications, and implement proper notification channels for Android.',
//   },
// ];
