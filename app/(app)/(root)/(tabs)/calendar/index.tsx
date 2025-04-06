import { useAuth } from '@clerk/clerk-expo';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import { StyleSheet } from 'react-native-unistyles';

import { Typography } from '~/components/Typography';
import { useRevenueCat } from '~/providers/RevenueCatProvider';

const Page = () => {
  const { signOut } = useAuth();
  const { isPro } = useRevenueCat();

  const goPro = async () => {
    const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall({
      displayCloseButton: false,
      fontFamily: 'SourGummyRegular',
    });

    switch (paywallResult) {
      case PAYWALL_RESULT.NOT_PRESENTED:
      case PAYWALL_RESULT.ERROR:
      case PAYWALL_RESULT.CANCELLED:
        return false;
      case PAYWALL_RESULT.PURCHASED:
      case PAYWALL_RESULT.RESTORED:
        return true;
      default:
        return false;
    }
  };

  const onBoxPress = () => {
    if (!isPro) {
      goPro();
    }
  };

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingTop: 14 }}>
        {Array.from({ length: 8 }).map((item, index) => (
          <TouchableOpacity key={index} style={styles.box} onPress={onBoxPress}>
            <Typography>
              Box {index + 1} {!isPro && '(Pro Only)'}
            </Typography>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,

    padding: 20,
    // backgroundColor: theme.colors.bg.secondary,
  },
  box: {
    backgroundColor: theme.colors.bg.primary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  boxText: {
    fontSize: 18,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#ff3b30',
  },
}));
