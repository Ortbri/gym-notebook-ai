import useHaptics from '@/hooks/useHaptics';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { Tabs, router } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { Platform } from 'react-native';

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
  return <Ionicons size={22} style={iconStyle} {...props} />;
}

export default function TabLayout() {
  const { lightHaptic, warningHaptic } = useHaptics();
  const { colors } = useTheme();
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
        tabBarShowLabel: Platform.OS !== 'web', // Hide labels on web
        headerShown: false,
        // tabBarVariant: 'material',
        tabBarPosition: Platform.OS === 'web' ? 'left' : 'bottom',
        tabBarStyle: [
          {
            backgroundColor: colors.card,
            ...(Platform.OS === 'web'
              ? {
                  width: 60, // Set a smaller width for the sidebar
                  alignItems: 'center',
                }
              : {}),
          },
        ],
        tabBarItemStyle: Platform.select({
          web: {
            padding: 0,
            borderRadius: 0,
            marginVertical: 2,
            height: 40,
            minHeight: 40,
            width: '100%', // Make items fill the sidebar width
          },
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
        tabBarActiveTintColor: Platform.select({
          web: colors.text,
          default: colors.primary,
        }),
        tabBarInactiveTintColor: colors.text,
        tabBarActiveBackgroundColor: Platform.select({
          web: colors.card,
          default: undefined,
        }),
        tabBarIconStyle: Platform.select({
          web: { backdropFilter: 'blur(10px)' },
        }),
      }}
    >
      <Tabs.Screen
        name="log"
        listeners={
          Platform.OS === 'ios'
            ? {
                tabPress: (e) => {
                  e.preventDefault();
                  lightHaptic();
                  router.navigate('/(chat)/chat');
                },
              }
            : {
                tabPress: (e) => {
                  e.preventDefault();
                  router.navigate('/(chat)/chat');
                },
              }
        }
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'sparkles' : 'sparkles-outline'}
              iosSymbol={focused ? 'sparkles' : 'sparkles'}
              color={colors.text}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(index)"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              iosSymbol={focused ? 'house.fill' : 'house'}
              color={colors.text}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(community)"
        options={{
          title: 'Community',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'people' : 'people-outline'}
              iosSymbol={focused ? 'person.3.fill' : 'person.3'}
              color={colors.text}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(stats)"
        options={{
          title: 'Stats',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              iosSymbol={focused ? 'chart.bar.fill' : 'chart.bar'}
              color={colors.text}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              iosSymbol={focused ? 'person.fill' : 'person'}
              color={colors.text}
            />
          ),
        }}
      />
    </Tabs>
  );
}
