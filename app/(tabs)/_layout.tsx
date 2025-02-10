import { Tabs } from '@/components/navigation/BottomTabs';
import useHaptics from '@/hooks/useHaptics';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
// import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
// import { Tabs } from 'expo-router';
import type React from 'react';
import { useColorScheme } from 'react-native';
// import { useColorScheme } from 'react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof Ionicons>['name'];
//   color: string;
// }) {
//   return <Ionicons size={22} style={{ marginBottom: -24 }} {...props} />;
// }

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // const { lightHaptic } = useHaptics();
  // const { colors } = useTheme();
  // const colorScheme = useColorScheme();

  // const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // const handlePresentModalPress = useCallback(() => {
  //   bottomSheetModalRef.current?.present();
  // }, []);

  /* --------------------------------- return --------------------------------- */
  return (
    <Tabs
      translucent
      sidebarAdaptable
      hapticFeedbackEnabled
      scrollEdgeAppearance="transparent"
      initialRouteName="(index)"
      tabBarActiveTintColor={colorScheme === "dark"  ? "white" : "black"}
      // screenOptions={{
      //   tabBarShowLabel: false,
      //   headerShown: false,
      //   tabBarStyle: {
      //     position: 'absolute',
      //     backgroundColor: 'trasnparent',
      //     borderColor: 'transparent',
      //   },

      //   tabBarBackground: () => (
      //     <BlurView
      //       intensity={24}
      //       tint="prominent"
      //       style={{
      //         flex: 1,
      //         backgroundColor:
      //           colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.5)',
      //       }}
      //     />
      //   ),
      // }}
    >
      <Tabs.Screen
        name="(index)"
        options={{
          title: 'Feed',

          tabBarIcon: () => ({ sfSymbol: 'aqi.low' }),
          // tabBarActiveTintColor: 'white',
        }}

        // options={{
        //   tabBarIcon: ({ focused }) => {
        //     return <TabBarIcon name={focused ? 'home' : 'home-outline'} color={colors.text} />;
        //   },
        // }}
      />
      <Tabs.Screen
        name="(tracking)"
        options={{
          title: 'Tracking',

          tabBarIcon: () => ({ sfSymbol: 'chart.dots.scatter' }),
          // tabBarActiveTintColor: 'white',
        }}

        // options={{
        //   tabBarIcon: ({ focused }) => {
        //     return <TabBarIcon name={focused ? 'home' : 'home-outline'} color={colors.text} />;
        //   },
        // }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'Profile',

          tabBarIcon: () => ({ sfSymbol: 'brain.filled.head.profile' }),
          // color,
          // tabBarActiveTintColor: 'white',

          // tabBarBadge: true,
          // tabBarItemHidden: f

          // tabBarIcon: ({ focused }) => {
          //   return <TabBarIcon name={focused ? 'person' : 'person-outline'} color={colors.text} />;
          // },
        }}
      />
    </Tabs>
  );
}
