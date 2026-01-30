import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { EmailDetailScreenProps, Email } from '../types';
import { Button, Card } from '../components';
import { colors, spacing, typography } from '../constants/colors';

const EmailDetailScreen = ({ route, navigation }: EmailDetailScreenProps) => {
  const { emailId } = route.params;
  const [loading, setLoading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  // Mock email data - in real app, this would come from API
  const email: Email = {
    id: emailId,
    from: 'John Doe',
    fromEmail: 'john@example.com',
    to: 'me@example.com',
    subject: 'Project Update - Q1 Goals',
    body: `Hi team,

I wanted to share our progress on the Q1 goals and discuss the next steps for our project. 

Key accomplishments this quarter:
- Completed user authentication system
- Launched beta version of mobile app
- Onboarded 100+ beta testers
- Fixed critical performance issues

Upcoming priorities:
- Finalize payment integration
- Complete user dashboard
- Prepare for public launch
- Scale infrastructure

Please review the attached documents and let me know your thoughts on our timeline. I'd like to schedule a meeting next week to discuss the launch strategy.

Best regards,
John

---
This email contains confidential information. Please do not forward without permission.`,
    date: '2 hours ago',
    isRead: true,
    isImportant: true,
    category: 'primary',
  };

  const handleSummarizeEmail = async () => {
    setSummarizing(true);
    try {
      // Simulate OpenAI API call
      setTimeout(() => {
        const mockSummary = `This email from John Doe provides a comprehensive Q1 project update highlighting:
        
✅ Key Accomplishments:
- User authentication system completed
- Mobile app beta launched with 100+ testers
- Performance issues resolved

🎯 Upcoming Priorities:
- Payment integration finalization
- User dashboard completion
- Public launch preparation
- Infrastructure scaling

📅 Next Steps:
- Review attached documents
- Schedule meeting for launch strategy discussion

This is an important project update requiring your review and input on the timeline.`;

        setSummary(mockSummary);
        setSummarizing(false);
      }, 2000);
    } catch (error) {
      setSummarizing(false);
      Alert.alert('Error', 'Failed to summarize email. Please try again.');
    }
  };

  const handleReply = () => {
    Alert.alert('Reply', 'Compose feature coming soon!');
  };

  const handleForward = () => {
    Alert.alert('Forward', 'Forward feature coming soon!');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Email',
      'Are you sure you want to delete this email?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => navigation.goBack()
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Email Header */}
        <Card style={styles.headerCard}>
          <View style={styles.senderInfo}>
            <View style={styles.senderDetails}>
              <Text style={styles.senderName}>{email.from}</Text>
              <Text style={styles.senderEmail}>{email.fromEmail}</Text>
            </View>
            <Text style={styles.emailDate}>{email.date}</Text>
          </View>

          <Text style={styles.subject}>{email.subject}</Text>

          <View style={styles.emailBadges}>
            {email.isImportant && (
              <View style={styles.importantBadge}>
                <Text style={styles.badgeText}>Important</Text>
              </View>
            )}
            <View style={styles.categoryBadge}>
              <Text style={styles.badgeText}>{email.category}</Text>
            </View>
          </View>
        </Card>

        {/* AI Summary Section */}
        {summary && (
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>🤖 AI Summary</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </Card>
        )}

        {/* Email Body */}
        <Card style={styles.bodyCard}>
          <Text style={styles.bodyText}>{email.body}</Text>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {!summary && (
            <Button
              title="🤖 Summarize with AI"
              onPress={handleSummarizeEmail}
              loading={summarizing}
              variant="outline"
              style={styles.actionButton}
            />
          )}

          <View style={styles.rowActions}>
            <Button
              title="Reply"
              onPress={handleReply}
              variant="outline"
              style={styles.smallButton}
            />
            <Button
              title="Forward"
              onPress={handleForward}
              variant="outline"
              style={styles.smallButton}
            />
            <Button
              title="Delete"
              onPress={handleDelete}
              variant="outline"
              style={{ ...styles.smallButton, ...styles.deleteButton }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EmailDetailScreen;

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
  senderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  senderDetails: {
    flex: 1,
  },
  senderName: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  senderEmail: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  emailDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  subject: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  emailBadges: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  importantBadge: {
    backgroundColor: colors.errorLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  categoryBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  badgeText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '500',
  },
  summaryCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.successLight,
  },
  summaryTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  summaryText: {
    ...typography.body2,
    color: colors.text,
    lineHeight: 22,
  },
  bodyCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  bodyText: {
    ...typography.body1,
    color: colors.text,
    lineHeight: 24,
  },
  actions: {
    marginBottom: spacing.xl,
  },
  actionButton: {
    marginBottom: spacing.md,
  },
  rowActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  smallButton: {
    flex: 1,
  },
  deleteButton: {
    borderColor: colors.error,
  },
});
