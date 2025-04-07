import { useAuth, useUser } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { Text, Pressable, Image } from 'react-native';
import Animated, {
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
  const { theme } = useUnistyles();
  const { rigidHaptic } = useHaptics();
  const scale = useSharedValue(1);
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        pressed.value,
        [0, 1],
        [theme.colors.error.bg, theme.colors.error.main]
      ),
      borderColor: interpolateColor(
        pressed.value,
        [0, 1],
        [theme.colors.error.bg, theme.colors.error.fg]
      ),
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
      {/* {user?.imageUrl && (
        <Image
          source={{ uri: user.imageUrl }}
          style={{ width: 32, height: 32, borderRadius: 16 }}
          onError={() => console.warn('Image failed to load')}
        />
      )} */}
      <Typography size="title">{user?.firstName}</Typography>

      {/* Test image from Picsum */}
      <Image
        source={{ uri: 'https://picsum.photos/200' }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
        onError={(e) => console.warn('Image error:', e.nativeEvent.error)}
      />

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
  },
  buttonText: {
    fontFamily: theme.fonts.SourGummyBold,
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
}));
