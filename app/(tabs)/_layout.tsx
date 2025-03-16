import useHaptics from '@/hooks/useHaptics';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Router, router } from 'expo-router';
import { Tabs } from 'expo-router';
import type React from 'react';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={22} style={{ marginBottom: -24 }} {...props} />;
}

export default function TabLayout() {
  const { lightHaptic } = useHaptics();
  const { colors } = useTheme();

  // const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // const handlePresentModalPress = useCallback(() => {
  //   bottomSheetModalRef.current?.present();
  // }, []);

  /* --------------------------------- return --------------------------------- */
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'trasnparent',
          borderColor: 'transparent',
        },
      }}
    >
      <Tabs.Screen
        name="(index)"
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon name={focused ? 'home' : 'home-outline'} color={colors.text} />;
          },
        }}
      />
      <Tabs.Screen
        name="log"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            lightHaptic();
            router.navigate('/(chat)/chat');
          },
        }}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon name={focused ? 'sparkles' : 'sparkles-outline'} color={colors.text} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon name={focused ? 'person' : 'person-outline'} color={colors.text} />;
          },
        }}
      />
    </Tabs>
  );
}
