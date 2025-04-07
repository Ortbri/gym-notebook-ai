import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Platform, StyleProp, TextStyle } from 'react-native';
import { BlurEffectTypes } from 'react-native-screens';
import { useUnistyles } from 'react-native-unistyles';

const useNavStyle = () => {
  const { theme } = useUnistyles();

  const defaultStyling: NativeStackNavigationOptions = {
    headerLargeTitleShadowVisible: false,
    contentStyle: {
      backgroundColor: theme.colors.bg.primary,
    },
    headerLargeTitleStyle: {
      fontWeight: '800',
      fontFamily: 'SourGummyBold',
    },
    headerShadowVisible: Platform.OS === 'ios',
    headerTintColor: theme.colors.text.primary,
    headerTitleAlign: 'center' as 'center' | 'left' | undefined,
    headerTitleStyle: {
      fontFamily: 'SourGummyBold',
    } as StyleProp<
      Pick<TextStyle, 'fontWeight' | 'fontFamily' | 'fontSize'> & {
        color?: string | undefined;
      }
    >,
    headerBackTitleStyle: {
      fontFamily: 'SourGummyBold',
    },
  };

  return {
    // blur settings
    headerBlurSettings: {
      headerLargeStyle: {
        backgroundColor: theme.colors.bg.primary,
      },
      headerBlurEffect: 'prominent' as BlurEffectTypes,
      // effectiveTheme === 'dark' ? ('dark' as BlurEffectTypes) : ('light' as BlurEffectTypes),
      headerTransparent: Platform.OS === 'ios',
      // headerStyle: {
      //   backgroundColor: effectiveTheme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)',
      // },
      ...defaultStyling,
    },
    // custom blur settings
    headerCustomBlurSettings: {
      headerTransparent: Platform.OS === 'ios',
      headerStyle: {
        backgroundColor: 'transparent',
      },
      ...defaultStyling,
    },
    // default settings
    headerDefaultSettings: {
      headerLargeStyle: {
        backgroundColor: theme.colors.bg.primary,
      },
      headerStyle: {
        backgroundColor: theme.colors.bg.primary,
      },
      ...defaultStyling,
    },
    headerModalSettings: {
      // TODO: could add body color changes

      // contentStyle: {
      //   backgroundColor: theme.colors.bg.primary, // was card color
      // },
      headerStyle: {
        backgroundColor: theme.colors.bg.primary,
      },
      ...defaultStyling,
    },
    // default settings for transparent
    headerTransparentSettings: {
      headerTransparent: true,
      headerLargeStyle: {
        backgroundColor: 'transparent',
      },
      headerStyle: {
        backgroundColor: 'transparent',
      },
      ...defaultStyling,
    },
  };
};

export default useNavStyle;
