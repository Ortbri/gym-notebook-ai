import React from 'react';
import { View, ScrollView, Image, Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useUser, useAuth } from '@clerk/clerk-expo';
import QRCode from 'react-native-qrcode-svg';

import { Button } from '~/components/ui/Button';
import { Text } from '~/components/ui/Text';

// Mock user data for debugging
// const mockUser = {
//   fullName: 'John Doe',
//   emailAddress: 'john.doe@example.com',
//   imageUrl: 'https://i.pravatar.cc/300',
//   createdAt: new Date('2024-01-01'),
// };

export default function Profile() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    if (!isSignedIn) return;
    try {
      await signOut();
      console.log('User signed out');
      // You might want to navigate the user away from the profile screen here
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Handle loading state or if user is not signed in
  if (!isLoaded || !isSignedIn || !user) {
    // Optionally return a loading spinner or null
    return null; 
  }


  const primaryEmail = user.primaryEmailAddress?.emailAddress;
  const joinDate = user.createdAt ? user.createdAt.toLocaleDateString() : 'N/A';

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <View style={styles.header}>
        {user.imageUrl ? (
          <Image
            source={{ uri: user.imageUrl }}
           style={styles.profileImage}
          />
         ) : (
           // Add a placeholder if no image URL
           <View style={[styles.profileImage, styles.placeholderImage]} />
         )}


        <View style={styles.userInfo}>
          <Text size="h3">{user.fullName || 'User'}</Text>
          {primaryEmail && (
            <Text size="p" color="tertiary">
              {primaryEmail}
            </Text>
          )}
          <Text size="caption" color="tertiary">
            Joined {joinDate}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text size="h4">Account Settings</Text>
        <Pressable style={styles.settingsItem}>
          <Text size="p">Edit Profile</Text>
        </Pressable>
        <Pressable style={styles.settingsItem}>
          <Text size="p">Notification Preferences</Text>
        </Pressable>
        <Pressable style={styles.settingsItem}>
          <Text size="p">Privacy Settings</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text size="h4">Your QR Code</Text>
        <View style={styles.qrCodeContainer}>
          {user.id ? (
            <QRCode
              value={user.id}
              size={150} // Adjust size as needed
              // Optional: Add logo, colors, etc.
              // logo={require('path/to/your/logo.png')}
              // logoSize={30}
              // backgroundColor='white'
              // color='black'
            />
          ) : (
            <Text color="tertiary">QR Code unavailable</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Button title="Sign Out" variant="secondary" onPress={handleSignOut} />
        {/* Consider adding a confirmation dialog for delete */}
        <Button title="Delete Account" variant="error" onPress={() => console.log('Delete account')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  header: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border.light,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderImage: {
    backgroundColor: theme.colors.bg.secondary,
  },
  userInfo: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  section: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border.light,
  },
  qrCodeContainer: {
    alignItems: 'center', // Center the QR code horizontally
    paddingVertical: theme.spacing.md,
  },
  settingsItem: {
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.bg.secondary,
    paddingHorizontal: theme.spacing.md,
  },
}));
