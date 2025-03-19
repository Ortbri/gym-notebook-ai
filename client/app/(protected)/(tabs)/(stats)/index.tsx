import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { Platform } from 'react-native';
import { Button, ScrollView, Text, XStack } from 'tamagui';

export default function Stats() {
  return (
    <ScrollView
      // theme={'accent'}
      // theme={'accent'}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        // bg: '$color1',
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
          STATS
        </Button>

        <Button
          animation={'100ms'}
          circular
          pressStyle={{
            scale: 0.98,
          }}
          icon={<Ionicons name="stats-chart" />}
        />
      </XStack>
    </ScrollView>
  );
}
