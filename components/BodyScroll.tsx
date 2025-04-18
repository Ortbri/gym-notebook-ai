'use client';

// import * as AC from "@bacons/apple-colors";
import { ScrollView, ScrollViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function BodyScrollView(props: ScrollViewProps) {
  //   const paddingBottom = 72;
  return (
    <ScrollView
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      //   scrollIndicatorInsets={{ bottom: paddingBottom }}
      {...props}
      style={styles.container}
    />
  );
}
const styles = StyleSheet.create((theme) => ({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    // backgroundColor: theme.colors.bg.primary,
  },
}));

BodyScrollView.displayName = 'BodyScrollView';
