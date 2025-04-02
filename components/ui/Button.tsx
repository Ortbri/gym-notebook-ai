// components/ui/Button.tsx
// unistyles styled button

import { forwardRef } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const Button = forwardRef<typeof Pressable, ButtonProps>(
  ({ children, onPress, disabled, loading, style }, ref) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: withSpring(scale.value) }],
      };
    });

    const handlePress = () => {
      scale.value = withSpring(0.95);
      onPress();
    };

    return (
      <AnimatedPressable
        // ref={ref}
        style={[styles.button, animatedStyle, style]}
        onPress={handlePress}
        // onPressIn={handleRelease}
      >
        {children}
      </AnimatedPressable>
    );
  }
);

export default Button;

const styles = StyleSheet.create((theme) => ({
  button: {
    backgroundColor: theme.colors.accent.strong,
    borderRadius: 10,
    padding: 10,
  },
  // variants are possible now in unistyles v3
}));
