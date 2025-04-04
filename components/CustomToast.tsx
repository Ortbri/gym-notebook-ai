import { Toast, useToastController, useToastState } from '@tamagui/toast';
import React from 'react';
import { Button, View, XStack, YStack } from 'tamagui';

export function CustomToast() {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      unstyled
      bg="transparent"
      animation="quickest"
      rounded="$10"
      viewportName={currentToast.viewportName}
      overflow="hidden"
      borderWidth={1}
      borderColor="$color8">
      <View
        height="100%"
        width="100%"
        py={4}
        px={14}
        minH={50}
        minW={200}
        items="center"
        justify="center">
        <YStack>
          <Toast.Title>{currentToast.title}</Toast.Title>

          {!!currentToast.message && (
            <Toast.Description color="$color12">{currentToast.message}</Toast.Description>
          )}
        </YStack>
      </View>
    </Toast>
  );
}

export function ToastControl({ native }: { native: boolean }) {
  const toast = useToastController();
  return (
    <XStack space="$2" items="center">
      <Button
        onPress={() => {
          toast.show('Successfully saved!', {
            message: "Don't worry, we've got your data.",
            native,
          });
        }}>
        Show
      </Button>
      <Button
        onPress={() => {
          toast.hide();
        }}>
        Hide
      </Button>
    </XStack>
  );
}
