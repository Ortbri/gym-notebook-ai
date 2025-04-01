import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function Modal() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Modal Screen</Text>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
}));
