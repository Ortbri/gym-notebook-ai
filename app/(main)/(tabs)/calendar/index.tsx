import * as Sentry from '@sentry/react-native';
import { format } from 'date-fns';
import { eq } from 'drizzle-orm';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useSQLiteContext } from 'expo-sqlite';
import { useState, useEffect } from 'react';
import { Text, RefreshControl, View, SectionList } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import TaskRow from '~/components/TaskRow';
import Button from '~/components/ui/Button';
import Fab from '~/components/ui/Fab';
import { projects, todos } from '~/db/schema';
import { Todo } from '~/types/interfaces';

interface Section {
  title: string;
  data: Todo[];
}

const Page = () => {
  const db = useSQLiteContext();
  useDrizzleStudio(db);
  const today = format(new Date(), 'd MMM · eee');
  const [refreshing, setRefreshing] = useState(false);
  const drizzleDb = drizzle(db);
  const [sectionListData, setSectionListData] = useState<Section[]>([]);
  const { data } = useLiveQuery(
    drizzleDb
      .select()
      .from(todos)
      .leftJoin(projects, eq(todos.project_id, projects.id))
      .where(eq(todos.completed, 0))
  );

  useEffect(() => {
    const formatedData = data?.map((item) => ({
      ...item.todos,
      project_name: item.projects?.name,
      project_color: item.projects?.color,
    }));

    // Group tasks by day
    const groupedByDay = formatedData?.reduce((acc: { [key: string]: Todo[] }, task) => {
      const day = format(new Date(task.due_date || new Date()), 'd MMM · eee');
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(task);
      return acc;
    }, {});

    // Convert grouped data to sections array
    const listData: Section[] = Object.entries(groupedByDay || {}).map(([day, tasks]) => ({
      title: day,
      data: tasks,
    }));

    // Sort sections by date
    listData.sort((a, b) => {
      const dateA = new Date(a.data[0].due_date || new Date());
      const dateB = new Date(b.data[0].due_date || new Date());
      return dateA.getTime() - dateB.getTime();
    });

    setSectionListData(listData);
  }, [data]);

  const loadTasks = async () => {
    const tasks = await db.getAllAsync<Todo>(`
      SELECT todos.*, projects.name as project_name
      FROM todos
      LEFT JOIN projects ON todos.project_id = projects.id
      WHERE todos.completed = 0
    `);
    if (tasks) {
      const listData = [{ title: today, data: tasks }];
      setSectionListData(listData);
    }
    setRefreshing(false);
  };

  const testError = () => {
    // throw new Error('Test error');
    Sentry.captureException(new Error('Test error'));
  };
  return (
    <>
      <View style={styles.wrapper} />
      <SectionList
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        sections={sectionListData}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.headerText}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => <TaskRow task={item} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadTasks} />}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.btnContainer}>
        <Button
          onPress={() => {
            Sentry.captureMessage('Hello from Sentry');
          }}>
          <Text>Click me</Text>
        </Button>
        <Button onPress={testError}>
          <Text>Click me</Text>
        </Button>
      </View>

      <Fab />
    </>
  );
};
export default Page;

const styles = StyleSheet.create((theme, rt) => ({
  wrapper: {
    height: rt.insets.top + 30,
  },
  container: {
    flex: 1,
  },
  sectionHeader: {
    backgroundColor: theme.colors.bg.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border.light,
  },
  headerText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contentContainer: {
    paddingBottom: rt.insets.bottom + 100,
    gap: 14,
  },
  btnContainer: {
    marginBottom: rt.insets.bottom + 50,
  },
}));
