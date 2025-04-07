// import { LinearGradient } from 'expo-linear-gradient';
// import { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { Typography } from './Typography';
// const { width } = Dimensions.get('window');

interface ExpandedViewProps {
  scrollComponent?: () => React.ReactElement;
  backgroundColor?: string;
}

export function ExpandedView({ scrollComponent, backgroundColor = '#000000' }: ExpandedViewProps) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.dragHandleContainer}>
        <View style={styles.dragHandle} />
      </View>

      {scrollComponent ? (
        <View style={styles.scrollView}>{scrollComponent()}</View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {/* <Text style={styles.txt}>HELLO WORLD</Text> */}
            <Typography>HELLO WORLD</Typography>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  rootContainer: {
    flex: 1,
    paddingTop: rt.insets.top,
    height: '100%',
    width: '100%',
    // backgroundColor: 'red',
    backgroundColor: theme.colors.bg.primary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  dragHandleContainer: {
    paddingBottom: 14,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: theme.colors.bg.tertiary,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  txt: {
    color: 'white',
  },
}));
