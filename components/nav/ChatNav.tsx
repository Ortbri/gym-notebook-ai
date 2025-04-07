import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import { useRootScale } from '~/providers/RootScaleProvider';

const SCALE_FACTOR = 0.88;
const DRAG_THRESHOLD = Math.min(Dimensions.get('window').height * 0.2, 150);
const HORIZONTAL_DRAG_THRESHOLD = Math.min(Dimensions.get('window').width * 0.51, 80);
const DIRECTION_LOCK_ANGLE = 45; // Angle in degrees to determine horizontal vs vertical movement
const ENABLE_HORIZONTAL_DRAG_CLOSE = false;
const DRAG_VELOCITY_THRESHOLD = 300;

export default function ChatNav({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setScale } = useRootScale();
  const translateY = useSharedValue(0);
  const isClosing = useRef(false);
  const statusBarStyle = useSharedValue<'light' | 'dark'>('light');
  const scrollOffset = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const translateX = useSharedValue(0);
  const initialGestureX = useSharedValue(0);
  const initialGestureY = useSharedValue(0);
  const isHorizontalGesture = useSharedValue(false);
  const isScrolling = useSharedValue(false);

  const handleHapticFeedback = useCallback(() => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  }, []);

  const goBack = useCallback(() => {
    if (!isClosing.current) {
      isClosing.current = true;
      requestAnimationFrame(() => {
        router.back();
      });
    }
  }, [router]);

  const handleScale = useCallback(
    (newScale: number) => {
      try {
        setScale(newScale);
      } catch (error) {
        console.log('Scale error:', error);
      }
    },
    [setScale]
  );

  const calculateGestureAngle = (x: number, y: number) => {
    'worklet';
    const angle = Math.abs(Math.atan2(y, x) * (180 / Math.PI));
    return angle;
  };

  const panGesture = Gesture.Pan()
    .onStart((event) => {
      'worklet';
      initialGestureX.value = event.x;
      initialGestureY.value = event.y;
      isHorizontalGesture.value = false;

      if (scrollOffset.value <= 0) {
        isDragging.value = true;
        translateY.value = 0;
      }
    })
    .onUpdate((event) => {
      'worklet';
      const dx = event.translationX;
      const dy = event.translationY;
      // const velocityY = event.velocityY;
      const angle = calculateGestureAngle(dx, dy);

      if (ENABLE_HORIZONTAL_DRAG_CLOSE && !isHorizontalGesture.value && !isScrolling.value) {
        if (Math.abs(dx) > 10) {
          if (angle < DIRECTION_LOCK_ANGLE) {
            isHorizontalGesture.value = true;
          }
        }
      }

      if (ENABLE_HORIZONTAL_DRAG_CLOSE && isHorizontalGesture.value) {
        translateX.value = dx;
        translateY.value = dy;

        const totalDistance = Math.sqrt(dx * dx + dy * dy);
        const progress = Math.min(totalDistance / 300, 1);

        const newScale = SCALE_FACTOR + progress * (1 - SCALE_FACTOR);
        runOnJS(handleScale)(newScale);

        if (progress > 0.2) {
          statusBarStyle.value = 'dark';
        } else {
          statusBarStyle.value = 'light';
        }
      } else if (scrollOffset.value <= 0 && isDragging.value) {
        translateY.value = Math.max(0, dy);
        const progress = Math.min(dy / 600, 1);
        const newScale = SCALE_FACTOR + progress * (1 - SCALE_FACTOR);
        runOnJS(handleScale)(newScale);

        if (progress > 0.5) {
          statusBarStyle.value = 'dark';
        } else {
          statusBarStyle.value = 'light';
        }
      }
    })
    .onEnd((event) => {
      'worklet';
      isDragging.value = false;

      if (ENABLE_HORIZONTAL_DRAG_CLOSE && isHorizontalGesture.value) {
        const dx = event.translationX;
        const dy = event.translationY;
        const velocityY = event.velocityY;
        const totalDistance = Math.sqrt(dx * dx + dy * dy);
        const shouldClose =
          totalDistance > HORIZONTAL_DRAG_THRESHOLD ||
          Math.abs(velocityY) > DRAG_VELOCITY_THRESHOLD;

        if (shouldClose) {
          const exitX = dx * 2;
          const exitY = dy * 2;

          translateX.value = withTiming(exitX, { duration: 300 });
          translateY.value = withTiming(exitY, { duration: 300 });

          runOnJS(handleScale)(1);
          runOnJS(handleHapticFeedback)();
          runOnJS(goBack)();
        } else {
          translateX.value = withTiming(0, { duration: 300 });
          translateY.value = withTiming(0, { duration: 300 });
          runOnJS(handleScale)(SCALE_FACTOR);
        }
      } else if (scrollOffset.value <= 0) {
        const shouldClose =
          event.translationY > DRAG_THRESHOLD ||
          Math.abs(event.velocityY) > DRAG_VELOCITY_THRESHOLD;

        if (shouldClose) {
          translateY.value = withTiming(event.translationY + 100, { duration: 300 });
          runOnJS(handleScale)(1);
          runOnJS(handleHapticFeedback)();
          runOnJS(goBack)();
        } else {
          translateY.value = withTiming(0, { duration: 300 });
          runOnJS(handleScale)(SCALE_FACTOR);
        }
      }
    })
    .onFinalize(() => {
      'worklet';
      isDragging.value = false;
      isHorizontalGesture.value = false;
    });

  const scrollGesture = Gesture.Native()
    .onBegin(() => {
      'worklet';
      isScrolling.value = true;
      if (!isDragging.value) {
        translateY.value = 0;
      }
    })
    .onEnd(() => {
      'worklet';
      isScrolling.value = false;
    });

  const composedGestures = Gesture.Simultaneous(panGesture, scrollGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { translateX: translateX.value }],
    opacity: withTiming(1),
  }));

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        setScale(SCALE_FACTOR);
      } catch (error) {
        console.log('Initial scale error:', error);
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
      try {
        setScale(1);
      } catch (error) {
        console.log('Cleanup scale error:', error);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <GestureDetector gesture={composedGestures}>
        <Animated.View style={[styles.modalContent, animatedStyle]}>{children}</Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
