import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { ScrollView } from 'react-native';

import { Button } from '~/components/ui/Button';
import { Text } from '~/components/ui/Text';

export default function Profile() {
  const { user } = useUser();
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text>Profile</Text>
      <Text>{user?.emailAddresses[0].emailAddress}</Text>
      <Button
        title="Delete Account"
        variant="error"
        onPress={() => {
          user?.delete();
          // router.replace('/(auth)');
        }}
      />
    </ScrollView>
  );
}
// import { useClerk, useUser } from '@clerk/clerk-expo';
// // import * as Application from 'expo-application';
// // import { useRouter } from 'expo-router';
// // import * as Updates from 'expo-updates';
// // import { useEffect } from 'react';
// import { Alert, Image, Linking, Pressable, Share, StyleSheet, View } from 'react-native';

// import { BodyScrollView } from '~/components/BodyScroll';
// import { IconSymbol } from '~/components/IconSymbol';
// // import { Button } from '~/components/ui/Button';
// import { Text } from '~/components/ui/Text';

// export default function ProfileScreen() {
//   const { user } = useUser();
//   const { signOut } = useClerk();
//   // const router = useRouter();

//   // const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

//   // useEffect(() => {
//   //   Updates.checkForUpdateAsync();
//   // }, []);

//   // // useEffect(() => {
//   //   if (isUpdatePending) {
//   //     Updates.reloadAsync();
//   //   }
//   // }, [isUpdatePending]);

//   // const handleUpdate = async () => {
//   //   try {
//   //     await Updates.fetchUpdateAsync();
//   //   } catch (error) {
//   //     Alert.alert('Update Failed', 'Failed to download the update. Please try again.');
//   //     console.error(error);
//   //   }
//   // };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: 'Check out Shopping List: Sync & Share on the App Store!',
//         url: 'https://apps.apple.com/us/app/shopping-list-sync-share/id6739513017',
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleRate = async () => {
//     try {
//       await Linking.openURL(
//         'https://apps.apple.com/us/app/shopping-list-sync-share/id6739513017?action=write-review'
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSignOut = async () => {
//     await signOut();
//     // router.replace('/(auth)');
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       Alert.alert(
//         'Delete account',
//         'Are you sure you want to delete your account? This action is irreversible.',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//           {
//             text: 'Delete',
//             onPress: async () => {
//               await user?.delete();
//               // router.replace('/(auth)');
//             },
//             style: 'destructive',
//           },
//         ]
//       );
//     } catch (error) {
//       Alert.alert('Error', 'Failed to delete account');
//       console.error(error);
//     }
//   };

//   return (
//     <BodyScrollView contentContainerStyle={styles.container}>
//       <View>
//         <View style={styles.header}>
//           {user?.imageUrl ? (
//             <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
//           ) : null}
//           <View style={styles.userInfo}>
//             <Text size="p" style={styles.email}>
//               {user?.emailAddresses[0].emailAddress}
//             </Text>
//             <Text style={styles.joinDate}>Joined {user?.createdAt?.toDateString()}</Text>
//           </View>
//         </View>
//         <View style={styles.actionButtons}>
//           <Pressable onPress={handleShare} style={styles.actionButton}>
//             <IconSymbol name="square.and.arrow.up" color="white" />
//             <Text size="p">Share app</Text>
//           </Pressable>
//           <Pressable onPress={handleRate} style={styles.actionButton}>
//             <IconSymbol name="star" color="white" />
//             <Text size="p">Rate app</Text>
//           </Pressable>
//         </View>
//       </View>
//       <View style={styles.section}>
//         <Text size="p" style={styles.appTitle}>
//           Shopping List: Sync & Share
//         </Text>
//         {/* <Text size="p" style={styles.version}>
//           v{Application.nativeApplicationVersion}
//         </Text> */}
//       </View>

//       {/* <View style={styles.section}> */}
//       {/* <View style={styles.infoRow}>
//           <Text size="p">Channel</Text>
//           <Text size="p">{Updates.channel}</Text>
//         </View> */}

//       {/* <View style={styles.infoRow}>
//           <Text size="p">Last update</Text>
//           <Text size="p">{new Date(Updates.createdAt ?? 0).toDateString()}</Text>
//         </View> */}

//       <View style={styles.infoRow}>
//         <View style={{ flex: 1 }}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <Text size="p">Update ID</Text>
//             {/* <Text size="p" style={{ fontSize: 12 }}>
//                 {Updates.isEmbeddedLaunch ? ' (Embedded)' : ' (Downloaded)'}
//               </Text> */}
//           </View>
//           {/* <Text size="p" style={{ fontSize: 12 }} numberOfLines={2}>
//               {Updates.updateId}
//             </Text> */}
//         </View>
//       </View>
//       {/* {isUpdateAvailable ? (
//           <View>
//             <Text size="p" style={styles.updateText}>
//               A new update is available!
//             </Text>
//             <Button variant="ghost" onPress={handleUpdate}>
//               Download and install update
//             </Button>
//           </View>
//         ) : (
//           <Button
//             variant="ghost"
//             onPress={() => Alert.alert('✅ All clear!', 'Even the bugs are taking a day off!')}
//             // textStyle={{ color: appleGreen }}>
//           >
//             No bug fixes available
//           </Button>
//         )}
//       </View> */}

//       {/* <Button onPress={handleSignOut} variant="ghost">
//         Sign out
//       </Button>

//       <Button onPress={handleDeleteAccount} variant="ghost">
//         Delete account
//       </Button> */}
//     </BodyScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingTop: 32,
//     gap: 24,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginRight: 16,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   email: {
//     fontSize: 18,
//     marginBottom: 4,
//   },
//   joinDate: {
//     opacity: 0.7,
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 24,
//     marginTop: 16,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   section: {
//     backgroundColor: 'rgba(150, 150, 150, 0.1)',
//     borderRadius: 12,
//     padding: 16,
//     paddingVertical: 8,
//   },
//   appTitle: {
//     textAlign: 'center',
//   },
//   version: {
//     textAlign: 'center',
//     opacity: 0.7,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   updateText: {
//     color: '#34C759',
//   },
// });
