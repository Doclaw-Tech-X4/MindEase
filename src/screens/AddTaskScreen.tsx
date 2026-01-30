import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { AddTaskScreenProps } from '../types';
import { Button, Input, Card } from '../components';
import { colors, spacing, typography } from '../constants/colors';

const AddTaskScreen = ({ navigation }: AddTaskScreenProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveTask = () => {
    if (validateForm()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigation.goBack();
      }, 1500);
    }
  };

  const priorityOptions: { label: string; value: 'low' | 'medium' | 'high'; color: string }[] = [
    { label: 'Low', value: 'low', color: colors.success },
    { label: 'Medium', value: 'medium', color: colors.warning },
    { label: 'High', value: 'high', color: colors.error },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Create New Task</Text>
          <Text style={styles.subtitle}>Add a new task to your wellness journey</Text>

          <Card style={styles.form}>
            <Input
              label="Task Title"
              placeholder="Enter task title"
              value={title}
              onChangeText={setTitle}
              error={errors.title}
            />

            <Input
              label="Description"
              placeholder="Describe your task in detail"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              error={errors.description}
            />

            <Input
              label="Due Date & Time"
              placeholder="e.g., Tomorrow at 10:00 AM"
              value={dueDate}
              onChangeText={setDueDate}
            />

            <View style={styles.prioritySection}>
              <Text style={styles.priorityLabel}>Priority Level</Text>
              <View style={styles.priorityOptions}>
                {priorityOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.priorityOption,
                      priority === option.value && {
                        backgroundColor: option.color,
                        borderColor: option.color,
                      },
                    ]}
                    onPress={() => setPriority(option.value)}
                  >
                    <Text style={[
                      styles.priorityOptionText,
                      priority === option.value && styles.priorityOptionTextSelected,
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Card>

          <View style={styles.actions}>
            <Button
              title="Cancel"
              onPress={() => navigation.goBack()}
              variant="outline"
              style={styles.cancelButton}
            />
            <Button
              title="Save Task"
              onPress={handleSaveTask}
              loading={loading}
              style={styles.saveButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  form: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  prioritySection: {
    marginTop: spacing.md,
  },
  priorityLabel: {
    ...typography.body2,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: '500',
  },
  priorityOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityOption: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginHorizontal: spacing.xs,
  },
  priorityOptionText: {
    ...typography.body2,
    color: colors.text,
  },
  priorityOptionTextSelected: {
    color: colors.textLight,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 2,
  },
});
