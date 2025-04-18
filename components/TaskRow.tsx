import React from 'react';
import { View, Text } from 'react-native';

export default function TaskRow() {
  return (
    <View>
      <Text>TaskRow</Text>
    </View>
  );
}
// import { eq } from 'drizzle-orm';
// import { drizzle } from 'drizzle-orm/expo-sqlite';
// import { Link } from 'expo-router';
// import { useSQLiteContext } from 'expo-sqlite';
// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { StyleSheet } from 'react-native-unistyles';

// import { todos } from '~/db/schema';
// import { Todo } from '~/types/interfaces';

// interface TaskRowProps {
//   task: Todo;
// }

// const TaskRow = ({ task }: TaskRowProps) => {
//   const db = useSQLiteContext();
//   const drizzleDb = drizzle(db);
//   const markAsCompleted = async () => {
//     //   heightAnim.value = withTiming(0, {
//     //     duration: 300,
//     //     easing: Easing.inOut(Easing.ease),
//     //   });
//     //   opacityAnim.value = withTiming(0, {
//     //     duration: 300,
//     //     easing: Easing.inOut(Easing.ease),
//     //   });

//     // Wait for animation to complete before updating DB
//     await new Promise((resolve) => setTimeout(resolve, 300));

//     // await db.runAsync(
//     //   'UPDATE todos SET completed = ?, date_completed = ? WHERE id = ?',
//     //   1,
//     //   Date.now(),
//     //   task.id
//     // );

//     await drizzleDb
//       .update(todos)
//       .set({ completed: 1, date_completed: Date.now() })
//       .where(eq(todos.id, task.id));
//   };
//   return (
//     <View style={styles.wrapper}>
//       <Link href={`/(main)/chat/${task.id}`} asChild>
//         <TouchableOpacity style={styles.container} onLongPress={markAsCompleted}>
//           <View
//             style={[styles.projectIndicator, { backgroundColor: task.project_color || '#ddd' }]}
//           />
//           <View style={styles.content}>
//             <Text style={styles.title}>{task.name}</Text>
//             {task.description && <Text style={styles.description}>{task.description}</Text>}
//             {task.project_name && <Text style={styles.projectName}>{task.project_name}</Text>}
//           </View>
//         </TouchableOpacity>
//       </Link>
//     </View>
//   );
// };

// const styles = StyleSheet.create((theme) => ({
//   wrapper: {
//     paddingHorizontal: 16,
//   },
//   container: {
//     flexDirection: 'row',
//     backgroundColor: theme.colors.bg.secondary,
//     borderRadius: 12,
//     padding: 12,
//   },
//   projectIndicator: {
//     width: 4,
//     borderRadius: 2,
//     marginRight: 12,
//   },
//   content: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: theme.colors.text.primary,
//     marginBottom: 4,
//   },
//   description: {
//     fontSize: 14,
//     color: theme.colors.text.secondary,
//     marginBottom: 6,
//   },
//   projectName: {
//     fontSize: 12,
//     color: theme.colors.text.tertiary,
//     fontWeight: '500',
//   },
// }));

// export default TaskRow;
