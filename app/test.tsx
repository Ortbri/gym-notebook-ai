import React from 'react';
import { Text, View } from 'react-native';

export default function Test() {
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
}

// import Ionicons from '@expo/vector-icons/Ionicons';
// import React, { useState, useEffect, useRef } from 'react';
// import { LLAMA3_2_3B_QLORA, LLAMA3_2_3B_TOKENIZER, useLLM } from 'react-native-executorch';
// import {
//   Button,
//   H3,
//   Input,
//   Progress,
//   ScrollView,
//   Spinner,
//   Text,
//   Theme,
//   View,
//   XStack,
//   YStack,
// } from 'tamagui';

// type Message = {
//   id: string;
//   text: string;
//   sender: 'user' | 'ai';
//   timestamp: Date;
// };

// export default function ChatApp() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputText, setInputText] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [modelError, setModelError] = useState<string | null>(null);
//   const scrollViewRef = useRef<ScrollView>(null);

//   // Initialize LLM with executorch
//   const llm = useLLM({
//     modelSource: LLAMA3_2_3B_QLORA,
//     tokenizerSource: LLAMA3_2_3B_TOKENIZER,
//     systemPrompt: 'You are a helpful assistant who responds concisely and accurately.',
//     contextWindowLength: 2048,
//   });

//   // Initialize with welcome message when model is ready
//   useEffect(() => {
//     if (llm.isReady) {
//       setMessages([
//         {
//           id: '1',
//           text: 'Hello! I am powered by Llama 3. How can I help you today?',
//           sender: 'ai',
//           timestamp: new Date(),
//         },
//       ]);
//     }

//     if (llm.error) {
//       setModelError(llm.error);
//       console.error('LLM Error:', llm.error);
//     }
//   }, [llm.isReady, llm.error]);

//   // Scroll to bottom of chat when messages change
//   useEffect(() => {
//     if (messages.length > 0) {
//       setTimeout(() => {
//         scrollViewRef.current?.scrollToEnd({ animated: true });
//       }, 100);
//     }
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!inputText.trim()) return;

//     // Add user message
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: inputText,
//       sender: 'user',
//       timestamp: new Date(),
//     };

//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setInputText('');
//     setIsLoading(true);

//     try {
//       let response: string;

//       if (llm.isReady && !llm.error) {
//         // Use the LLM to generate a response
//         const result: string = await llm.generate(inputText);
//         response = result;
//       } else {
//         // Fallback if model isn't loaded
//         response = `I would respond to "${inputText}" but my model isn't fully loaded yet.`;
//       }

//       // Add AI response
//       const aiMessage: Message = {
//         id: Date.now().toString(),
//         text: response,
//         sender: 'ai',
//         timestamp: new Date(),
//       };

//       setMessages((prevMessages) => [...prevMessages, aiMessage]);
//     } catch (error) {
//       console.error('Error processing message:', error);

//       // Add error message
//       const errorMessage: Message = {
//         id: Date.now().toString(),
//         text: `Sorry, I encountered an error: ${error instanceof Error ? error.message : String(error)}`,
//         sender: 'ai',
//         timestamp: new Date(),
//       };

//       setMessages((prevMessages) => [...prevMessages, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderModelStatus = () => {
//     if (modelError) {
//       return (
//         <View backgroundColor="$red2" padding="$3" marginBottom="$3" borderRadius="$4">
//           <XStack space="$2" alignItems="center">
//             <Ionicons name="alert-circle" size={20} color="red" />
//             <Text color="$red10" fontSize="$2">
//               Model Error: {modelError}
//             </Text>
//           </XStack>
//         </View>
//       );
//     }

