import { useUser, useAuth } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, ScrollView, Image, Pressable, Alert, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '~/components/ui/Button';
import { Text } from '~/components/ui/Text';

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  showArrow?: boolean;
}

export default function Profile() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
            console.log('User signed out');
          } catch (error) {
            console.error('Error signing out:', error);
          }
        },
      },
    ]);
  };

  // Handle loading state or if user is not signed in
  if (!isLoaded || !isSignedIn || !user) {
    // Optionally return a loading spinner or null
    return null;
  }

  const primaryEmail = user.primaryEmailAddress?.emailAddress;
  const joinDate = user.createdAt ? user.createdAt.toLocaleDateString() : 'N/A';

  const SettingsItem = ({ icon, label, onPress, showArrow = true }: SettingsItemProps) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.settingsItem, pressed && ({ opacity: 0.7 } as ViewStyle)]}>
      <View style={styles.settingsItemContent}>
        <View style={styles.settingsItemLeft}>
          <Ionicons name={icon} size={22} color="#666" />
          <Text size="p">{label}</Text>
        </View>
        {showArrow && <Ionicons name="chevron-forward" size={20} color="#666" />}
      </View>
    </Pressable>
  );

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          {user.imageUrl ? (
            <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileImage, styles.placeholderImage]}>
              <Ionicons name="person" size={50} color="#666" />
            </View>
          )}
        </View>

        <View style={styles.userInfo}>
          <Text size="h3" style={styles.userName}>
            {user.fullName || 'User'}
          </Text>
          {primaryEmail && (
            <Text size="p" color="tertiary" style={styles.userEmail}>
              {primaryEmail}
            </Text>
          )}
          <Text size="caption" color="tertiary">
            Member since {joinDate}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text size="h4" style={styles.sectionTitle}>
          Account Settings
        </Text>

        <SettingsItem
          icon="person-outline"
          label="Edit Profile"
          onPress={() => console.log('Edit Profile')}
        />

        <SettingsItem
          icon="notifications-outline"
          label="Notification Preferences"
          onPress={() => console.log('Notifications')}
        />

        <SettingsItem
          icon="lock-closed-outline"
          label="Privacy Settings"
          onPress={() => console.log('Privacy')}
        />

        <SettingsItem
          icon="bug-outline"
          label="Testing"
          onPress={() => router.navigate('/(app)/(root)/profile/test')}
        />
      </View>

      <View style={styles.section}>
        <Button
          title="Sign Out"
          variant="secondary"
          onPress={handleSignOut}
          icon={<Ionicons name="log-out-outline" size={20} color="#666" />}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  } as ViewStyle,
  header: {
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
    alignItems: 'center',
    borderBottomColor: theme.colors.border.light,
    backgroundColor: theme.colors.bg.secondary,
  } as ViewStyle,
  profileImageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  } as ViewStyle,
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: theme.colors.bg.primary,
  } as ViewStyle,
  placeholderImage: {
    backgroundColor: theme.colors.bg.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  userInfo: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  } as ViewStyle,
  userName: {
    fontWeight: '600',
  } as ViewStyle,
  userEmail: {
    opacity: 0.8,
  } as ViewStyle,
  section: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  } as ViewStyle,
  sectionTitle: {
    marginBottom: theme.spacing.sm,
    fontWeight: '600',
    opacity: 0.8,
  } as ViewStyle,
  settingsItem: {
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.bg.secondary,
    overflow: 'hidden',
  } as ViewStyle,
  settingsItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  } as ViewStyle,
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  } as ViewStyle,
  settingsIcon: {
    opacity: 0.8,
  } as ViewStyle,
}));
