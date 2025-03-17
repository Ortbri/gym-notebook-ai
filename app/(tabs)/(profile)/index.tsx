import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, ScrollView, Text, View, XStack, YStack } from 'tamagui';

export default function Profile() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <YStack ai="center" py="$5">
        <Image
          source={{ uri: 'https://picsum.photos/200/300' }}
          contentFit="cover"
          style={{
            height: 120,
            width: 120,
            // borderRadius: 60,
            // marginBottom: 12,
          }}
        />
        <Text fontSize="$6" fontWeight="$6" mb="$1">
          John Doe
        </Text>
        <Text fontSize="$4" mb="$4" opacity={0.8}>
          @johndoe
        </Text>
      </YStack>

      <XStack
        jc="center"
        py="$4"
        borderTopWidth={1}
        borderBottomWidth={1}
        borderColor="$borderColor"
      >
        <YStack f={1} ai="center">
          <Text fontSize="$5" fontWeight="$6">
            124
          </Text>
          <Text fontSize="$3" mt="$1">
            Workouts
          </Text>
        </YStack>
        <View width={1} bg="$borderColor" />
        <YStack f={1} ai="center">
          <Text fontSize="$5" fontWeight="$6">
            48
          </Text>
          <Text fontSize="$3" mt="$1">
            AI Plans
          </Text>
        </YStack>
        <View width={1} bg="$borderColor" />
        <YStack f={1} ai="center">
          <Text fontSize="$5" fontWeight="$6">
            892
          </Text>
          <Text fontSize="$3" mt="$1">
            Hours
          </Text>
        </YStack>
      </XStack>

      <YStack p="$4">
        <Text fontSize="$4" textAlign="center" lineHeight="$5">
          Fitness Enthusiast | 5x/week | Strength & HIIT Training
        </Text>
      </YStack>

      <YStack p="$4">
        <Text fontSize="$5" fontWeight="$6" mb="$3">
          Recent Achievements
        </Text>
        <YStack gap="$3">
          <YStack p="$4" borderRadius="$3" bg="$backgroundHover">
            <Text fontSize="$4" fontWeight="$6" mb="$1">
              30 Day Streak
            </Text>
            <Text fontSize="$3" opacity={0.8}>
              Completed workouts consistently
            </Text>
          </YStack>
          <YStack p="$4" borderRadius="$3" bg="$backgroundHover">
            <Text fontSize="$4" fontWeight="$6" mb="$1">
              Personal Best
            </Text>
            <Text fontSize="$3" opacity={0.8}>
              Bench Press: 225lbs
            </Text>
          </YStack>
        </YStack>
      </YStack>

      <YStack p="$4">
        <Button
          onPress={() => router.navigate('/(tabs)/(profile)/settings')}
          bg="$blue9"
          color="white"
          // borderradius="$3"
          py="$3"
          fontWeight="$6"
          fontSize="$4"
        >
          Edit Profile
        </Button>
      </YStack>
    </ScrollView>
  );
}
