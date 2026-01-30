import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ReportsScreenProps } from '../types';
import { Button, Card } from '../components';
import { colors, spacing, typography } from '../constants/colors';

const ReportsScreen = ({ navigation }: ReportsScreenProps) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Reports</Text>
          <Text style={styles.subtitle}>Detailed analytics and insights</Text>
        </View>

        <Card style={styles.reportCard}>
          <Text style={styles.reportTitle}>📊 Productivity Report</Text>
          <Text style={styles.reportDescription}>Weekly productivity analysis with trends and recommendations</Text>
          <Button
            title="View Report"
            onPress={() => {}}
            variant="outline"
            size="small"
          />
        </Card>

        <Card style={styles.reportCard}>
          <Text style={styles.reportTitle}>📧 Email Analytics</Text>
          <Text style={styles.reportDescription}>Email processing statistics and AI summarization insights</Text>
          <Button
            title="View Report"
            onPress={() => {}}
            variant="outline"
            size="small"
          />
        </Card>

        <Card style={styles.reportCard}>
          <Text style={styles.reportTitle}>📅 Calendar Analysis</Text>
          <Text style={styles.reportDescription}>Time management and meeting efficiency metrics</Text>
          <Button
            title="View Report"
            onPress={() => {}}
            variant="outline"
            size="small"
          />
        </Card>
      </ScrollView>
    </View>
  );
};

export default ReportsScreen;

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
  reportCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  reportTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  reportDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
});