//     if (llm.downloadProgress < 100) {
//       return (
//         <View backgroundColor="$blue2" padding="$3" marginBottom="$3" borderRadius="$4">
//           <YStack space="$2">
//             <Text color="$blue10" fontSize="$2">
//               Downloading model...
//             </Text>
//             <Progress value={llm.downloadProgress} maxWidth="100%">
//               <Progress.Indicator animation="bouncy" backgroundColor="$blue10" />
//             </Progress>
//             <Text color="$blue10" fontSize="$1" opacity={0.8}>
//               {llm.downloadProgress.toFixed(1)}% complete
//             </Text>
//           </YStack>
//         </View>
//       );
//     }

//     if (!llm.isReady) {
//       return (
//         <View backgroundColor="$yellow2" padding="$3" marginBottom="$3" borderRadius="$4">
//           <XStack space="$2" alignItems="center">
//             <Spinner color="$yellow9" size="small" />
//             <Text color="$yellow10" fontSize="$2">
//               Initializing model...
//             </Text>
//           </XStack>
//         </View>
//       );
//     }

//     return null;
//   };

//   // Function to handle pressing Enter to send a message
//   const handleKeyPress = (e: any) => {
//     if (e.key === 'Enter' && !e.shiftKey && inputText.trim() && llm.isReady && !isLoading) {
//       handleSendMessage();
//     }
//   };

//   return (
//     <Theme name="light">
//       <View flex={1} padding="$4" backgroundColor="$background">
//         <H3 marginBottom="$4" textAlign="center">
//           Executorch Chat
//           {llm.isReady && <Text color="$green10"> (Ready)</Text>}
//           {!llm.isReady && !modelError && <Text color="$yellow10"> (Loading...)</Text>}
//           {modelError && <Text color="$red10"> (Error)</Text>}
//         </H3>

//         {renderModelStatus()}

//         <View
//           flex={1}
//           marginBottom="$4"
//           overflow="hidden"
//           borderRadius="$4"
//           borderWidth={1}
//           borderColor="$borderColor"
//           backgroundColor="$backgroundHover"
//         >
//           <ScrollView
//             ref={scrollViewRef}
//             padding="$3"
//             flexGrow={1}
//             contentContainerStyle={{ paddingBottom: 16 }}
//           >
//             <YStack space="$3">
//               {messages.map((message) => (
//                 <XStack
//                   key={message.id}
//                   justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
//                   width="100%"
//                 >
//                   <View
//                     backgroundColor={message.sender === 'user' ? '$blue9' : '$gray2'}
//                     paddingHorizontal="$3"
//                     // paddingVertical="$2"
//                     // borderRadius="$4"
//                     maxWidth="80%"
//                     elevation={1}
//                   >
//                     <Text color={message.sender === 'user' ? 'white' : '$gray12'} fontSize="$2">
//                       {message.text}
//                     </Text>
//                   </View>
//                 </XStack>
//               ))}
//               {isLoading && (
//                 <XStack justifyContent="flex-start" marginTop="$2">
//                   <View
//                     backgroundColor="$gray2"
//                     paddingHorizontal="$3"
//                     paddingVertical="$2"
//                     borderRadius="$4"
//                   >
//                     <Spinner size="small" color="$blue9" />
//                   </View>
//                 </XStack>
//               )}
//             </YStack>
//           </ScrollView>
//         </View>

//         <XStack space="$2" alignItems="center">
//           <Input
//             flex={1}
//             placeholder="Type a message..."
//             value={inputText}
//             onChangeText={setInputText}
//             onKeyPress={handleKeyPress}
//             autoCapitalize="none"
//             borderRadius="$4"
//             editable={llm.isReady && !isLoading}
//             backgroundColor="$backgroundHover"
//             borderColor="$borderColor"
//             padding="$3"
//           />
//           <Button
//             onPress={handleSendMessage}
//             disabled={isLoading || !inputText.trim() || !llm.isReady}
//             backgroundColor={isLoading || !inputText.trim() || !llm.isReady ? '$gray8' : '$blue9'}
//             borderRadius="$4"
//             padding="$3"
//             paddingHorizontal="$4"
//           >
//             <Ionicons name="send" size={18} color="white" />
//           </Button>
//         </XStack>
//       </View>
//     </Theme>
//   );
// }
