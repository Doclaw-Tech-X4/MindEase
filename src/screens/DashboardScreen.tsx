import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { DashboardScreenProps, Task, Email, CalendarEvent } from '../types';
import { Button, TaskCard, Card } from '../components';
import { colors, spacing, typography, shadows } from '../constants/colors';

const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Morning Meditation',
      description: 'Start your day with 10 minutes of mindfulness',
      dueDate: 'Today, 8:00 AM',
      priority: 'high',
      completed: false,
    },
    {
      id: '2',
      title: 'Gratitude Journal',
      description: 'Write down three things you are grateful for',
      dueDate: 'Today, 12:00 PM',
      priority: 'medium',
      completed: false,
    },
    {
      id: '3',
      title: 'Evening Walk',
      description: 'Take a 30-minute walk to clear your mind',
      dueDate: 'Today, 6:00 PM',
      priority: 'low',
      completed: false,
    },
  ]);

  const [emails] = useState<Email[]>([
    {
      id: '1',
      from: 'John Doe',
      fromEmail: 'john@example.com',
      to: 'me@example.com',
      subject: 'Project Update - Q1 Goals',
      body: 'Team progress update on Q1 goals...',
      date: '2 hours ago',
      isRead: false,
      isImportant: true,
      category: 'primary',
    },
    {
      id: '2',
      from: 'LinkedIn',
      fromEmail: 'notifications@linkedin.com',
      to: 'me@example.com',
      subject: 'You have 5 new profile views',
      body: 'Your profile is getting noticed...',
      date: '4 hours ago',
      isRead: true,
      isImportant: false,
      category: 'social',
    },
  ]);

  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly team sync',
      startTime: '2026-01-30T09:00:00',
      endTime: '2026-01-30T10:00:00',
      location: 'Conference Room A',
      isAllDay: false,
      category: 'work',
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
  const unreadEmails = emails.filter(email => !email.isRead);
  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.startTime);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  });

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
          <Text style={styles.greeting}>Good Morning!</Text>
          <Text style={styles.subtitle}>Here's your overview for today</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{incompleteTasks.length}</Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{unreadEmails.length}</Text>
            <Text style={styles.statLabel}>Emails</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{todayEvents.length}</Text>
            <Text style={styles.statLabel}>Events</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Productivity</Text>
          </Card>
        </View>

        {/* Today's Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Tasks')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {incompleteTasks.length > 0 ? (
            incompleteTasks.slice(0, 3).map(task => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                dueDate={task.dueDate}
                priority={task.priority}
                completed={task.completed}
                onPress={() => {
                  toggleTaskComplete(task.id);
                  navigation.navigate('Tasks', { screen: 'TaskDetail', params: { taskId: task.id } });
                }}
              />
            ))
          ) : (
            <Card style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No pending tasks!</Text>
            </Card>
          )}
        </View>

        {/* Recent Emails */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Emails</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Email')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {emails.slice(0, 2).map(email => (
            <Card key={email.id} style={styles.emailCard}>
              <TouchableOpacity onPress={() => navigation.navigate('Email', { screen: 'EmailDetail', params: { emailId: email.id } })}>
                <View style={styles.emailHeader}>
                  <Text style={styles.emailFrom}>{email.from}</Text>
                  <Text style={styles.emailTime}>{email.date}</Text>
                </View>
                <Text style={styles.emailSubject}>{email.subject}</Text>
                <Text style={styles.emailPreview} numberOfLines={1}>{email.body}</Text>
              </TouchableOpacity>
            </Card>
          ))}
        </View>

        {/* Today's Events */}
        {todayEvents.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Events</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            {todayEvents.map(event => (
              <Card key={event.id} style={styles.eventCard}>
                <TouchableOpacity onPress={() => navigation.navigate('Calendar', { screen: 'EventDetail', params: { eventId: event.id } })}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventTime}>
                    {new Date(event.startTime).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </Text>
                  {event.location && (
                    <Text style={styles.eventLocation}>📍 {event.location}</Text>
                  )}
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <Button
              title="📧 Summarize Emails"
              onPress={() => navigation.navigate('Email')}
              variant="outline"
              style={styles.quickActionButton}
            />
            <Button
              title="📊 View Analytics"
              onPress={() => navigation.navigate('Analytics')}
              variant="outline"
              style={styles.quickActionButton}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

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
  greeting: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
  },
  seeAll: {
    ...typography.body2,
    color: colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  emptyStateText: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emailCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  emailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  emailFrom: {
    ...typography.body2,
    color: colors.text,
    fontWeight: '500',
  },
  emailTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  emailSubject: {
    ...typography.body2,
    color: colors.text,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  emailPreview: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  eventCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  eventTitle: {
    ...typography.body2,
    color: colors.text,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  eventTime: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  eventLocation: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quickActionButton: {
    flex: 1,
  },
});
