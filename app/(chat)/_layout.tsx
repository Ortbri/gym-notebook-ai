import useHaptics from '@/hooks/useHaptics';
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

import { Stack, router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View, useColorScheme } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function HomeLayout() {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();
  const { lightHaptic } = useHaptics();
  /* ---------------------------------- back ---------------------------------- */

  /* --------------------------------- return --------------------------------- */
  return (
    <Stack>
      <Stack.Screen
        name="chat"
        options={{
          title: '',
          headerTransparent: true,
          headerTitle: () => (
            <Pressable
              onPressIn={lightHaptic}
              onPress={() => router.back()}
              style={{
                width: 36,
                height: 5,
                backgroundColor:
                  colorScheme === 'dark' ? 'rgba(255,255,255, .3)' : 'rgba(0,0,0,0.3)',
                borderRadius: 2.5,
                // marginTop: 8,
              }}
            />
          ),
          // headerBackground: () => (
          //   <BlurView
          //     intensity={colorScheme === 'dark' ? 30 : 100}
          //     tint={colorScheme === 'dark' ? 'promient' : 'light'}
          //     style={{
          //       flex: 1,
          //       borderBottomWidth: StyleSheet.hairlineWidth,
          //       borderBottomColor: colors.border,
          //       backgroundColor:
          //         colorScheme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.7)',
          //     }}
          //   />
          // ),
          contentStyle: {
            backgroundColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
          },
        }}
      />
    </Stack>
  );
}
