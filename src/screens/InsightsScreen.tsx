import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { InsightsScreenProps } from '../types';
import { Button, Card } from '../components';
import { colors, spacing, typography } from '../constants/colors';

const InsightsScreen = ({ navigation }: InsightsScreenProps) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>AI Insights</Text>
          <Text style={styles.subtitle}>Personalized recommendations powered by AI</Text>
        </View>

        <Card style={styles.insightCard}>
          <Text style={styles.insightTitle}>🧠 Productivity Pattern</Text>
          <Text style={styles.insightText}>You're most productive between 9-11 AM. Schedule important tasks during this time.</Text>
        </Card>

        <Card style={styles.insightCard}>
          <Text style={styles.insightTitle}>📈 Task Completion Trend</Text>
          <Text style={styles.insightText}>Your task completion rate increased by 15% this week. Keep up the great work!</Text>
        </Card>

        <Card style={styles.insightCard}>
          <Text style={styles.insightTitle}>⏰ Time Management</Text>
          <Text style={styles.insightText}>Consider blocking time for deep work. You spend 40% of time in meetings.</Text>
        </Card>

        <Card style={styles.insightCard}>
          <Text style={styles.insightTitle}>🎯 Goal Alignment</Text>
          <Text style={styles.insightText}>80% of your completed tasks align with your weekly goals. Great focus!</Text>
        </Card>
      </ScrollView>
    </View>
  );
};

export default InsightsScreen;

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
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  insightCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  insightTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  insightText: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
