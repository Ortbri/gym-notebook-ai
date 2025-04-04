import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export const PROJECT_COLORS = [
  '#0079bf',
  '#d29034',
  '#519839',
  '#b04632',
  '#89609e',
  '#cd5a91',
  '#4bbf6b',
  '#00aecc',
  '#838c91',
];

const Page = () => {
  const [selected, setSelected] = useState<string>('#000000');
  const router = useRouter();
  const headerHeight = useHeaderHeight();

  const onColorSelect = (color: string) => {
    setSelected(color);
    router.setParams({ bg: color });
  };

  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      <View style={styles.colorContainer}>
        {PROJECT_COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorBox, { backgroundColor: color }]}
            onPress={() => onColorSelect(color)}>
            {selected === color && <Ionicons name="checkmark" size={24} color="#fff" />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  colorContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colorBox: {
    height: 60,
    width: 60,
    margin: 5,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Page;
