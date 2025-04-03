import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

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
    <View style={{ marginTop: headerHeight }}>
      <View
        style={{ flexDirection: 'row', flexGrow: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        {PROJECT_COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={{
              backgroundColor: color,
              height: 60,
              width: 60,
              margin: 5,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => onColorSelect(color)}>
            {selected === color && <Ionicons name="checkmark" size={24} color="#fff" style={{}} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    marginTop: rt.insets.top,
  },
}));

export default Page;
