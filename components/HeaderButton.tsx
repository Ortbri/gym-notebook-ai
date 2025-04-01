import FontAwesome from '@expo/vector-icons/FontAwesome';
import { forwardRef } from 'react';
import { Pressable } from 'react-native';

type HeaderButtonProps = {
  onPress?: () => void;
  iconName: keyof typeof FontAwesome.glyphMap;
};

export const HeaderButton = forwardRef<typeof Pressable, HeaderButtonProps>(
  ({ onPress, iconName }, ref) => {
    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <FontAwesome
            name={iconName}
            size={25}
            color="gray"
            style={[
              // styles.headerRight,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          />
        )}
      </Pressable>
    );
  }
);

// export const styles = StyleSheet.create({
//   headerRight: {
//     marginRight: 15,
//   },
// });
