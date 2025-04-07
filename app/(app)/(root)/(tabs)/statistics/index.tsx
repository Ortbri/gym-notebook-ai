import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function Statistics() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <Pressable onPress={() => router.push('/chat/1')} style={styles.btn}>
        <Text style={styles.txt}>index</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {},
  txt: {
    color: theme.colors.text.primary,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.accent.strong,
    padding: 16,
    borderRadius: 18,
  },
}));
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { eq } from 'drizzle-orm';
// import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
// import { useRouter } from 'expo-router';
// import { useSQLiteContext } from 'expo-sqlite';
// import React from 'react';
// import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
// import Purchases from 'react-native-purchases';
// import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
// import Animated, { LinearTransition } from 'react-native-reanimated';
// import * as ContextMenu from 'zeego/context-menu';

// // import Fab from '~/components/ui/Fab';
// import { projects } from '~/db/schema';
// import { useRevenueCat } from '~/providers/RevenueCat';

// const Statistics = () => {
//   const { isPro } = useRevenueCat();
//   // const isPro = false;

//   const router = useRouter();
//   const db = useSQLiteContext();
//   const drizzleDb = drizzle(db);
//   const { data } = useLiveQuery(drizzleDb.select().from(projects), []);

//   const onDeleteProject = async function (id: number) {
//     await drizzleDb.delete(projects).where(eq(projects.id, id));
//   };

//   const onNewProject = async function () {
//     if (data?.length >= 5 && !isPro) {
//       gopro();
//     } else {
//       router.push('/(main)/(tabs)/statistics/newProj');
//     }
//   };

//   const gopro = async () => {
//     try {
//       const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall({
//         // offering: 'current',
//         displayCloseButton: false,
//       });

//       switch (paywallResult) {
//         case PAYWALL_RESULT.PURCHASED:
//           // User successfully purchased
//           router.push('/(main)/(tabs)/statistics/newProj');
//           return true;
//         case PAYWALL_RESULT.RESTORED:
//           // User restored their purchase
//           router.push('/(main)/(tabs)/statistics/newProj');
//           return true;
//         case PAYWALL_RESULT.CANCELLED:
//           // User cancelled the purchase
//           return false;
//         case PAYWALL_RESULT.ERROR:
//         case PAYWALL_RESULT.NOT_PRESENTED:
//         default:
//           console.error('Failed to present paywall:', paywallResult);
//           return false;
//       }
//     } catch (error) {
//       console.error('Error presenting paywall:', error);
//       // console.log('Error details:', error); // Log the error details
//       return false;
//     }
//   };

//   const testOfferings = async () => {
//     // todo
//     const offerings = await Purchases.getOfferings();
//     console.log('offerings', offerings);
//   };
//   // async function presentPaywallIfNeeded() {
//   //   // Present paywall for current offering:
//   //   const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywallIfNeeded({
//   //     requiredEntitlementIdentifier: 'pro',
//   //   });
//   //   // If you need to present a specific offering:
//   //   // const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywallIfNeeded({
//   //   //   offering, // Optional Offering object obtained through getOfferings
//   //   //   requiredEntitlementIdentifier: 'pro',
//   //   // });
//   // }

//   return (
//     <>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>My Projects</Text>
//         <TouchableOpacity style={styles.addButton} onPress={onNewProject}>
//           <Ionicons name="add" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       <Animated.FlatList
//         itemLayoutAnimation={LinearTransition.springify()}
//         contentInsetAdjustmentBehavior="automatic"
//         data={data}
//         style={{}}
//         // contentContainerStyle={styles.flatListContainer}
//         ItemSeparatorComponent={() => <View style={styles.separator} />}
//         renderItem={({ item }) => (
//           <ContextMenu.Root>
//             <ContextMenu.Trigger>
//               <TouchableOpacity style={styles.projectCard}>
//                 <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
//                 <View style={styles.projectInfo}>
//                   <Text style={styles.projectName}>{item.name}</Text>
//                   <Text style={styles.projectMeta}>0 tasks</Text>
//                 </View>
//                 <Ionicons name="chevron-forward" size={20} color="#666" />
//               </TouchableOpacity>
//             </ContextMenu.Trigger>
//             <ContextMenu.Content>
//               <ContextMenu.Item key="test" onSelect={testOfferings}>
//                 <ContextMenu.ItemTitle>Test Paywall</ContextMenu.ItemTitle>
//               </ContextMenu.Item>
//               <ContextMenu.Item key="edit">
//                 <ContextMenu.ItemTitle>Edit Project</ContextMenu.ItemTitle>
//               </ContextMenu.Item>
//               <ContextMenu.Item key="delete" destructive onSelect={() => onDeleteProject(item.id)}>
//                 <ContextMenu.ItemTitle>Delete Project</ContextMenu.ItemTitle>
//               </ContextMenu.Item>
//               <ContextMenu.Separator />
//               <ContextMenu.Arrow />
//             </ContextMenu.Content>
//           </ContextMenu.Root>
//         )}
//         keyExtractor={(item) => item.id.toString()}
//       />
//       {/* <Fab onPress={onNewProject} /> */}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     // backgroundColor: theme.colors.bg.primary,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     // backgroundColor: theme.colors.bg.secondary,
//     // marginBottom: 16,
//   },
//   headerText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#000', // Default color since theme is not used
//   },
//   addButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#007AFF', // Default color since theme is not used
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   flatListContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//     flexGrow: 1,
//   },
//   projectCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 14,
//     backgroundColor: '#F0F0F0', // Default color since theme is not used
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   colorIndicator: {
//     width: 2,
//     height: 40,
//     marginRight: 14,
//     borderRadius: 40,
//     // borderRadius: 12,
//     // marginRight: 12,
//   },
//   projectInfo: {
//     flex: 1,
//   },
//   projectName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000', // Default color since theme is not used
//     marginBottom: 4,
//   },
//   projectMeta: {
//     fontSize: 13,
//     color: '#666', // Default color since theme is not used
//   },
//   separator: {
//     // height: 8,
//   },
// });
