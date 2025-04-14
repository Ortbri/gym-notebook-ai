import React, { useState, useRef, forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  Pressable,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';
import { StyleSheet, UnistylesVariants, useUnistyles, mq } from 'react-native-unistyles';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedView = Animated.createAnimatedComponent(View);

type InputVariants = UnistylesVariants<typeof styles> & {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'underlined' | 'ghost';
};

type InputProps = TextInputProps &
  InputVariants & {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    isDisabled?: boolean;
  };

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      containerStyle,
      size = 'md',
      variant = 'outline',
      isDisabled = false,
      style,
      value,
      onFocus,
      onBlur,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const { theme } = useUnistyles();

    // Use the provided ref or our internal one
    const resolvedRef = (ref as React.RefObject<TextInput>) || inputRef;

    // Animation values
    const focused = useSharedValue(0); // 0 = not focused, 1 = focused
    const hasError = Boolean(error);

    // Determine effective variant based on disabled/error state
    const effectiveVariant = isDisabled ? 'disabled' : variant;

    styles.useVariants({ size, variant: effectiveVariant });

    // Border animation
    const animatedBorderStyle = useAnimatedStyle(() => {
      // Colors for different states
      let fromColor = '';
      let toColor = '';

      if (hasError) {
        fromColor = theme.colors.error.main;
        toColor = theme.colors.error.main;
      } else {
        switch (variant) {
          case 'outline':
            fromColor = theme.colors.border.regular;
            toColor = theme.colors.accent.strong;
            break;
          case 'filled':
            fromColor = theme.colors.bg.secondary;
            toColor = theme.colors.accent.strong;
            break;
          case 'underlined':
            fromColor = theme.colors.border.regular;
            toColor = theme.colors.accent.strong;
            break;
          case 'ghost':
            fromColor = 'transparent';
            toColor = theme.colors.accent.strong;
            break;
          default:
            fromColor = theme.colors.border.regular;
            toColor = theme.colors.accent.strong;
        }
      }

      // Compute the interpolated color
      const borderColor = interpolateColor(focused.value, [0, 1], [fromColor, toColor]);

      return {
        borderColor,
      };
    });

    // Background animation
    const animatedBackgroundStyle = useAnimatedStyle(() => {
      if (variant === 'filled') {
        // For filled variant, slightly lighten the background when focused
        const backgroundColor = isFocused
          ? theme.colors.bg.tertiary // Use tertiary background when focused
          : theme.colors.bg.secondary; // Use secondary background when not focused

        return { backgroundColor };
      }

      return {};
    });

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      focused.value = withTiming(1, { duration: 150, easing: Easing.inOut(Easing.quad) });

      if (onFocus) {
        onFocus(e);
      }
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      focused.value = withTiming(0, { duration: 150, easing: Easing.inOut(Easing.quad) });

      if (onBlur) {
        onBlur(e);
      }
    };

    const handleLabelPress = () => {
      if (!isDisabled && resolvedRef.current) {
        resolvedRef.current.focus();
      }
    };

    // Apply web-specific styles to prevent default browser styling
    const webInputStyle = Platform.OS === 'web' ? styles.webInput : {};

    // Determine placeholder text color
    const placeholderColor = hasError ? theme.colors.error.main : theme.colors.text.tertiary;

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Pressable onPress={handleLabelPress}>
            <Animated.Text
              style={[
                styles.label,
                hasError && styles.errorText,
                isFocused && {
                  color: hasError ? theme.colors.error.main : theme.colors.accent.strong,
                },
              ]}>
              {label}
            </Animated.Text>
          </Pressable>
        )}

        <AnimatedView style={[styles.inputContainer, animatedBorderStyle, animatedBackgroundStyle]}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

          <AnimatedTextInput
            ref={resolvedRef}
            style={[styles.input, webInputStyle, style]}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!isDisabled}
            selectionColor={hasError ? theme.colors.error.main : theme.colors.accent.strong}
            {...props}
          />

          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </AnimatedView>

        {(error || helperText) && (
          <Text style={[styles.helperText, error && styles.errorText]}>{error || helperText}</Text>
        )}
      </View>
    );
  }
);

