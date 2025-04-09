import * as Burnt from 'burnt';
import React from 'react';
import { View, Pressable } from 'react-native';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import { useUnistyles, StyleSheet } from 'react-native-unistyles';

import { IconSymbol } from '~/components/IconSymbol';
import { Typography } from '~/components/Typography';
import { useRevenueCat } from '~/providers/RevenueCatProvider';
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
export default function SubscriptionTestListItem() {
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
  return (
    <SettingsItem
      title="Subscription"
      icon="creditcard"
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
    />
  );
}

const stylesheet = StyleSheet.create((theme) => ({
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
