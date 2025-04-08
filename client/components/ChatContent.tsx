import { SymbolView } from 'expo-symbols';
import { useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';

interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

const mockChats: ChatMessage[] = [
  {
    id: '1',
    text: 'Hi! I can help you plan your workout. What would you like to focus on today?',
    timestamp: new Date(),
    isUser: false,
  },
  {
    id: '2',
    text: 'I want to work on my chest and triceps',
    timestamp: new Date(),
    isUser: true,
  },
  {
    id: '3',
    text: "Great choice! Here's a suggested workout for chest and triceps:\n\n1. Bench Press: 3 sets of 8-10 reps\n2. Incline Dumbbell Press: 3 sets of 10-12 reps\n3. Tricep Dips: 3 sets of 12-15 reps\n4. Cable Fly: 3 sets of 12-15 reps\n5. Tricep Pushdown: 3 sets of 12-15 reps",
    timestamp: new Date(),
    isUser: false,
  },
];

export function ChatContent() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChats);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<Animated.FlatList<ChatMessage>>(null);

  const handleSendMessage = useCallback(() => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputText.trim(),
        timestamp: new Date(),
        isUser: true,
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputText('');

      // Simulate AI response after a short delay
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: 'I understand. Let me help you track that in your workout log.',
          timestamp: new Date(),
          isUser: false,
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  }, [inputText]);

  const renderItem = useCallback(
    ({ item }: { item: ChatMessage }) => (
      <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.aiMessage]}>
        <Text
          style={[styles.messageText, item.isUser ? styles.userMessageText : styles.aiMessageText]}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    ),
    []
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <Animated.FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        inverted
        bounces={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}>
          <SymbolView
            name="arrow.up.circle.fill"
            size={32}
            tintColor={inputText.trim() ? '#007AFF' : 'gray'}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  flatListContent: {
    padding: 16,
    paddingBottom: 80,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    color: 'white',
    maxHeight: 100,
  },
  sendButton: {
    padding: 4,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#333333',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: 'white',
  },
  aiMessageText: {
    color: 'white',
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});
