import { useAuth, useUser } from '@clerk/clerk-expo';
import * as Burnt from 'burnt';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
// import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { IconSymbol } from '~/components/IconSymbol';
import { Typography } from '~/components/Typography';
import { useHaptics } from '~/utils/haptic';

// iOS-style settings list item component
interface SettingsItemProps {
  title: string;
  icon?: string;
  iconColor?: string;
  onPress?: () => void;
  showChevron?: boolean;
  subtitle?: string;
  isLastItem?: boolean;
}

const SettingsItem = ({
  title,
  icon,
  iconColor,
  onPress,
  showChevron = true,
  subtitle,
  isLastItem = false,
}: SettingsItemProps) => {
  const { theme } = useUnistyles();
  const { rigidHaptic } = useHaptics();

  return (
    <Pressable
      style={({ pressed }) => [
        stylesheet.settingsItem,
        pressed && { backgroundColor: theme.colors.border.light },
        isLastItem && { borderBottomWidth: 0 },
      ]}
      onPress={() => {
        rigidHaptic();
        onPress?.();
      }}>
      {icon && (
        <View style={stylesheet.iconContainer}>
          <IconSymbol
            // @ts-ignore
            name={icon}
            size={22}
            color={theme.colors.text.primary}
          />
        </View>
      )}
      <View style={stylesheet.settingsItemContent}>
        <View>
          <Typography style={stylesheet.settingsItemTitle}>{title}</Typography>
          {subtitle && <Typography style={stylesheet.settingsItemSubtitle}>{subtitle}</Typography>}
        </View>
        {showChevron && (
          <IconSymbol
            // @ts-ignore
            name="chevron.right"
            size={14}
            color={theme.colors.text.tertiary}
          />
        )}
      </View>
    </Pressable>
  );
};

// Group of settings items with a title
interface SettingsGroupProps {
  title?: string;
  children: React.ReactNode;
}

const SettingsGroup = ({ title, children }: SettingsGroupProps) => {
  return (
    <View style={stylesheet.settingsGroupContainer}>
      {/* {title && <Text style={stylesheet.settingsGroupTitle}>{title}</Text>} */}
      <View style={stylesheet.settingsGroupContent}>{children}</View>
    </View>
  );
};

export default function Menu() {
  const { signOut } = useAuth();
  const { user } = useUser();
  // const { isPro } = useRevenueCat();
  const { theme } = useUnistyles();
  const router = useRouter();

  // const goPro = async () => {
  //   const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall({
  //     displayCloseButton: false,
  //     fontFamily: 'SourGummyRegular',
  //   });

  //   switch (paywallResult) {
  //     case PAYWALL_RESULT.NOT_PRESENTED:
  //     case PAYWALL_RESULT.ERROR:
  //     case PAYWALL_RESULT.CANCELLED:
  //       return false;
  //     case PAYWALL_RESULT.PURCHASED:
  //     case PAYWALL_RESULT.RESTORED:
  //       return true;
  //     default:
  //       return false;
  //   }
  // };

  return (
    <View style={stylesheet.container}>
      <SettingsGroup title="Account">
        <SettingsItem
          title={user?.firstName || 'User'}
          subtitle={user?.emailAddresses?.[0]?.emailAddress || 'No email'}
          icon="person.crop.circle"
          iconColor={theme.colors.accent.regular}
          onPress={() => {
            router.navigate('/(app)/(root)/settings/profile');
            // Burnt.toast({
            //   title: 'Profile settings coming soon',
            //   preset: 'done',
            //   haptic: 'success',
            //   duration: 2,
            // });
          }}
        />
        {/* <SettingsItem
          title="Subscription"
          icon="creditcard"
          iconColor={isPro ? theme.colors.success.main : theme.colors.text.tertiary}
          subtitle={isPro ? 'Pro' : 'Free'}
          isLastItem
          onPress={() => {
            if (isPro) {
              Burnt.toast({
                title: 'You are a pro',
                preset: 'done',
                haptic: 'success',
                duration: 2,
              });
            } else {
              goPro();
            }
          }}
        /> */}
      </SettingsGroup>
      <SettingsGroup title="App">
        <SettingsItem
          title="Testing Route"
          icon="hammer"
          iconColor={theme.colors.accent.regular}
          isLastItem
          onPress={() => {
            router.navigate('/(app)/(root)/settings/test');
          }}
        />
      </SettingsGroup>

      <SettingsGroup>
        <SettingsItem
          title="Sign Out"
          icon="rectangle.portrait.and.arrow.right"
          iconColor={theme.colors.error.main}
          showChevron={false}
          isLastItem
          onPress={signOut}
        />
      </SettingsGroup>
      <SettingsGroup title="App">
        <SettingsItem
          title="Testing Route"
          icon="hammer"
          iconColor={theme.colors.accent.regular}
          isLastItem
          onPress={() => {
            router.navigate('/(app)/(root)/settings/test');
          }}
        />
      </SettingsGroup>

      {/* <SettingsGroup>
        <SettingsItem
          title="Delete Account"
          icon="trash"
          iconColor={theme.colors.accent.regular}
          showChevron={false}
          isLastItem
          onPress={() => {
            router.navigate('/(app)/(root)/settings/delete');
          }}
        /> */}
      {/* </SettingsGroup> */}
    </View>
  );
}

const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    gap: 16,
  },
  button: {
    backgroundColor: theme.colors.error.bg,
    paddingVertical: 18,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: theme.colors.border.strong,
  },
  buttonText: {
    fontFamily: theme.fonts.SourGummyBold,
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  settingsGroupContainer: {
    // marginTop: 24,
  },
  settingsGroupTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text.tertiary,
    paddingHorizontal: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingsGroupContent: {
    backgroundColor: theme.colors.bg.secondary,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingsItemTitle: {
    fontSize: 16,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.SourGummyRegular,
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: theme.colors.text.tertiary,
    marginTop: 2,
  },
}));
