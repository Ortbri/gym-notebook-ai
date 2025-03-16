import useHaptics from '@/hooks/useHaptics';
import { Ionicons } from '@expo/vector-icons';
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
  if (Platform.OS === 'ios' && props.iosSymbol) {
    return (
      <SymbolView
        name={props.iosSymbol}
        size={30}
        tintColor={props.color}
        style={{ marginBottom: -24 }}
      />
    );
  }
  return <Ionicons size={22} style={{ marginBottom: -24 }} {...props} />;
}

export default function TabLayout() {
  const { lightHaptic } = useHaptics();
  const { colors } = useTheme();

  /* --------------------------------- return --------------------------------- */
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="(index)"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon
                name={focused ? 'home' : 'home-outline'}
                iosSymbol={focused ? 'house.fill' : 'house'}
                color={colors.text}
              />
            );
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
              <TabBarIcon
                name={focused ? 'sparkles' : 'sparkles-outline'}
                iosSymbol={focused ? 'sparkles' : 'sparkles'}
                color={colors.text}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon
                name={focused ? 'person' : 'person-outline'}
                iosSymbol={focused ? 'person.fill' : 'person'}
                color={colors.text}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
