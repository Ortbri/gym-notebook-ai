import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { OverlayProvider } from '~/providers/OverlayProvider';
import { RootScaleProvider, useRootScale } from '~/providers/RootScaleProvider';

function AnimatedStack() {
  const router = useRouter();
  const { scale } = useRootScale();
  // const { rt } = useUnistyles();
  // const { currentSong, isPlaying, togglePlayPause } = useAudio();

  const animatedStyle = useAnimatedStyle(() => {
    // 'worklet';
    return {
      borderTopLeftRadius: scale.value * 50,
      borderTopRightRadius: scale.value * 50,
      transform: [
        { scale: scale.value },
        {
          translateY: (1 - scale.value) * 100,
        },
      ],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      {/* <Animated.View style={[styles.stackContainer, animatedStyle]}> */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="chat/[id]"
          options={{
            presentation: 'transparentModal',
            headerShown: false,
            contentStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />
        <Stack.Screen
          name="test/route"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      {/* for now the callstack bottom tabs has a context for the bottom tab bar height */}
      {/* {currentSong && (
          <MiniPlayer
            song={currentSong}
            isPlaying={isPlaying}
            onPlayPause={togglePlayPause}
            onPress={() => router.push(`/music/${currentSong.id}`)}
          />
        )} */}
      {/* </Animated.View> */}

      {/* putting anything here is not scalled down upon modal open */}
    </View>
  );
}

export default function RootLayout() {
  return (
    <RootScaleProvider>
      {/* here put data for the  */}
      {/* <AudioProvider> */}
      <OverlayProvider>
        <AnimatedStack />
      </OverlayProvider>
      {/* </AudioProvider> */}
    </RootScaleProvider>
  );
}
const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  stackContainer: {
    flex: 1,
    overflow: 'hidden',
    borderTopLeftRadius: 50,
  },
}));
