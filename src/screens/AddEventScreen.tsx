import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { AddEventScreenProps } from '../types';
import { Button, Input } from '../components';
import { colors, spacing, typography } from '../constants/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import calendarService from '../services/calendarService';
import { CalendarEvent } from '../types';

const AddEventScreen = ({ navigation }: AddEventScreenProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<'work' | 'personal' | 'health' | 'other'>('work');
  const [isAllDay, setIsAllDay] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; startTime?: string }>({});
  const [loading, setLoading] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [userLocation, setUserLocation] = useState<any>(null);
  const [suggestedTimes, setSuggestedTimes] = useState<Date[]>([]);

  useEffect(() => {
    initializeLocationAndTime();
  }, []);

  const initializeLocationAndTime = async () => {
    try {
      // Get user's current location and timezone
      const location = await calendarService.getCurrentLocation();
      if (location) {
        setUserLocation(location);

        // Set current local time as default
        const currentTime = calendarService.getCurrentLocalTime(location);
        setStartTime(currentTime);

        // Set end time to 1 hour later
        const endTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
        setEndTime(endTime);

        // Get suggested meeting times
        const suggestions = await calendarService.suggestMeetingTimes(60, location);
        setSuggestedTimes(suggestions);
      }
    } catch (error) {
      console.error('Error initializing location and time:', error);
    }
  };

  const validateForm = () => {
    const newErrors: { title?: string; startTime?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Event title is required';
    }

    if (!isAllDay && !startTime) {
      newErrors.startTime = 'Start time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveEvent = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        // Create calendar event
        const event: CalendarEvent = {
          id: Date.now().toString(),
          title,
          description,
          startTime: isAllDay ? new Date(startTime.setHours(0, 0, 0, 0)) : startTime,
          endTime: isAllDay ? new Date(endTime.setHours(23, 59, 59, 999)) : endTime,
          location,
          isAllDay,
          category,
        };

        // Check for time conflicts
        const hasConflict = await calendarService.checkTimeConflict(event.startTime, event.endTime);
        if (hasConflict) {
          Alert.alert(
            'Time Conflict',
            'This time conflicts with existing events. Do you want to continue?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Continue', onPress: () => saveToCalendar(event) }
            ]
          );
        } else {
          await saveToCalendar(event);
        }
      } catch (error) {
        console.error('Error saving event:', error);
        Alert.alert('Error', 'Failed to save event to calendar');
      } finally {
        setLoading(false);
      }
    }
  };

  const saveToCalendar = async (event: CalendarEvent) => {
    try {
      const success = await calendarService.createEvent(event);
      if (success) {
        Alert.alert('Success', 'Event added to your calendar!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Error', 'Failed to add event to calendar');
      }
    } catch (error) {
      console.error('Error saving to calendar:', error);
      Alert.alert('Error', 'Failed to save event');
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
          <Text style={styles.subtitle}>
            {userLocation ?
              `Local time: ${userLocation.city || 'Current Location'} (${userLocation.timezone})` :
              'Add a new event to your calendar'
            }
          </Text>

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
              <TouchableOpacity
                style={styles.timeInput}
                onPress={() => setShowStartPicker(true)}
                disabled={isAllDay}
              >
                <Text style={styles.timeLabel}>Start Time</Text>
                <Text style={styles.timeValue}>
                  {isAllDay ? 'All day' : calendarService.formatLocalDateTime(startTime, userLocation)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.timeInput}
                onPress={() => setShowEndPicker(true)}
                disabled={isAllDay}
              >
                <Text style={styles.timeLabel}>End Time</Text>
                <Text style={styles.timeValue}>
                  {isAllDay ? 'All day' : calendarService.formatLocalDateTime(endTime, userLocation)}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Suggested Times */}
            {suggestedTimes.length > 0 && (
              <View style={styles.suggestionsSection}>
                <Text style={styles.suggestionsLabel}>Suggested Times</Text>
                <View style={styles.suggestionsList}>
                  {suggestedTimes.slice(0, 3).map((time, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.suggestionItem}
                      onPress={() => {
                        setStartTime(time);
                        const endTime = new Date(time.getTime() + 60 * 60 * 1000);
                        setEndTime(endTime);
                      }}
                    >
                      <Text style={styles.suggestionText}>
                        {calendarService.formatLocalDateTime(time, userLocation)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

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

            <View style={styles.allDaySection}>
              <TouchableOpacity
                style={styles.allDayToggle}
                onPress={() => setIsAllDay(!isAllDay)}
              >
                <View style={[styles.checkbox, isAllDay && styles.checkboxChecked]}>
                  {isAllDay && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.allDayLabel}>All day event</Text>
              </TouchableOpacity>
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

      {/* Date Time Pickers */}
      <DateTimePickerModal
        isVisible={showStartPicker}
        mode="datetime"
        date={startTime}
        onConfirm={(selectedDate) => {
          setShowStartPicker(false);
          if (selectedDate) {
            setStartTime(selectedDate);
            // Auto-adjust end time to be at least 1 hour after start
            if (selectedDate >= endTime) {
              const newEndTime = new Date(selectedDate.getTime() + 60 * 60 * 1000);
              setEndTime(newEndTime);
            }
          }
        }}
        onCancel={() => setShowStartPicker(false)}
      />

      <DateTimePickerModal
        isVisible={showEndPicker}
        mode="datetime"
        date={endTime}
        minimumDate={startTime}
        onConfirm={(selectedDate) => {
          setShowEndPicker(false);
          if (selectedDate) {
            setEndTime(selectedDate);
          }
        }}
        onCancel={() => setShowEndPicker(false)}
      />
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
  timeInput: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  timeLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  timeValue: {
    ...typography.body2,
    color: colors.text,
  },
  suggestionsSection: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  suggestionsLabel: {
    ...typography.body2,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: '500',
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  suggestionItem: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  suggestionText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '500',
  },
  allDaySection: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  allDayToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  allDayLabel: {
    ...typography.body2,
    color: colors.text,
  },
});
