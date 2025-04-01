import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text } from 'react-native';

export default function Modal() {
  return (
    <>
      <View>
        <Text>Modal Screen</Text>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}
