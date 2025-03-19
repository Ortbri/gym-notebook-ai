import useHaptics from '@/hooks/useHaptics';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

import { Tabs, router } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { Platform, useColorScheme } from 'react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  iosSymbol?: SymbolViewProps['name'];
}) {
  const iconStyle = Platform.select({
    web: { width: 22, height: 22 },
    default: { marginBottom: -24 },
  });

  if (Platform.OS === 'ios' && props.iosSymbol) {
    return (
      <SymbolView name={props.iosSymbol} size={30} tintColor={props.color} style={iconStyle} />
    );
  }
  return <Ionicons size={20} style={iconStyle} {...props} />;
}

/* -------------------------------------------------------------------------- */
/*                                   layout                                   */
/* -------------------------------------------------------------------------- */

export default function TabLayout() {
  const { lightHaptic, warningHaptic } = useHaptics();
  const { colors } = useTheme();

  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenListeners={
        Platform.OS === 'ios'
          ? {
              tabPress: lightHaptic,
              tabLongPress: warningHaptic,
            }
          : undefined
      }
      screenOptions={{
        tabBarShowLabel: Platform.OS === 'web', // Hide labels on web
        headerShown: false,
        tabBarPosition: Platform.OS === 'web' ? 'left' : 'bottom',
        tabBarStyle: [
          {
            backgroundColor: colors.background,
            ...(Platform.OS === 'web'
              ? {
                  width: 48,
                  minWidth: 60,
                  alignItems: 'center',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  borderColor: 'transparent',
                  // borderWidth: 0,
                }
              : {}),
          },
        ],

        tabBarItemStyle: Platform.select({
          web: {},
          ios: { padding: 0, borderRadius: 0, marginVertical: 0 },
          android: { padding: 0, borderRadius: 0, marginVertical: 0 },
        }),

        tabBarLabelStyle: Platform.select({
          web: {
            fontSize: 10,
            fontWeight: '500',
            display: 'none', // Hide labels on web to save space
          },
          ios: { fontSize: 12, fontWeight: '500' },
          android: { fontSize: 12, fontWeight: '500' },
        }),
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#2A2A2A' : '#D0D0D0', // Adjusted colors for better contrast
        tabBarActiveTintColor: colorScheme === 'dark' ? '#f2f2f2' : '#050505', // Darker gray for inactive state, almost not seen
        tabBarActiveBackgroundColor: Platform.select({
          web: colors.border,
          ios: undefined, // Added colors for light and dark themes
        }),
        tabBarIconStyle: Platform.select({
          web: {},
        }),
        animation: 'fade',
        transitionSpec: {
          animation: 'timing',
          config: {
            duration: 70,
          },
        },

        // tabBarVisibilityAnimationConfig: {
        //   show: {
        //     animation: 'spring',
        //     config: {
        //       stiffness: 2000,
        //       damping: 100,
        //       mass: 0.5,
        //       overshootClamping: true,
        //       restDisplacementThreshold: 0.001,
        //       restSpeedThreshold: 0.001,

        //     },
        //   },
        //   hide: {
        //     animation: 'spring',
        //     config: {
        //       stiffness: 2000,
        //       damping: 100,
        //       mass: 0.5,
        //       overshootClamping: true,
        //       restDisplacementThreshold: 0.001,
        //       restSpeedThreshold: 0.001,
        //     },
        //   },
        // },
      }}
    >
      <Tabs.Screen
        name="(index)"
        options={{
          title: 'Home',

          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? 'flame' : 'flame-outline'}
              iosSymbol={focused ? 'flame.fill' : 'flame'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(ai)"
        options={{
          title: 'AI',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? 'sparkles' : 'sparkles-outline'}
              iosSymbol={focused ? 'bubbles.and.sparkles.fill' : 'bubbles.and.sparkles'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(stats)"
        options={{
          title: 'Stats',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              iosSymbol={focused ? 'chart.line.text.clipboard.fill' : 'chart.line.text.clipboard'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
