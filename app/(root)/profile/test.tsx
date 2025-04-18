import Superwall from '@superwall/react-native-superwall';
import React from 'react';
import { FlatList, ScrollView } from 'react-native';

import { Button } from '~/components/ui/Button';
import { Text } from '~/components/ui/Text';
import { useWorkoutPage } from '~/stores/WorkoutStore';

export default function Test() {
  const workouts = useWorkoutPage(38 * 80);

  return (
    <>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text className="py-1 border-b border-muted-foreground">
            {item.id} {item.name ?? 'Unnamed'} — {item.arm_mode}
          </Text>
        )}
      />
    </>
  );
}
