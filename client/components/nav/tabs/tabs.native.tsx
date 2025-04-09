import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import Tabs from '~/components/nav/Tabs';

const TabsLayout = () => {
  const router = useRouter();
  const { user } = useUser();
  const { theme, rt } = useUnistyles();

  // Only render the avatar when we're sure the user is loaded and available
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => router.navigate('/(app)/(root)/(tabs)/statistics/settings/menu')}
        style={{
          height: 35,
          width: 35,
          position: 'absolute',
          right: 16,
          borderRadius: theme.borderRadius(4),
          overflow: 'hidden',
          top: rt.insets.top - 4,
          backgroundColor: theme.colors.bg.tertiary,
          zIndex: 1,
        }}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </Pressable>
      <Tabs
        hapticFeedbackEnabled
        // @ts-ignore -- this is a hidden prop
        fontFamily="SourGummy"
        screenOptions={{
          tabBarActiveTintColor: theme.colors.text.primary,
        }}
        scrollEdgeAppearance="transparent">
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Today',
            tabBarIcon: ({ focused }: { focused: boolean }) => ({
              sfSymbol: focused ? 'flame.fill' : 'flame',
            }),
          }}
        />

        <Tabs.Screen
          name="statistics"
          options={{
            title: 'Statistics',
            tabBarIcon: ({ focused }: { focused: boolean }) => ({
              sfSymbol: focused ? 'chart.line.text.clipboard.fill' : 'chart.line.text.clipboard',
            }),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;
