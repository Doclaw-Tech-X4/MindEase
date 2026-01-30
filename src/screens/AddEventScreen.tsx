import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AddEventScreenProps } from '../types';
import { Button, Input } from '../components';
import { colors, spacing, typography } from '../constants/colors';

const AddEventScreen = ({ navigation }: AddEventScreenProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<'work' | 'personal' | 'health' | 'other'>('work');
  const [isAllDay, setIsAllDay] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; startTime?: string }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { title?: string; startTime?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Event title is required';
    }

    if (!isAllDay && !startTime.trim()) {
      newErrors.startTime = 'Start time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveEvent = () => {
    if (validateForm()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigation.goBack();
      }, 1500);
    }
  };

  const categories: { label: string; value: 'work' | 'personal' | 'health' | 'other'; color: string }[] = [
    { label: 'Work', value: 'work', color: colors.primary },
    { label: 'Personal', value: 'personal', color: colors.success },
    { label: 'Health', value: 'health', color: colors.warning },
    { label: 'Other', value: 'other', color: colors.gray },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Create Event</Text>
          <Text style={styles.subtitle}>Add a new event to your calendar</Text>

          <View style={styles.form}>
            <Input
              label="Event Title"
              placeholder="Enter event title"
              value={title}
              onChangeText={setTitle}
              error={errors.title}
            />

            <Input
              label="Description"
              placeholder="Event description (optional)"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />

            <View style={styles.timeSection}>
              <Input
                label="Start Time"
                placeholder="e.g., 2026-01-30 09:00 AM"
                value={startTime}
                onChangeText={setStartTime}
                error={errors.startTime}
                disabled={isAllDay}
              />

              <Input
                label="End Time"
                placeholder="e.g., 2026-01-30 10:00 AM"
                value={endTime}
                onChangeText={setEndTime}
                disabled={isAllDay}
              />
            </View>

            <Input
              label="Location"
              placeholder="Event location (optional)"
              value={location}
              onChangeText={setLocation}
            />

            <View style={styles.categorySection}>
              <Text style={styles.categoryLabel}>Category</Text>
              <View style={styles.categoryOptions}>
                {categories.map((cat) => (
                  <Button
                    key={cat.value}
                    title={cat.label}
                    onPress={() => setCategory(cat.value)}
                    variant={category === cat.value ? 'primary' : 'outline'}
                    size="small"
                    style={styles.categoryButton}
                  />
                ))}
              </View>
            </View>

            <View style={styles.actions}>
              <Button
                title="Cancel"
                onPress={() => navigation.goBack()}
                variant="outline"
                style={styles.cancelButton}
              />
              <Button
                title="Save Event"
                onPress={handleSaveEvent}
                loading={loading}
                style={styles.saveButton}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddEventScreen;

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
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: spacing.lg,
  },
  timeSection: {
    marginBottom: spacing.md,
  },
  categorySection: {
    marginTop: spacing.md,
  },
  categoryLabel: {
    ...typography.body2,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: '500',
  },
  categoryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryButton: {
    flex: 1,
    minWidth: 80,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 2,
  },
});
