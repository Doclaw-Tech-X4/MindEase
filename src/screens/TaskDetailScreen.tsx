import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TaskDetailScreenProps } from '../types';
import { Button, Card } from '../components';
import { colors, spacing, typography, borderRadius } from '../constants/colors';

const TaskDetailScreen = ({ navigation }: TaskDetailScreenProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const task = {
    id: '1',
    title: 'Morning Meditation',
    description: 'Start your day with 10 minutes of mindfulness meditation. Find a quiet space, sit comfortably, and focus on your breathing. This practice helps reduce stress and improve mental clarity throughout the day.',
    dueDate: 'Today, 8:00 AM',
    priority: 'high',
    category: 'Mindfulness',
    estimatedTime: '10 minutes',
    createdAt: 'January 28, 2026',
  };

  const handleMarkComplete = () => {
    setLoading(true);
    setTimeout(() => {
      setIsCompleted(!isCompleted);
      setLoading(false);
      navigation.goBack();
    }, 1500);
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.success;
      default:
        return colors.gray;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{task.title}</Text>
          <View style={styles.headerMeta}>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor() }]}>
              <Text style={styles.priorityText}>{task.priority.toUpperCase()}</Text>
            </View>
            <Text style={styles.category}>{task.category}</Text>
          </View>
        </View>

        <Card style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{task.description}</Text>
        </Card>

        <View style={styles.detailsGrid}>
          <Card style={styles.detailCard}>
            <Text style={styles.detailLabel}>Due Date</Text>
            <Text style={styles.detailValue}>{task.dueDate}</Text>
          </Card>

          <Card style={styles.detailCard}>
            <Text style={styles.detailLabel}>Estimated Time</Text>
            <Text style={styles.detailValue}>{task.estimatedTime}</Text>
          </Card>
        </View>

        <Card style={styles.progressCard}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: isCompleted ? '100%' : '30%' }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {isCompleted ? 'Completed' : 'In Progress'}
            </Text>
          </View>
        </Card>

        <Card style={styles.notesCard}>
          <Text style={styles.sectionTitle}>Notes & Tips</Text>
          <Text style={styles.note}>• Find a quiet and comfortable space</Text>
          <Text style={styles.note}>• Set a timer for 10 minutes</Text>
          <Text style={styles.note}>• Focus on your breathing pattern</Text>
          <Text style={styles.note}>• Don't worry if your mind wanders</Text>
        </Card>

        <View style={styles.actions}>
          <Button
            title={isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
            onPress={handleMarkComplete}
            loading={loading}
            style={[
              styles.completeButton,
              isCompleted && styles.incompleteButton,
            ]}
          />
          <Button
            title="Edit Task"
            onPress={() => navigation.navigate('AddTask')}
            variant="outline"
            style={styles.editButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TaskDetailScreen;

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
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  headerMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  priorityText: {
    ...typography.caption,
    color: colors.textLight,
    fontWeight: '600',
  },
  category: {
    ...typography.caption,
    color: colors.textSecondary,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  descriptionCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body1,
    color: colors.text,
    lineHeight: 24,
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  detailCard: {
    flex: 1,
    padding: spacing.md,
    alignItems: 'center',
  },
  detailLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  detailValue: {
    ...typography.body2,
    color: colors.text,
    fontWeight: '600',
  },
  progressCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.round,
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
  },
  progressText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  notesCard: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  note: {
    ...typography.body2,
    color: colors.text,
    marginBottom: spacing.sm,
    paddingLeft: spacing.sm,
  },
  actions: {
    gap: spacing.sm,
  },
  completeButton: {
    backgroundColor: colors.success,
  },
  incompleteButton: {
    backgroundColor: colors.warning,
  },
  editButton: {
    marginBottom: spacing.xl,
  },
});
