import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { InboxScreenProps, Email } from '../types';
import { Button, Card } from '../components';
import { colors, spacing, typography } from '../constants/colors';

const InboxScreen = ({ navigation }: InboxScreenProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      from: 'John Doe',
      fromEmail: 'john@example.com',
      to: 'me@example.com',
      subject: 'Project Update - Q1 Goals',
      body: 'Hi team, I wanted to share our progress on the Q1 goals and discuss the next steps for our project...',
      summary: 'Team progress update on Q1 goals with next steps discussion',
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
      body: 'Your profile is getting noticed! See who viewed your profile this week...',
      summary: 'Profile activity notification with viewer insights',
      date: '4 hours ago',
      isRead: true,
      isImportant: false,
      category: 'social',
    },
    {
      id: '3',
      from: 'Amazon',
      fromEmail: 'ship-confirm@amazon.com',
      to: 'me@example.com',
      subject: 'Your order has been shipped',
      body: 'Good news! Your order #123-4567890 has been shipped and is on its way...',
      summary: 'Order shipment confirmation with tracking details',
      date: 'Yesterday',
      isRead: true,
      isImportant: false,
      category: 'updates',
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const markAsRead = (emailId: string) => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === emailId ? { ...email, isRead: true } : email
      )
    );
  };

  const unreadEmails = emails.filter(email => !email.isRead);
  const importantEmails = emails.filter(email => email.isImportant);

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
          <Text style={styles.title}>Inbox</Text>
          <View style={styles.stats}>
            <Text style={styles.statText}>{unreadEmails.length} unread</Text>
            <Text style={styles.statText}>{importantEmails.length} important</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{emails.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{unreadEmails.length}</Text>
            <Text style={styles.statLabel}>Unread</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{importantEmails.length}</Text>
            <Text style={styles.statLabel}>Important</Text>
          </Card>
        </View>

        {/* Email List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Emails</Text>
          {emails.map(email => (
            <Card
              key={email.id}
              style={[
                styles.emailCard,
                !email.isRead && styles.unreadCard,
                email.isImportant && styles.importantCard,
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  markAsRead(email.id);
                  navigation.navigate('EmailDetail', { emailId: email.id });
                }}
              >
                <View style={styles.emailHeader}>
                  <View style={styles.emailInfo}>
                    <Text style={[
                      styles.senderName,
                      !email.isRead && styles.unreadText,
                    ]}>
                      {email.from}
                    </Text>
                    <Text style={styles.emailTime}>{email.date}</Text>
                  </View>
                  <View style={styles.emailBadges}>
                    {email.isImportant && (
                      <View style={styles.importantBadge}>
                        <Text style={styles.badgeText}>!</Text>
                      </View>
                    )}
                    {!email.isRead && (
                      <View style={styles.unreadBadge} />
                    )}
                  </View>
                </View>
                <Text style={[
                  styles.subject,
                  !email.isRead && styles.unreadText,
                ]}>
                  {email.subject}
                </Text>
                <Text style={styles.preview} numberOfLines={2}>
                  {email.summary || email.body}
                </Text>
              </TouchableOpacity>
            </Card>
          ))}
        </View>

        {emails.length === 0 && (
          <Card style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No emails yet!</Text>
            <Text style={styles.emptyStateSubtext}>Connect your email account to get started</Text>
          </Card>
        )}
      </ScrollView>

      <View style={styles.fab}>
        <Button
          title="Compose"
          onPress={() => navigation.navigate('EmailDetail', { emailId: 'compose' })}
        />
      </View>
    </View>
  );
};

export default InboxScreen;

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
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statText: {
    ...typography.caption,
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
  emailCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  unreadCard: {
    backgroundColor: colors.primaryLight,
    opacity: 0.9,
  },
  importantCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  emailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  emailInfo: {
    flex: 1,
  },
  senderName: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '500',
  },
  unreadText: {
    fontWeight: '700',
    color: colors.text,
  },
  emailTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  emailBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  importantBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    ...typography.caption,
    color: colors.textLight,
    fontWeight: 'bold',
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  subject: {
    ...typography.body2,
    color: colors.text,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  preview: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
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
