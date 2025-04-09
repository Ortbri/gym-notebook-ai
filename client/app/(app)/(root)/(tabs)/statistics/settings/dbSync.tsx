import React from 'react';
import { View, Text } from 'react-native';

export default function DBSync() {
  return (
    <View>
      <Text>DBSync</Text>
    </View>
  );
}
// import React, { useEffect, useState } from 'react';
// import { FlatList, Platform, Text, View, Pressable, ActivityIndicator } from 'react-native';
// import { StyleSheet, useUnistyles } from 'react-native-unistyles';
// import { createMergeableStore } from 'tinybase/mergeable-store';
// import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
// import { createIndexedDbPersister } from 'tinybase/persisters/persister-indexed-db';
// import { createWsSynchronizer } from 'tinybase/synchronizers/synchronizer-ws-client';
// import {
//   useCreateMergeableStore,
//   useCreatePersister,
//   useCreateSynchronizer,
//   useProvideStore,
//   useRowIds,
//   useSortedRowIds,
//   useStore,
// } from 'tinybase/ui-react';

// /* ---------------------------- tiny base testing --------------------------- */
// const TABLE_NAME = 'tasks';
// const TEXT_CELL = 'text';
// const DONE_CELL = 'done';

// // Get the appropriate WebSocket URL based on environment
// const getServerUrl = () => {
//   if (__DEV__) {
//     // Use IP address instead of localhost for mobile device access
//     // Replace with your actual computer's IP address on your local network
//     return 'ws://localhost:53994/'; // Use the actual port where your server is running
//   } else {
//     // Use the production URL in production
//     return 'wss://server.gym-notebook-ai.workers.dev/';
//   }
// };

// function AddTask() {
//   const { theme } = useUnistyles();
//   const store = useStore(TABLE_NAME);

//   function handleTask() {
//     store?.addRow(TABLE_NAME, {
//       [TEXT_CELL]: getRandomTask(),
//       [DONE_CELL]: false,
//     });
//   }

//   return (
//     <Pressable style={styles.button} onPress={handleTask}>
//       <Text style={styles.buttonText}>STORE</Text>
//     </Pressable>
//   );
// }

// function TaskList() {
//   const { theme } = useUnistyles();
//   const store = useStore(TABLE_NAME);
//   const sortedRowIds = useRowIds(TABLE_NAME, store);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Set loading to false after a short delay to let data sync
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={theme.colors.accent.regular} />
//         <Text style={styles.loadingText}>Syncing data...</Text>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       contentInsetAdjustmentBehavior="automatic"
//       ListHeaderComponent={<AddTask />}
//       contentContainerStyle={{
//         alignItems: 'center',
//         paddingBottom: 100,
//         gap: 8,
//       }}
//       data={sortedRowIds}
//       renderItem={({ item: id }) => {
//         const task = store?.getRow(TABLE_NAME, id);
//         return (
//           <Pressable style={styles.taskRow} onPress={() => store?.delRow(TABLE_NAME, id)}>
//             <Text style={styles.taskText}>{id}</Text>
//             <Text style={styles.taskText}>{task?.[TEXT_CELL]}</Text>
//             <Text style={styles.taskText}>{task?.[DONE_CELL] ? 'Done' : 'Not Done'}</Text>
//           </Pressable>
//         );
//       }}
//     />
//   );
// }

// export default function dbSync() {
//   const { theme } = useUnistyles();
//   const [syncStatus, setSyncStatus] = useState('initializing');
//   const store = useCreateMergeableStore(() => createMergeableStore());

//   useCreatePersister(
//     store,
//     (store) => {
//       if (Platform.OS === 'web') {
//         return createIndexedDbPersister(store, 'tasks-db');
//       } else {
//         return createExpoSqlitePersister(store, SQLite.openDatabaseSync('tasks.db'));
//       }
//     },
//     [],
//     async (persister) => {
//       console.log('Persister loaded, starting auto-save...');
//       await persister.load();
//       await persister.startAutoSave();
//       console.log('Auto-save started');
//     }
//   );

//   useCreateSynchronizer(store, async (store) => {
//     try {
//       setSyncStatus('connecting');
//       const serverUrl = getServerUrl();
//       console.log(`Connecting to sync server: ${serverUrl}`);

//       const ws = new WebSocket(serverUrl);

//       // Add event listeners to the WebSocket for better debugging
//       ws.onopen = () => {
//         console.log('WebSocket connection established');
//         setSyncStatus('connected');
//       };

//       ws.onerror = (error) => {
//         console.error('WebSocket error:', error);
//         setSyncStatus('error');
//       };

//       ws.onclose = (event) => {
//         console.log('WebSocket connection closed:', event.code, event.reason);
//         setSyncStatus('disconnected');
//       };

//       const sync = await createWsSynchronizer(store, ws);
//       console.log('Synchronizer created, starting sync...');

//       await sync.startSync();
//       console.log('Sync started successfully');
//       setSyncStatus('syncing');

//       return sync;
//     } catch (error) {
//       console.error('Failed to start sync:', error);
//       setSyncStatus('error');
//       return undefined;
//     }
//   });

//   useProvideStore(TABLE_NAME, store);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Task List</Text>
//       <Text style={styles.syncStatus}>Sync Status: {syncStatus}</Text>
//       <TaskList />
//     </View>
//   );
// }

// function getRandomTask() {
//   const tasks = [
//     'Walk the dog',
//     'Read a book',
//     'Do the laundry',
//     'Write a blog post',
//     'Go for a run',
//     'Cook a new recipe',
//     'Learn a new skill',
//     'Organize your workspace',
//     'Call a friend',
//     'Watch a documentary',
//   ];
//   const randomIndex = Math.floor(Math.random() * tasks.length);
//   return tasks[randomIndex];
// }

// const styles = StyleSheet.create((theme, rt) => ({
//   container: {
//     flex: 1,
//     paddingTop: 200,
//     backgroundColor: theme.colors.bg.primary,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '900',
//     textAlign: 'center',
//     color: theme.colors.text.primary,
//     fontFamily: theme.fonts.SourGummyBold,
//     marginBottom: theme.spacing.sm,
//   },
//   syncStatus: {
//     fontSize: 14,
//     color: theme.colors.text.secondary,
//     marginBottom: theme.spacing.md,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   loadingText: {
//     marginTop: 10,
//     color: theme.colors.text.secondary,
//   },
//   button: {
//     backgroundColor: theme.colors.accent.regular,
//     paddingHorizontal: theme.spacing.md,
//     paddingVertical: theme.spacing.sm,
//     borderRadius: theme.radius.md,
//     marginBottom: theme.spacing.md,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   taskRow: {
//     flexDirection: 'row',
//     backgroundColor: theme.colors.bg.secondary,
//     padding: theme.spacing.sm,
//     borderRadius: theme.radius.md,
//     width: '90%',
//     gap: theme.spacing.md,
//   },
//   taskText: {
//     color: theme.colors.text.primary,
//   },
// }));
