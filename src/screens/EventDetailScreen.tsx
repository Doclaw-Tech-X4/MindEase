import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { EventDetailScreenProps, CalendarEvent } from '../types';
import { Button, Card } from '../components';
import { colors, spacing, typography } from '../constants/colors';

const EventDetailScreen = ({ route, navigation }: EventDetailScreenProps) => {
  const { eventId } = route.params;

  // Mock event data
  const event: CalendarEvent = {
    id: eventId,
    title: 'Team Meeting',
    description: 'Weekly team sync to discuss project progress, upcoming deadlines, and resource allocation. We will review the current sprint status and plan for the next iteration.',
    startTime: new Date('2026-01-30T09:00:00'),
    endTime: new Date('2026-01-30T10:00:00'),
    location: 'Conference Room A',
    isAllDay: false,
    category: 'work',
    attendees: ['john@example.com', 'sarah@example.com', 'mike@example.com'],
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'work': return colors.primary;
      case 'personal': return colors.success;
      case 'health': return colors.warning;
      case 'other': return colors.gray;
      default: return colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Event Header */}
        <Card style={styles.headerCard}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(event.category) }]}>
              <Text style={styles.categoryText}>{event.category}</Text>
            </View>
          </View>

          <Text style={styles.eventTime}>
            {event.isAllDay ? 'All Day' : formatDateTime(event.startTime)}
          </Text>

          {!event.isAllDay && (
            <Text style={styles.endTime}>
              Ends: {formatDateTime(event.endTime)}
            </Text>
          )}
        </Card>

        {/* Event Details */}
        <Card style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Details</Text>

          {event.description && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Description:</Text>
              <Text style={styles.detailValue}>{event.description}</Text>
            </View>
          )}

          {event.location && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location:</Text>
              <Text style={styles.detailValue}>📍 {event.location}</Text>
            </View>
          )}

          {event.attendees && event.attendees.length > 0 && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Attendees:</Text>
              <View style={styles.attendeesList}>
                {event.attendees.map((attendee, index) => (
                  <Text key={index} style={styles.attendeeEmail}>
                    👤 {attendee}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="Edit Event"
            onPress={() => navigation.navigate('AddEvent')}
            variant="outline"
            style={styles.actionButton}
          />
          <Button
            title="Delete Event"
            onPress={() => {
              // Handle delete
              navigation.goBack();
            }}
            variant="outline"
            style={StyleSheet.flatten([styles.actionButton, styles.deleteButton])}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },
  headerCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  eventTitle: {
    ...typography.h2,
    color: colors.text,
    flex: 1,
    marginRight: spacing.md,
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  categoryText: {
    ...typography.caption,
    color: colors.textLight,
    fontWeight: '500',
  },
  eventTime: {
    ...typography.body1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  endTime: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  detailsCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  detailRow: {
    marginBottom: spacing.md,
  },
  detailLabel: {
    ...typography.body2,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  detailValue: {
    ...typography.body1,
    color: colors.text,
    lineHeight: 22,
  },
  attendeesList: {
    marginTop: spacing.xs,
  },
  attendeeEmail: {
    ...typography.body2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  actions: {
    marginBottom: spacing.xl,
  },
  actionButton: {
    marginBottom: spacing.sm,
  },
  deleteButton: {
    borderColor: colors.error,
  },
});