// Password input component with toggle functionality
type PasswordInputProps = Omit<InputProps, 'secureTextEntry' | 'rightIcon'> & {
  iconColor?: string;
};

export const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  ({ iconColor, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { theme } = useUnistyles();

    // Use provided iconColor or default to theme secondary text color
    const effectiveIconColor = iconColor || theme.colors.text.secondary;

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    // Eye icon for password visibility toggle
    const renderEyeIcon = () => {
      return (
        <Pressable
          onPress={togglePasswordVisibility}
          style={styles.eyeIconContainer}
          accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
          accessibilityRole="button">
          {isPasswordVisible ? (
            // Eye open icon (SVG represented as text for simplicity)
            <Text style={[styles.eyeIcon, { color: effectiveIconColor }]}>👁️</Text>
          ) : (
            // Eye crossed icon
            <Text style={[styles.eyeIcon, { color: effectiveIconColor }]}>👁️‍🗨️</Text>
          )}
        </Pressable>
      );
    };

    return (
      <Input
        {...props}
        ref={ref}
        secureTextEntry={!isPasswordVisible}
        rightIcon={renderEyeIcon()}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        textContentType="password"
      />
    );
  }
);

const styles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing.sm,
    width: '100%',
  },
  label: {
    fontSize: theme.fontSize.sm,
    marginBottom: theme.spacing.xs,
    fontFamily: theme.fonts.SourGummyBold,
    color: theme.colors.text.secondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    variants: {
      size: {
        sm: {
          minHeight: 36,
        },
        md: {
          minHeight: 50,
        },
        lg: {
          minHeight: 52,
        },
      },
      variant: {
        outline: {
          borderColor: theme.colors.border.regular,
          backgroundColor: 'transparent',
        },
        filled: {
          borderColor: 'transparent',
          backgroundColor: theme.colors.bg.secondary,
        },
        underlined: {
          borderWidth: 0,
          borderBottomWidth: 1,
          borderRadius: 0,
          borderColor: theme.colors.border.regular,
          backgroundColor: 'transparent',
        },
        ghost: {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
        },
        disabled: {
          borderColor: theme.colors.disabled.bg,
          backgroundColor: theme.colors.disabled.bg,
          opacity: 0.7,
        },
      },
    },
  },
  input: {
    flex: 1,
    fontFamily: theme.fonts.SourGummyRegular,
    color: theme.colors.text.primary,
    paddingHorizontal: theme.spacing.sm,

    variants: {
      size: {
        sm: {
          fontSize: theme.fontSize.sm,
          paddingVertical: theme.spacing.xs,
        },
        md: {
          fontSize: theme.fontSize.md,
          paddingVertical: theme.spacing.sm,
        },
        lg: {
          fontSize: theme.fontSize.lg,
          paddingVertical: theme.spacing.md,
        },
      },
      variant: {
        outline: {},
        filled: {},
        underlined: {},
        ghost: {},
        disabled: {
          color: theme.colors.disabled.fg,
        },
      },
    },
  },
  // Web-specific styles to prevent default browser styling
  webInput: Platform.select({
    web: {
      outline: 'none', // Remove the default focus outline
      border: 'none', // Remove default border
      boxShadow: 'none', // Remove default box shadow
      WebkitAppearance: 'none', // Remove default styling in Safari
      MozAppearance: 'none', // Remove default styling in Firefox
      appearance: 'none', // Modern browsers
      background: 'transparent', // Ensure background is transparent
      caretColor: 'auto', // Keep the cursor visible
    },
    default: {},
  }),
  leftIcon: {
    marginLeft: theme.spacing.sm,
  },
  rightIcon: {
    marginRight: theme.spacing.sm,
  },
  eyeIconContainer: {
    padding: theme.spacing.xs,
  },
  eyeIcon: {
    fontSize: 20,
  },
  helperText: {
    marginTop: theme.spacing.xs,
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fonts.SourGummyRegular,
    color: theme.colors.text.secondary,
  },
  errorText: {
    color: theme.colors.error.main,
  },
}));
