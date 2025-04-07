import { useAuth, useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Text, Pressable } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { BodyScrollView } from '~/components/BodyScroll';
import { Typography } from '~/components/Typography';
import { useHaptics } from '~/utils/haptic';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({ children, onPress }: { children: React.ReactNode; onPress: () => void }) => {
  const { rigidHaptic } = useHaptics();
  const scale = useSharedValue(1);
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: interpolate(pressed.value, [0, 1], [1, 0.7]),
      // backgroundColor: interpolateColor(
      //   pressed.value,
      //   [0, 1],
      //   [theme.colors.error.bg, theme.colors.error.main]
      // ),
      // borderColor: interpolateColor(
      //   pressed.value,
      //   [0, 1],
      //   [theme.colors.error.bg, theme.colors.error.fg]
      // ),
    };
  });

  const handlePressIn = () => {
    rigidHaptic();
    scale.value = withSpring(0.98, { damping: 15, mass: 0.8, stiffness: 400 });
    pressed.value = withSpring(1, { damping: 15, mass: 0.8, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, mass: 0.8, stiffness: 400 });
    pressed.value = withSpring(0, { damping: 15, mass: 0.8, stiffness: 400 });
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[stylesheet.button, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Text style={stylesheet.buttonText}>{children}</Text>
    </AnimatedPressable>
  );
};

export default function Menu() {
  const { signOut } = useAuth();
  const { user } = useUser();
  // const [imageError, setImageError] = useState(false);

  return (
    <BodyScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Typography size="title">Menu</Typography>
      <Typography size="title">{user?.firstName}</Typography>
      <Button onPress={signOut}>Sign Out</Button>
    </BodyScrollView>
  );
}

const stylesheet = StyleSheet.create((theme) => ({
  button: {
    backgroundColor: theme.colors.error.bg,
    paddingVertical: 18,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: theme.colors.error.bg,
  },
  buttonText: {
    fontFamily: theme.fonts.SourGummyBold,
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
}));
