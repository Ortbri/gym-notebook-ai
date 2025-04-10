import React from 'react';
import { Text as RNText, StyleProp, TextProps, TextStyle } from 'react-native';
import { StyleSheet, UnistylesVariants } from 'react-native-unistyles';

interface TypographyProps
  extends React.PropsWithChildren,
    UnistylesVariants<typeof styles>,
    TextProps {
  style?: StyleProp<TextStyle>;
}
export const Text: React.FunctionComponent<TypographyProps> = ({
  children,
  isBold,
  color,
  size,
  style,
  ...props
}) => {
  styles.useVariants({
    isBold,
    color,
    size,
  });

  return (
    <RNText style={[styles.text, style]} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create((theme) => ({
  text: {
    variants: {
      size: {
        h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
        h2: { fontSize: 28, fontWeight: '700', lineHeight: 36 },
        h3: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
        h4: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
        lead: { fontSize: 18, fontWeight: '400', lineHeight: 28 },
        p: { fontSize: 16, lineHeight: 24 },
        blockquote: { fontSize: 16, fontStyle: 'italic', lineHeight: 24 },
        inlineCode: {
          fontSize: 14,
          fontFamily: 'Courier',
          backgroundColor: theme.colors.bg.secondary,
          borderRadius: 4,
          paddingHorizontal: 4,
          paddingVertical: 2,
          alignSelf: 'flex-start', // key for inline look
        },

        code: {
          fontSize: 14,
          fontFamily: 'Courier',
          backgroundColor: theme.colors.bg.secondary,
          padding: 12,
          borderRadius: 6,
          width: '100%',
        },

        caption: { fontSize: 12, color: theme.colors.text.tertiary },
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
    align: {
      center: { textAlign: 'center' },
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
    },
    emphasis: {
      true: { fontStyle: 'italic' },
    },
    muted: {
      true: { color: theme.colors.text.tertiary },
    },

    compoundVariants: [
      {
        size: 'inlineCode',
        isBold: true,
        styles: {
          borderRadius: 4,
          paddingHorizontal: 4,
          paddingVertical: 2,
        },
      },
      {
        size: 'blockquote',
        styles: {
          paddingLeft: 12,
          borderLeftWidth: 3,
          borderLeftColor: theme.colors.bg.tertiary,
        },
      },
      {
        muted: true,
        isBold: true,
        styles: {
          opacity: 0.7,
        },
      },
    ],
  },
}));
