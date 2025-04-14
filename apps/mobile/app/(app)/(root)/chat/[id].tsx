/// <reference types="react/canary" />

// import { renderRoot } from "@/actions/render-root";
// import { AnimatedLogo } from "@/components/animated-logo";
// import { ChatContainer } from "@/components/chat-container";
// import { ChatToolbarInner } from "@/components/chat-toolbar";
import React from 'react';
import { View, Text } from 'react-native';

import { renderRoot } from '~/actions/render-root';

export { ErrorBoundary } from 'expo-router';

export default function Index() {
  return <React.Suspense fallback={<Loading />}>{renderRoot()}</React.Suspense>;
}

function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Loading...</Text>
      {/* <AnimatedLogo /> */}
      {/* <ChatToolbarInner
        disabled
        messages={[]}
        setMessages={() => {}}
        onSubmit={async () => ({
          id: Math.random().toString(36).slice(2),
          display: <></>,
        })}
      /> */}
    </View>
  );
}
