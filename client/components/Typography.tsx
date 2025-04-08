import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import { StyleSheet, UnistylesVariants } from 'react-native-unistyles';

interface TypographyProps extends React.PropsWithChildren, UnistylesVariants<typeof styles> {
  style?: StyleProp<TextStyle>;
}

export const Typography: React.FunctionComponent<TypographyProps> = ({
  children,
  isBold,
  color,
  size,
  style,
}) => {
  styles.useVariants({
    isBold,
    color,
    size,
  });

  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create((theme) => ({
  // baseText: {
  //   variants: {
  //     fontFamily: {
  //       bold: {
  //         fontFamily: theme.fonts.SourGummyBold,
  //       },
  //       regular: {
  //         fontFamily: theme.fonts.SourGummyRegular,
  //       },
  //       light: {
  //         fontFamily: theme.fonts.SourGummy,
  //       },
  //     },
  //   },
  // },
  text: {
    // fontFamily: 'SourGummy',
    variants: {
      size: {
        title: {
          fontSize: 20,
        },
        subtitle: {
          fontSize: 18,
        },
        default: {
          fontSize: 14,
        },
      },
      isBold: {
        true: {
          fontWeight: 'bold',
        },
      },
      color: {
        tertiary: {
          color: theme.colors.text.tertiary,
        },
        default: {
          color: theme.colors.text.primary,
        },
      },
    },
    compoundVariants: [
      {
        isBold: true,
        color: 'tertiary',
        styles: {
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.bg.secondary,
        },
      },
    ],
  },
}));
