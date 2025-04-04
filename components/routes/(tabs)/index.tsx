import { Stack } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Tab One',
        }}
      />
      <View style={styles.container}>{/* <Text style={styles.text}>Hello</Text> */}</View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Adjusted for a standard top padding
    padding: 24,
    backgroundColor: '#ffffff', // Default background color
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Default text color
  },
});
