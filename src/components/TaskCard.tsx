import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../constants/colors';

interface TaskCardProps {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  completed?: boolean;
  onPress: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  dueDate,
  priority = 'medium',
  completed = false,
  onPress,
}) => {
  const getPriorityColor = () => {
    switch (priority) {
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
    <TouchableOpacity
      style={[
        styles.card,
        completed && styles.completedCard,
        shadows.sm,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={[styles.title, completed && styles.completedText]}>
          {title}
        </Text>
        <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor() }]} />
      </View>
      
      {description && (
        <Text style={[styles.description, completed && styles.completedText]}>
          {description}
        </Text>
      )}
      
      {dueDate && (
        <Text style={styles.dueDate}>
          Due: {dueDate}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  completedCard: {
    opacity: 0.6,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '600',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  description: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  dueDate: {
    ...typography.caption,
    color: colors.gray,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.round,
  },
});

export default TaskCard;
