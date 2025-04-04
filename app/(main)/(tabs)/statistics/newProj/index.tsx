import React from 'react';
import { View, Text } from 'react-native';

export default function index() {
  return (
    <View>
      <Text>index</Text>
    </View>
  );
}
// import { Ionicons } from '@expo/vector-icons';
// import { useHeaderHeight } from '@react-navigation/elements';
// import { drizzle } from 'drizzle-orm/expo-sqlite';
// import { Link, useRouter, useGlobalSearchParams, Stack } from 'expo-router';
// import { useSQLiteContext } from 'expo-sqlite';
// import { useState, useEffect } from 'react';
// import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// import { projects } from '~/db/schema';

// export const PROJECT_COLORS = [
//   '#0079bf',
//   '#d29034',
//   '#519839',
//   '#b04632',
//   '#89609e',
//   '#cd5a91',
//   '#4bbf6b',
//   '#00aecc',
//   '#838c91',
// ];

// const Page = () => {
//   const [projectName, setProjectName] = useState('');
//   const router = useRouter();
//   const { bg } = useGlobalSearchParams<{ bg?: string }>();
//   const [selectedColor, setSelectedColor] = useState<string>('#000000');
//   const headerHeight = useHeaderHeight();
//   const db = useSQLiteContext();
//   const drizzleDb = drizzle(db);

//   useEffect(() => {
//     if (bg) {
//       setSelectedColor(bg);
//     }
//   }, [bg]);

//   const onCreateProject = async () => {
//     await drizzleDb.insert(projects).values({
//       name: projectName,
//       color: selectedColor,
//     });
//     router.dismiss();
//   };

//   return (
//     <View style={{ marginTop: headerHeight }}>
//       <Stack.Screen
//         options={{
//           headerRight: () => (
//             <TouchableOpacity onPress={onCreateProject} disabled={projectName === ''}>
//               <Text style={projectName === '' ? styles.btnTextDisabled : styles.btnText}>
//                 Create
//               </Text>
//             </TouchableOpacity>
//           ),
//         }}
//       />

//       <View style={styles.container}>
//         <TextInput
//           style={styles.input}
//           value={projectName}
//           onChangeText={setProjectName}
//           placeholder="Name"
//           autoFocus
//         />

//         <Link href="/(main)/(tabs)/statistics/newProj/color-select" asChild>
//           <TouchableOpacity style={styles.btnItem}>
//             <Ionicons name="color-palette-outline" size={24} color="#000" />
//             <Text style={styles.btnItemText}>Color</Text>
//             <View style={[styles.colorPreview, { backgroundColor: selectedColor }]} />
//             <Ionicons name="chevron-forward" size={22} color="#000" />
//           </TouchableOpacity>
//         </Link>
//       </View>
//     </View>
//   );
// };
// export default Page;

// const styles = StyleSheet.create({
//   btnTextDisabled: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#A9A9A9', // Assuming a disabled color
//   },
//   btnText: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#000', // Assuming a primary text color
//   },
//   container: {
//     marginHorizontal: 20,
//     backgroundColor: '#FFFFFF', // Assuming a secondary background color
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   input: {
//     borderTopWidth: StyleSheet.hairlineWidth,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderColor: '#CCCCCC', // Assuming a border color
//     padding: 12,
//     paddingHorizontal: 12,
//     fontSize: 16,
//   },
//   btnItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     backgroundColor: '#FFFFFF', // Assuming a secondary background color
//     borderBottomLeftRadius: 12,
//     borderBottomRightRadius: 12,
//   },
//   btnItemText: {
//     fontSize: 16,
//     flex: 1,
//     fontWeight: '500',
//   },
//   colorPreview: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//   },
// });
