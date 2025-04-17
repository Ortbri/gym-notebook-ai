import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { BlurEffectTypes } from 'react-native-screens';
import { useUnistyles } from 'react-native-unistyles';

const useNavStyle = () => {
  const { theme } = useUnistyles();

  const defaultStyling: NativeStackNavigationOptions = {
    headerLargeTitleShadowVisible: false,
    headerLargeTitleStyle: {
      fontWeight: '800',
      fontFamily: 'SatoshiBold',
    },
    headerShadowVisible: Platform.OS === 'ios',
    headerTintColor: theme.colors.text.primary,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontFamily: 'SatoshiBold',
    },
    headerBackTitleStyle: {
      fontFamily: 'SatoshiBold',
    },
    contentStyle: {
      backgroundColor: theme.colors.bg.primary,
    },
  };

  return {
    // blur settings
    headerBlurSettings: {
      headerLargeStyle: {
        backgroundColor: theme.colors.bg.primary,
      },
      headerBlurEffect: 'prominent' as BlurEffectTypes,
      headerTransparent: Platform.OS === 'ios',
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
