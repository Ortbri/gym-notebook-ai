import Ionicons from '@expo/vector-icons/Ionicons';
import { eq } from 'drizzle-orm';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import * as ContextMenu from 'zeego/context-menu';

import Fab from '~/components/ui/Fab';
import { projects } from '~/db/schema';

const Statistics = () => {
  const isPro = false;

  const router = useRouter();
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const { data } = useLiveQuery(drizzleDb.select().from(projects), []);

  const onDeleteProject = async function (id: number) {
    await drizzleDb.delete(projects).where(eq(projects.id, id));
  };

  const onNewProject = async function () {
    if (data?.length >= 5 && isPro) {
      // go prod
    } else {
      router.push('/(main)/(tabs)/statistics/newProj');
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Projects</Text>
        <TouchableOpacity style={styles.addButton} onPress={onNewProject}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Animated.FlatList
        itemLayoutAnimation={LinearTransition.springify()}
        contentInsetAdjustmentBehavior="automatic"
        data={data}
        style={{}}
        // contentContainerStyle={styles.flatListContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <TouchableOpacity style={styles.projectCard}>
                <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                <View style={styles.projectInfo}>
                  <Text style={styles.projectName}>{item.name}</Text>
                  <Text style={styles.projectMeta}>0 tasks</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Item key="edit">
                <ContextMenu.ItemTitle>Edit Project</ContextMenu.ItemTitle>
              </ContextMenu.Item>
              <ContextMenu.Item key="delete" destructive onSelect={() => onDeleteProject(item.id)}>
                <ContextMenu.ItemTitle>Delete Project</ContextMenu.ItemTitle>
              </ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Arrow />
            </ContextMenu.Content>
          </ContextMenu.Root>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* <Fab onPress={onNewProject} /> */}
    </>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    // flex: 1,
    // backgroundColor: theme.colors.bg.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: theme.colors.bg.secondary,
    // marginBottom: 16,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.accent.regular,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexGrow: 1,
  },
  projectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: theme.colors.bg.secondary,
    borderRadius: 12,
    marginBottom: 12,
  },
  colorIndicator: {
    width: 2,
    height: 40,
    marginRight: 14,
    borderRadius: 40,
    // borderRadius: 12,
    // marginRight: 12,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  projectMeta: {
    fontSize: 13,
    color: theme.colors.text.secondary,
  },
  separator: {
    // height: 8,
  },
}));

export default Statistics;
