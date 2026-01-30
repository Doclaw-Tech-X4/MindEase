import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { RoutinesScreenProps } from '../types';
import { Button, Card } from '../components';
import { colors, spacing, typography, borderRadius } from '../constants/colors';

interface Routine {
  id: string;
  title: string;
  description: string;
  time: string;
  frequency: string;
  isActive: boolean;
  icon: string;
}

const RoutinesScreen = ({ navigation }: RoutinesScreenProps) => {
  const [routines, setRoutines] = useState<Routine[]>([
    {
      id: '1',
      title: 'Morning Meditation',
      description: 'Start your day with 10 minutes of mindfulness',
      time: '8:00 AM',
      frequency: 'Daily',
      isActive: true,
      icon: '🧘',
    },
    {
      id: '2',
      title: 'Gratitude Journal',
      description: 'Write down three things you are grateful for',
      time: '12:00 PM',
      frequency: 'Daily',
      isActive: false,
      icon: '📝',
    },
    {
      id: '3',
      title: 'Evening Walk',
      description: 'Take a 30-minute walk to clear your mind',
      time: '6:00 PM',
      frequency: 'Weekdays',
      isActive: true,
      icon: '🚶',
    },
    {
      id: '4',
      title: 'Bedtime Reading',
      description: 'Read for 20 minutes before sleep',
      time: '10:00 PM',
      frequency: 'Daily',
      isActive: false,
      icon: '📚',
    },
  ]);

  const toggleRoutine = (routineId: string) => {
    setRoutines(prevRoutines =>
      prevRoutines.map(routine =>
        routine.id === routineId ? { ...routine, isActive: !routine.isActive } : routine
      )
    );
  };

  const handleAddRoutine = () => {
    Alert.alert(
      'Add Routine',
      'This feature will allow you to create custom routines. For now, enjoy the preset routines!',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const activeRoutines = routines.filter(routine => routine.isActive);
  const inactiveRoutines = routines.filter(routine => !routine.isActive);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Wellness Routines</Text>
          <Text style={styles.subtitle}>Build healthy habits for your mental wellbeing</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{activeRoutines.length}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{routines.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Completion</Text>
          </Card>
        </View>

        {/* Active Routines */}
        {activeRoutines.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Routines</Text>
            {activeRoutines.map(routine => (
              <Card key={routine.id} style={styles.routineCard}>
                <View style={styles.routineHeader}>
                  <View style={styles.routineInfo}>
                    <Text style={styles.routineIcon}>{routine.icon}</Text>
                    <View style={styles.routineDetails}>
                      <Text style={styles.routineTitle}>{routine.title}</Text>
                      <Text style={styles.routineDescription}>{routine.description}</Text>
                      <View style={styles.routineMeta}>
                        <Text style={styles.routineTime}>🕐 {routine.time}</Text>
                        <Text style={styles.routineFrequency}>📅 {routine.frequency}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.toggleButton, styles.activeButton]}
                    onPress={() => toggleRoutine(routine.id)}
                  >
                    <Text style={styles.toggleButtonText}>ON</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* Inactive Routines */}
        {inactiveRoutines.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Routines</Text>
            {inactiveRoutines.map(routine => (
              <Card key={routine.id} style={[styles.routineCard, styles.inactiveRoutine]}>
                <View style={styles.routineHeader}>
                  <View style={styles.routineInfo}>
                    <Text style={[styles.routineIcon, styles.inactiveIcon]}>{routine.icon}</Text>
                    <View style={styles.routineDetails}>
                      <Text style={[styles.routineTitle, styles.inactiveTitle]}>{routine.title}</Text>
                      <Text style={[styles.routineDescription, styles.inactiveDescription]}>
                        {routine.description}
                      </Text>
                      <View style={styles.routineMeta}>
                        <Text style={[styles.routineTime, styles.inactiveMeta]}>
                          🕐 {routine.time}
                        </Text>
                        <Text style={[styles.routineFrequency, styles.inactiveMeta]}>
                          📅 {routine.frequency}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.toggleButton, styles.inactiveButton]}
                    onPress={() => toggleRoutine(routine.id)}
                  >
                    <Text style={[styles.toggleButtonText, styles.inactiveButtonText]}>OFF</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* Tips Section */}
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Routine Tips</Text>
          <Text style={styles.tip}>• Start small and build gradually</Text>
          <Text style={styles.tip}>• Be consistent with your schedule</Text>
          <Text style={styles.tip}>• Track your progress daily</Text>
          <Text style={styles.tip}>• Adjust routines as needed</Text>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Add Custom Routine"
            onPress={handleAddRoutine}
            variant="outline"
            style={styles.addButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default RoutinesScreen;

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
  routineCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  inactiveRoutine: {
    opacity: 0.7,
    backgroundColor: colors.background,
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routineInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  routineIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  inactiveIcon: {
    opacity: 0.6,
  },
  routineDetails: {
    flex: 1,
  },
  routineTitle: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  inactiveTitle: {
    color: colors.textSecondary,
  },
  routineDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  inactiveDescription: {
    color: colors.gray,
  },
  routineMeta: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  routineTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  routineFrequency: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  inactiveMeta: {
    color: colors.gray,
  },
  toggleButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    minWidth: 50,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: colors.success,
  },
  inactiveButton: {
    backgroundColor: colors.border,
  },
  toggleButtonText: {
    ...typography.caption,
    color: colors.textLight,
    fontWeight: '600',
  },
  inactiveButtonText: {
    color: colors.textSecondary,
  },
  tipsCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  tipsTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  tip: {
    ...typography.body2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  actions: {
    marginBottom: spacing.xl,
  },
  addButton: {
    marginBottom: spacing.md,
  },
});
