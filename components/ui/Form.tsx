import React from 'react';
import { View } from 'react-native';
import { StyleSheet, mq } from 'react-native-unistyles';

import { breakpoints } from '../../breakpoints';

type FormProps = {
  children: React.ReactNode;
};

export const Form = ({ children }: FormProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    // padding: 16, // Use fixed value to avoid theme dependency
    // backgroundColor: 'red',
    _web: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  formContainer: {
    // width: '100%',
    // height: '100%',

    // Web-specific styles
    _web: {
      // Per documentation examples, use a single property with multiple media queries
      // backgroundColor: {
      //   [mq.only.width(0, 'sm')]: theme.colors.bg.primary,
      //   [mq.only.width('md')]: theme.colors.bg.secondary,
      // },
      maxWidth: {
        [mq.only.width('md')]: 600,
      },
      alignSelf: {
        [mq.only.width('md')]: 'center',
      },
      alignItems: {
        [mq.only.height('md')]: 'center',
      },
      justifyContent: {
        [mq.only.width('md')]: 'center',
      },
      borderWidth: {
        [mq.only.width('md')]: 1,
      },
      borderColor: {
        [mq.only.width('md')]: theme.colors.border.light,
      },
      borderRadius: {
        [mq.only.width('md')]: theme.radius.xl,
      },
      padding: {
        [mq.only.width('md')]: 24,
      },
      boxShadow: {
        [mq.only.width('md')]: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
}));
