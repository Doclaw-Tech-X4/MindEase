import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { OverviewScreenProps, AnalyticsData } from '../types';
import { Button, Card } from '../components';
import { colors, spacing, typography } from '../constants/colors';

const OverviewScreen = ({ navigation }: OverviewScreenProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  const analyticsData: AnalyticsData = {
    tasksCompleted: 24,
    tasksPending: 8,
    emailsProcessed: 156,
    productivityScore: 85,
    weeklyProgress: [65, 78, 82, 75, 90, 85, 88],
    monthlyTrends: [70, 75, 80, 85, 82, 88],
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const getProductivityColor = (score: number) => {
    if (score >= 80) return colors.success;
    if (score >= 60) return colors.warning;
    return colors.error;
  };

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
          <Text style={styles.title}>Analytics Overview</Text>
          <View style={styles.timeRangeButtons}>
            {(['week', 'month', 'year'] as const).map(range => (
              <Button
                key={range}
                title={range.charAt(0).toUpperCase() + range.slice(1)}
                onPress={() => setTimeRange(range)}
                variant={timeRange === range ? 'primary' : 'outline'}
                size="small"
                style={styles.timeRangeButton}
              />
            ))}
          </View>
        </View>

        {/* Productivity Score */}
        <Card style={styles.productivityCard}>
          <Text style={styles.productivityTitle}>Productivity Score</Text>
          <View style={styles.scoreContainer}>
            <Text style={[
              styles.scoreNumber,
              { color: getProductivityColor(analyticsData.productivityScore) }
            ]}>
              {analyticsData.productivityScore}
            </Text>
            <Text style={styles.scoreLabel}>out of 100</Text>
          </View>
          <Text style={styles.scoreDescription}>
            {analyticsData.productivityScore >= 80 ? 'Excellent performance!' :
             analyticsData.productivityScore >= 60 ? 'Good progress' :
             'Room for improvement'}
          </Text>
        </Card>

        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <Card style={styles.metricCard}>
            <Text style={styles.metricNumber}>{analyticsData.tasksCompleted}</Text>
            <Text style={styles.metricLabel}>Tasks Completed</Text>
          </Card>
          <Card style={styles.metricCard}>
            <Text style={styles.metricNumber}>{analyticsData.tasksPending}</Text>
            <Text style={styles.metricLabel}>Pending Tasks</Text>
          </Card>
          <Card style={styles.metricCard}>
            <Text style={styles.metricNumber}>{analyticsData.emailsProcessed}</Text>
            <Text style={styles.metricLabel}>Emails Processed</Text>
          </Card>
        </View>

        {/* Progress Chart */}
        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>Weekly Progress</Text>
          <View style={styles.chartContainer}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <View key={day} style={styles.chartBar}>
                <Text style={styles.chartDay}>{day}</Text>
                <View style={styles.chartBarContainer}>
                  <View 
                    style={[
                      styles.chartBarFill,
                      { 
                        height: `${analyticsData.weeklyProgress[index]}%`,
                        backgroundColor: getProductivityColor(analyticsData.weeklyProgress[index])
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.chartValue}>
                  {analyticsData.weeklyProgress[index]}%
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <Button
              title="View Reports"
              onPress={() => navigation.navigate('Reports')}
              variant="outline"
              style={styles.actionButton}
            />
            <Button
              title="Get Insights"
              onPress={() => navigation.navigate('Insights')}
              variant="outline"
              style={styles.actionButton}
            />
          </View>
        </View>

        {/* Recent Achievements */}
        <Card style={styles.achievementsCard}>
          <Text style={styles.achievementsTitle}>🏆 Recent Achievements</Text>
          <View style={styles.achievementList}>
            <Text style={styles.achievement}>• Completed 5 tasks in a row</Text>
            <Text style={styles.achievement}>• Processed 50+ emails this week</Text>
            <Text style={styles.achievement}>• Maintained 80%+ productivity</Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default OverviewScreen;

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
    marginBottom: spacing.md,
  },
  timeRangeButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  timeRangeButton: {
    flex: 1,
  },
  productivityCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  productivityTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  scoreNumber: {
    ...typography.h1,
    fontWeight: 'bold',
  },
  scoreLabel: {
    ...typography.body2,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  scoreDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
  },
  metricNumber: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  metricLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  chartCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  chartTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
  },
  chartDay: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  chartBarContainer: {
    width: 20,
    height: 100,
    backgroundColor: colors.borderLight,
    borderRadius: 2,
    justifyContent: 'flex-end',
    marginBottom: spacing.xs,
  },
  chartBarFill: {
    width: '100%',
    borderRadius: 2,
  },
  chartValue: {
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
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  achievementsCard: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  achievementsTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  achievementList: {
    gap: spacing.sm,
  },
  achievement: {
    ...typography.body2,
    color: colors.text,
  },
});
