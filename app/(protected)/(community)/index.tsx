import React, { useState } from 'react';
import { AnimatePresence, Button, Text, View, YStack, useMedia } from 'tamagui';

// Example community post data
interface Post {
  id: string;
  title: string;
  author: string;
  content: string;
}

const communityPosts: Post[] = [
  {
    id: '1',
    title: 'My Workout Journey',
    author: 'FitUser1',
    content: 'Started a new workout routine today and feeling great!',
  },
  {
    id: '2',
    title: 'Nutrition Tips',
    author: 'HealthyEater',
    content: 'Here are some nutrition tips that have helped me gain muscle.',
  },
  {
    id: '3',
    title: 'Cardio Question',
    author: 'RunningFan',
    content: "What's the best time of day for cardio workouts?",
  },
];

export default function Community() {
  const [visible, setVisible] = useState(true);
  const [posts, setPosts] = useState<Post[]>(communityPosts);
  const media = useMedia();
  // Using media queries to adjust styles based on screen size
  // const isMobile = useMedia({ maxWidth: 600 });

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const resetPosts = () => {
    setPosts([]);
    setTimeout(() => {
      setPosts(communityPosts);
    }, 500);
  };

  return (
    <View flex={1} bg={'$color1'} p="$4">
      <YStack space="$4">
        <Text fontWeight="bold">Community Posts</Text>

        <YStack>
          <Button onPress={toggleVisibility}>{visible ? 'Hide Posts' : 'Show Posts'}</Button>
          <Button mt="$2" onPress={resetPosts}>
            Reset
          </Button>
        </YStack>

        <AnimatePresence>
          {visible && (
            <YStack
              // bg={'$color3'}
              space="$4"
              // $gtMd={{ backgroundColor: 'blue' }}
              width="100%"
              animation="bouncy"
              enterStyle={{ x: -300, opacity: 0 }}
              exitStyle={{ x: 300, opacity: 0 }}
              key="post-container"
              gap={10}
            >
              {posts.map((post) => (
                <YStack
                  key={post.id}
                  p="$4"
                  bg={'$color4'}
                  animation="100ms"
                  {...(media.md && {
                    // x: 10,
                    // y: 10,
                    maxW: 900,
                    // justify: 'center',
                    content: 'center',
                  })}
                >
                  <Text fontWeight="bold">{post.title}</Text>
                  <Text opacity={0.7}>by {post.author}</Text>
                  <Text mt="$2">{post.content}</Text>
                </YStack>
              ))}
            </YStack>
          )}
        </AnimatePresence>
      </YStack>
    </View>
  );
}
