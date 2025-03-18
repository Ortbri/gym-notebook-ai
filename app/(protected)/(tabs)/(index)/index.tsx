import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Button, ScrollView, Text, XStack } from 'tamagui';

export default function Home() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        bg: '$color1',
        gap: 4,
        px: 14,
        pt: 14,
        ...(Platform.OS === 'web'
          ? { rounded: '$8', borderWidth: 1, borderColor: '$color4', mb: 14, mr: 10 }
          : {}),
        grow: 1,
      }}
    >
      <XStack gap={10}>
        <Button
          flex={1}
          animation={'100ms'}
          rounded={24}
          pressStyle={{
            scale: 0.98,
          }}
        >
          HOME
        </Button>

        <Button
          animation={'100ms'}
          circular
          pressStyle={{
            scale: 0.98,
          }}
          icon={<Ionicons name="home" />}
        />
      </XStack>
    </ScrollView>
  );
}

// import WorkoutPostItem from '@/components/custom/WorkoutPostitem';
// import { FlatList } from 'react-native';

// /* -------------------------------------------------------------------------- */
// /*                                    HOME                                    */
// /* -------------------------------------------------------------------------- */
// export default function Home() {
//   return (
//     <FlatList
//       data={Array.from({ length: 10 })}
//       contentInsetAdjustmentBehavior="automatic"
//       contentContainerStyle={{
//         gap: 14,
//         paddingHorizontal: 10,
//         paddingTop: 14,
//         paddingBottom: 14,
//       }}
//       renderItem={({ index }) => <WorkoutPostItem key={index.toString()} />}
//     />
//   );
// }
