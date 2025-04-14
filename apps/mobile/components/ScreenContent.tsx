import { Text, View, StyleSheet } from 'react-native';

import { EditScreenInfo } from './EditScreenInfo';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.separator} />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f0f0f0', // Light gray color
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
    backgroundColor: '#cccccc', // Gray color
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Dark gray color
  },
});
