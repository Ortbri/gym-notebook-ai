import { useTheme } from '@react-navigation/native';
import type React from 'react';
import { useEffect } from 'react';
import { Dimensions, Keyboard, Platform, StyleSheet, TextInput, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  type WithTimingConfig,
  Easing,
} from 'react-native-reanimated';

const TIMING_CONFIG: WithTimingConfig = {
  duration: 370,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

interface ChatInputProps {
  value: string;
  setValue: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  setValue,
  onSubmit,
  placeholder = 'Type a message...',
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  // Shared values for animations
  const translateY = useSharedValue(0);
  const inputHeight = useSharedValue(100); // Default height
  const isKeyboardVisible = useSharedValue(false);

  // Handle keyboard events
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event) => {
        isKeyboardVisible.value = true;
        translateY.value = withTiming(-event.endCoordinates.height, TIMING_CONFIG);
      },
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        isKeyboardVisible.value = false;
        translateY.value = withTiming(0, {
          duration: 100,
        });
      },
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  // Animated styles
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      // height: inputHeight.value,
    };
  });

  // Handle input height changes
  // const handleContentSizeChange = (event) => {
  //   const { height } = event.nativeEvent.contentSize;
  //   const newHeight = Math.min(Math.max(56, height), maxHeight);
  //   inputHeight.value = withTiming(newHeight, TIMING_CONFIG);
  // };

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          multiline
          // maxHeight={maxHeight}
          // onContentSizeChange={handleContentSizeChange}
          onSubmitEditing={() => {
            if (onSubmit) {
              onSubmit();
            }
            Keyboard.dismiss();
          }}
          blurOnSubmit={false}
        />
      </View>
    </Animated.View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      // backgroundColor: '#fff',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#ccc',
      // paddingHorizontal: 16,
      // paddingTop: 8,
      // paddingBottom: 30,
      // marginBottom: 40,
    },
    inputContainer: {
      // backgroundColor: 'red',
      flex: 1,
      // minHeight: 46,
    },
    input: {
      flex: 1,
      alignItems: 'center',
      // backgroundColor: 'blue',

      // fontSize: 16,
      // maxHeight: 120,
      // paddingTop: 8,
      // paddingBottom: 8,
      // paddingHorizontal: 12,
      // backgroundColor: '#f0f0f0',
      // borderRadius: 20,
    },
  });

export default ChatInput;
