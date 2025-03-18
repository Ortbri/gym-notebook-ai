import React from 'react';
import { ScrollView, Text, View } from 'tamagui';

export default function AI() {
  return (
    // <View flex={1} padding={14} borderWidth={1} borderRadius={'$4'} borderColor={'$color6'}>
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        gap: 4,
        paddingHorizontal: 14,
        paddingTop: 14,
      }}
    >
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      {/* {Array.from({ length: 40 }).map((_, index) => (
        <View key={index} bg={'$purple10'} width={100} height={100} />
      ))} */}
    </ScrollView>
  );
}
