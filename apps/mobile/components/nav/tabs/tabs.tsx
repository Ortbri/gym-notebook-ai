import { useUser } from '@clerk/clerk-expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View, Image } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

const TabsLayout = () => {
  const router = useRouter();
  const { user } = useUser();
  const { theme, rt } = useUnistyles();

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => router.navigate('/(app)/(root)/profile/main')}
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
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.text.primary,
          tabBarStyle: {
            backgroundColor: theme.colors.bg.primary,
            borderColor: 'transparent',
          },
          headerStyle: {
            backgroundColor: theme.colors.bg.primary,
          },
          headerTitleStyle: {
            color: theme.colors.text.primary,
          },
        }}>
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Today',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <FontAwesome name={focused ? 'fire' : 'fire'} size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="statistics"
          options={{
            title: 'Statistics',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <FontAwesome name={focused ? 'bar-chart' : 'bar-chart'} size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;
