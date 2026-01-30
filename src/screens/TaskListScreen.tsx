import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { TaskListScreenProps } from '../types';
import { Button, TaskCard, Card } from '../components';
import { colors, spacing, typography } from '../constants/colors';

const TaskListScreen = ({ navigation }: TaskListScreenProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Morning Meditation',
      description: 'Start your day with 10 minutes of mindfulness',
      dueDate: 'Today, 8:00 AM',
      priority: 'high' as const,
      completed: false,
    },
    {
      id: '2',
      title: 'Gratitude Journal',
      description: 'Write down three things you are grateful for',
      dueDate: 'Today, 12:00 PM',
      priority: 'medium' as const,
      completed: false,
    },
    {
      id: '3',
      title: 'Evening Walk',
      description: 'Take a 30-minute walk to clear your mind',
      dueDate: 'Today, 6:00 PM',
      priority: 'low' as const,
      completed: true,
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>My Tasks</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Routines')}>
            <Text style={styles.routineLink}>View Routines</Text>
          </TouchableOpacity>
        </View>

        {incompleteTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Tasks ({incompleteTasks.length})</Text>
            {incompleteTasks.map(task => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                dueDate={task.dueDate}
                priority={task.priority}
                completed={task.completed}
                onPress={() => {
                  toggleTaskComplete(task.id);
                  navigation.navigate('TaskDetail', { taskId: task.id });
                }}
              />
            ))}
          </View>
        )}

        {completedTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed ({completedTasks.length})</Text>
            {completedTasks.map(task => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                dueDate={task.dueDate}
                priority={task.priority}
                completed={task.completed}
                onPress={() => {
                  toggleTaskComplete(task.id);
                  navigation.navigate('TaskDetail', { taskId: task.id });
                }}
              />
            ))}
          </View>
        )}

        {tasks.length === 0 && (
          <Card style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No tasks yet!</Text>
            <Text style={styles.emptyStateSubtext}>Create your first task to get started</Text>
          </Card>
        )}
      </ScrollView>

      <View style={styles.fab}>
        <Button
          title="Add Task"
          onPress={() => navigation.navigate('AddTask')}
        />
      </View>
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  routineLink: {
    ...typography.body2,
    color: colors.primary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyStateText: {
    ...typography.body1,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.md,
    right: spacing.md,
  },
});
