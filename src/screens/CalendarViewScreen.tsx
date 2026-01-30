import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { CalendarViewScreenProps, CalendarEvent } from '../types';
import { Button, Card } from '../components';
import { colors, spacing, typography } from '../constants/colors';

const CalendarViewScreen = ({ navigation }: CalendarViewScreenProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly team sync to discuss project progress',
      startTime: '2026-01-30T09:00:00',
      endTime: '2026-01-30T10:00:00',
      location: 'Conference Room A',
      isAllDay: false,
      category: 'work',
      attendees: ['john@example.com', 'sarah@example.com'],
    },
    {
      id: '2',
      title: 'Lunch with Client',
      description: 'Discuss new project requirements',
      startTime: '2026-01-30T12:30:00',
      endTime: '2026-01-30T14:00:00',
      location: 'Downtown Restaurant',
      isAllDay: false,
      category: 'work',
      attendees: ['client@company.com'],
    },
    {
      id: '3',
      title: 'Gym Session',
      description: 'Evening workout routine',
      startTime: '2026-01-30T18:00:00',
      endTime: '2026-01-30T19:00:00',
      location: 'Fitness Center',
      isAllDay: false,
      category: 'health',
    },
    {
      id: '4',
      title: 'Project Deadline',
      description: 'Submit final project deliverables',
      startTime: '2026-01-31T23:59:00',
      endTime: '2026-01-31T23:59:00',
      isAllDay: true,
      category: 'work',
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
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

  const todayEvents = getEventsForDate(selectedDate);
  const upcomingEvents = events.filter(event => new Date(event.startTime) > new Date());

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
          <Text style={styles.title}>Calendar</Text>
          <Text style={styles.currentDate}>{formatDate(selectedDate)}</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{todayEvents.length}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{upcomingEvents.length}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{events.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </Card>
        </View>

        {/* Today's Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          {todayEvents.length > 0 ? (
            todayEvents.map(event => (
              <Card key={event.id} style={styles.eventCard}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
                >
                  <View style={styles.eventHeader}>
                    <View style={styles.eventTime}>
                      <Text style={styles.timeText}>
                        {event.isAllDay ? 'All Day' : formatTime(event.startTime)}
                      </Text>
                      {!event.isAllDay && (
                        <Text style={styles.timeText}>→ {formatTime(event.endTime)}</Text>
                      )}
                    </View>
                    <View style={[
                      styles.categoryIndicator,
                      { backgroundColor: getCategoryColor(event.category) }
                    ]} />
                  </View>
                  
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  
                  {event.description && (
                    <Text style={styles.eventDescription}>{event.description}</Text>
                  )}
                  
                  {event.location && (
                    <Text style={styles.eventLocation}>📍 {event.location}</Text>
                  )}
                  
                  {event.attendees && event.attendees.length > 0 && (
                    <Text style={styles.eventAttendees}>
                      👥 {event.attendees.length} attendees
                    </Text>
                  )}
                </TouchableOpacity>
              </Card>
            ))
          ) : (
            <Card style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No events today</Text>
              <Text style={styles.emptyStateSubtext}>Enjoy your free day!</Text>
            </Card>
          )}
        </View>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            {upcomingEvents.slice(0, 3).map(event => (
              <Card key={event.id} style={styles.upcomingEventCard}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
                >
                  <View style={styles.upcomingEventHeader}>
                    <Text style={styles.upcomingEventTitle}>{event.title}</Text>
                    <Text style={styles.upcomingEventDate}>
                      {new Date(event.startTime).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text style={styles.upcomingEventTime}>
                    {event.isAllDay ? 'All Day' : formatTime(event.startTime)}
                  </Text>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.fab}>
        <Button
          title="Add Event"
          onPress={() => navigation.navigate('AddEvent')}
        />
      </View>
    </View>
  );
};

export default CalendarViewScreen;

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
  currentDate: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    marginHorizontal: spacing.xs,
  },
  statNumber: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  eventCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  eventTime: {
    flex: 1,
  },
  timeText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  categoryIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  eventTitle: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  eventDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  eventLocation: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  eventAttendees: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  upcomingEventCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  upcomingEventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  upcomingEventTitle: {
    ...typography.body2,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
  },
  upcomingEventDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  upcomingEventTime: {
    ...typography.caption,
    color: colors.textSecondary,
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
