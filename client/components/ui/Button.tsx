import * as Haptics from 'expo-haptics';
import React, { useMemo } from 'react';
import {
  Text,
  PressableProps,
  Platform,
  Pressable,
  View,
  GestureResponderEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  Easing,
  withTiming,
  withSequence,
  interpolateColor,
} from 'react-native-reanimated';
import { StyleSheet, UnistylesVariants, mq } from 'react-native-unistyles';

type ButtonShape = 'rounded' | 'circular' | 'pill' | 'square';

type ButtonVariants = UnistylesVariants<typeof styles> & {
  shape?: ButtonShape;
};

type ButtonProps = PressableProps &
  ButtonVariants & {
    title?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    isError?: boolean;
    isDisabled?: boolean;
  };

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button: React.FC<ButtonProps> = ({
  title,
  leftIcon,
  rightIcon,
  isError = false,
  isDisabled = false,
  size = 'md',
  variant = 'primary',
  shape = 'rounded',
  onPressIn: externalPressIn,
  onPressOut: externalPressOut,
  onPress: externalPress,
  style,
  ...props
}) => {
  // If isDisabled or isError, override the variant
  const effectiveVariant = isDisabled ? 'disabled' : isError ? 'error' : variant;

  styles.useVariants({ size, variant: effectiveVariant, shape });

  // Animation values
  const scale = useSharedValue(1);
  const pressed = useSharedValue(0); // 0 = not pressed, 1 = pressed

  // Animation styles for transform, opacity and border
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: 1 - pressed.value * 0.15, // Subtle opacity reduction on press
    };
  });

  // Border animation style - separate for more control

  const handlePressIn = React.useCallback(
    (e: GestureResponderEvent) => {
      // Only animate and provide haptic feedback if not disabled
      if (!isDisabled) {
        scale.value = withTiming(0.9888, { duration: 80, easing: Easing.inOut(Easing.quad) });
        pressed.value = withTiming(1, { duration: 100 });

        // if (Platform.OS === 'ios') {
        //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft).catch(() => {});
        // }
      }

      // Call external onPressIn if provided and not disabled
      if (externalPressIn && !isDisabled) {
        externalPressIn(e);
      }
    },
    [externalPressIn, isDisabled, effectiveVariant]
  );

  const handlePressOut = React.useCallback(
    (e: GestureResponderEvent) => {
      // Only animate if not disabled
      if (!isDisabled) {
        scale.value = withSequence(
          withTiming(1.001, { duration: 300, easing: Easing.out(Easing.quad) }),
          withTiming(1, { duration: 80, easing: Easing.inOut(Easing.quad) })
        );
        pressed.value = withTiming(0, { duration: 160 });
      }

      // Call external onPressOut if provided and not disabled
      if (externalPressOut && !isDisabled) {
        externalPressOut(e);
      }
    },
    [externalPressOut, isDisabled, effectiveVariant]
  );

  const handlePress = React.useCallback(
    (e: GestureResponderEvent) => {
      // Call external onPress if provided and not disabled
      if (externalPress && !isDisabled) {
        externalPress(e);
      }
    },
    [externalPress, isDisabled]
  );

  return (
    <AnimatedPressable
      style={[styles.container, animatedStyle, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      accessibilityState={{ disabled: isDisabled }}
      {...props}>
      <View style={styles.content}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        {title && <Text style={styles.text}>{title}</Text>}
        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    // Keep the stretch for mobile, remove the centering for web since Form will handle it
    variants: {
      size: {
        sm: {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
        },
        md: {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
        },
        lg: {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
        },
      },
      variant: {
        primary: {
          backgroundColor: theme.colors.accent.strong,
          borderColor: theme.colors.accent.strong,
          borderWidth: 1,
          _web: {
            ':hover': {
              // backgroundColor: theme.colors.accent.strong + 'CC', // 80% opacity
            },
            ':focus': {
              // outlineStyle: 'solid',
              // outlineWidth: 2,
              // outlineColor: theme.colors.accent.strong,
              // outlineOffset: 2,
            },
          },
        },
        secondary: {
          backgroundColor: theme.colors.bg.secondary,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border.regular,
        },
        outline: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.accent.strong,
        },
        ghost: {
          backgroundColor: 'transparent',
          borderWidth: 0,
        },
        disabled: {
          backgroundColor: theme.colors.disabled.bg,
          borderWidth: 1,
          borderColor: theme.colors.disabled.bg,
          opacity: 0.7,
        },
        error: {
          backgroundColor: theme.colors.error.main,
          borderWidth: 1,
          borderColor: theme.colors.error.main, // Same as background
        },
      },
      shape: {
        rounded: {
          borderRadius: theme.radius.xl,
        },
        circular: {
          borderRadius: 999,
          aspectRatio: 1,
          paddingHorizontal: 0,
        },
        pill: {
          borderRadius: 999,
        },
        square: {
          borderRadius: theme.radius.sm,
        },
      },
    },
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.gap(0.5),
  },
  text: {
    fontFamily: theme.fonts.SourGummyBold,
    fontSize: theme.fontSize.md,
    variants: {
      size: {
        sm: {
          fontSize: theme.fontSize.sm,
        },
        md: {
          fontSize: theme.fontSize.md,
        },
        lg: {
          fontSize: theme.fontSize.lg,
        },
      },
      variant: {
        primary: {
          color: theme.colors.text.inverse,
        },
        secondary: {
          color: theme.colors.text.primary,
        },
        outline: {
          color: theme.colors.accent.strong,
        },
        ghost: {
          color: theme.colors.accent.strong,
        },
        disabled: {
          color: theme.colors.disabled.fg,
        },
        error: {
          color: theme.colors.text.inverse,
        },
      },
    },
  },
  iconLeft: {
    marginRight: theme.spacing.xs,
  },
  iconRight: {
    marginLeft: theme.spacing.xs,
  },
}));
