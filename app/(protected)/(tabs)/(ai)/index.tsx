import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Button, ScrollView, Text, View, XStack, useMedia } from 'tamagui';

export default function AI() {
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
      <Text>hello</Text>
      <XStack gap={10}>
        <Button
          flex={1}
          animation={'100ms'}
          onPress={() => router.navigate('/(protected)/chat')}
          rounded={24}
          pressStyle={{
            scale: 0.98,
          }}
        >
          Hello there
        </Button>

        <Button
          animation={'100ms'}
          circular
          pressStyle={{
            scale: 0.98,
          }}
          icon={<Ionicons name="add-circle" />}
        ></Button>
      </XStack>
    </ScrollView>
  );
}
