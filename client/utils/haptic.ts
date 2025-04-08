import * as Haptic from 'expo-haptics';

type CustomMilliseconds = number;
type HapticSequence = 'o' | 'O' | '.' | ':' | '::' | '-' | '=' | CustomMilliseconds;

export const hapticWithSequence = async (sequence: HapticSequence[]) => {
  const hapticMap = {
    o: () => Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium),
    O: () => Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Heavy),
    '.': () => Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light),
    ':': () => Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Soft),
    '::': () => Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Rigid),
    '-': () => new Promise((resolve) => setTimeout(resolve, 100)),
    '=': () => new Promise((resolve) => setTimeout(resolve, 1000)),
  };
  for (const char of sequence) {
    if (typeof char === 'number') {
      await new Promise((resolve) => setTimeout(resolve, char));
    } else {
      await hapticMap[char]();
    }
  }
};

const useHaptics = () => {
  // Light haptic feedback
  const lightHaptic = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
  };

  // Medium haptic feedback
  const mediumHaptic = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
  };

  // Heavy haptic feedback
  const heavyHaptic = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Heavy);
  };

  // Soft haptic feedback
  const softHaptic = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Soft);
  };

  // Rigid haptic feedback
  const rigidHaptic = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Rigid);
  };

  // Success haptic feedback
  const successHaptic = () => {
    Haptic.notificationAsync(Haptic.NotificationFeedbackType.Success);
  };

  // Warning haptic feedback
  const warningHaptic = () => {
    Haptic.notificationAsync(Haptic.NotificationFeedbackType.Warning);
  };

  // Error haptic feedback
  const errorHaptic = () => {
    Haptic.notificationAsync(Haptic.NotificationFeedbackType.Error);
  };

  return {
    lightHaptic,
    mediumHaptic,
    heavyHaptic,
    softHaptic,
    rigidHaptic,
    successHaptic,
    warningHaptic,
    errorHaptic,
  };
};

export { useHaptics };
