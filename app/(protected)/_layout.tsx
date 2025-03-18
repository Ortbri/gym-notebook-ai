import { Stack } from 'expo-router';
import React from 'react';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: '(tabs)/(index)',
};

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="chat/index" options={{ headerShown: true }} />
    </Stack>
  );
}

// import useHaptics from '@/hooks/useHaptics';
// import { Stack, router } from 'expo-router';
// import React from 'react';
// import { Pressable, useColorScheme } from 'react-native';

// export default function HomeLayout() {
//   const colorScheme = useColorScheme();
//   const { lightHaptic } = useHaptics();
//   /* ---------------------------------- back ---------------------------------- */

//   /* --------------------------------- return --------------------------------- */
//   return (
//     <Stack>
//       <Stack.Screen
//         name="chat"
//         options={{
//           title: '',
//           headerTransparent: true,
//           headerTitle: () => (
//             <Pressable
//               onPressIn={lightHaptic}
//               onPress={() => router.back()}
//               style={{
//                 width: 36,
//                 height: 5,
//                 backgroundColor:
//                   colorScheme === 'dark' ? 'rgba(255,255,255, .3)' : 'rgba(0,0,0,0.3)',
//                 borderRadius: 2.5,
//               }}
//             />
//           ),
//           // headerBackground: () => (
//           //   <BlurView
//           //     intensity={colorScheme === 'dark' ? 30 : 100}
//           //     tint={colorScheme === 'dark' ? 'promient' : 'light'}
//           //     style={{
//           //       flex: 1,
//           //       borderBottomWidth: StyleSheet.hairlineWidth,
//           //       borderBottomColor: colors.border,
//           //       backgroundColor:
//           //         colorScheme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.7)',
//           //     }}
//           //   />
//           // ),
//           contentStyle: {
//             backgroundColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
//           },
//         }}
//       />
//     </Stack>
//   );
// }
