import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { CalendarViewScreenProps, CalendarEvent } from '../types';
import { Button, Card } from '../components';
import { colors, spacing, typography } from '../constants/colors';
import calendarService from '../services/calendarService';
import { Calendar } from 'react-native-calendars';

const CalendarViewScreen = ({ navigation }: CalendarViewScreenProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [userLocation, setUserLocation] = useState<any>(null);
  const [markedDates, setMarkedDates] = useState<any>({});

  useEffect(() => {
    initializeCalendar();
  }, []);

  const initializeCalendar = async () => {
    try {
      // Get user location
      const location = await calendarService.getCurrentLocation();
      setUserLocation(location);

      // Load calendar events
      await loadCalendarEvents();
    } catch (error) {
      console.error('Error initializing calendar:', error);
    }
  };

  const loadCalendarEvents = async () => {
    try {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);

      const calendarEvents = await calendarService.getEvents(startOfMonth, endOfMonth);
      setEvents(calendarEvents);

      // Mark dates with events
      const marked: any = {};
      calendarEvents.forEach(event => {
        const dateStr = new Date(event.startTime).toISOString().split('T')[0];
        marked[dateStr] = {
          marked: true,
          dotColor: getCategoryColor(event.category),
        };
      });
      setMarkedDates(marked);
    } catch (error) {
      console.error('Error loading calendar events:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadCalendarEvents();
    } catch (error) {
      console.error('Error refreshing calendar:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const formatTime = (date: Date) => {
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
          <Text style={styles.currentDate}>
            {userLocation ?
              `${userLocation.city || 'Current Location'} (${userLocation.timezone})` :
              formatDate(selectedDate)
            }
          </Text>
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

        {/* Calendar View */}
        <View style={styles.calendarSection}>
          <Text style={styles.sectionTitle}>Calendar</Text>
          <Card style={styles.calendarCard}>
            <Calendar
              current={selectedDate.toISOString().split('T')[0]}
              onDayPress={(day) => setSelectedDate(new Date(day.timestamp))}
              markedDates={markedDates}
              theme={{
                backgroundColor: colors.background,
                calendarBackground: colors.background,
                textSectionTitleColor: colors.text,
                selectedDayBackgroundColor: colors.primary,
                selectedDayTextColor: colors.white,
                todayTextColor: colors.primary,
                dayTextColor: colors.text,
                textDisabledColor: colors.textSecondary,
                arrowColor: colors.primary,
                monthTextColor: colors.text,
                indicatorColor: colors.primary,
              }}
            />
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
  calendarSection: {
    marginBottom: spacing.lg,
  },
  calendarCard: {
    padding: spacing.sm,
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
