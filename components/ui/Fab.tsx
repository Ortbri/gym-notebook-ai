import Ionicons from '@expo/vector-icons/Ionicons';
import * as Burnt from 'burnt';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { SymbolView, SymbolViewProps, SFSymbol } from 'expo-symbols';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
// import

// const

const UniSymbolView = withUnistyles(SymbolView);

// const toggleIcon = () => {
//   //   setIcon(icon === 'add' ? 'remove' : 'add');
//   Burnt.toast({
//     title: 'Congrats!', // required

//     preset: 'done', // or "error", "none", "custom"

//     message: '', // optional

//     haptic: 'none', // or "success", "warning", "error"

//     duration: 2, // duration in seconds

//     shouldDismissByDrag: true,

//     from: 'top', // "top" or "bottom"

//     // optionally customize layout
//     // layout: {
//     //   iconSize: {
//     //     height: 14,
//     //     width: 14,
//     //   },
//     // },
//     // icon: {
//     //   ios: {
//     //     // SF Symbol. For a full list, see https://developer.apple.com/sf-symbols/.
//     //     name: 'checkmark.seal',
//     //     color: '#1D9BF0',
//     //   },
//     //   web: <Ionicons name="add" size={24} color="white" />,
//     // },
//   });
// };

export default function Fab() {
  const router = useRouter();
  //   const [icon, setIcon] = useState('add');

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push('/chat/current');
      }}>
      <Ionicons name="add" size={24} color="white" />
      {/* <UniSymbolView name="dumbbell.fill" size={24} style={styles.icon} /> */}
    </Pressable>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    position: 'absolute',
    bottom: rt.insets.bottom + 60,
    right: 24,
    height: 50,
    width: 50,
    backgroundColor: theme.colors.accent.strong,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: theme.colors.shadow.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
  },
}));
