import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SettingsScreenProps } from '../types';
import { Button, Card } from '../components';
import { colors, spacing, typography } from '../constants/colors';

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <Card style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>🔔 Notifications</Text>
          <Text style={styles.settingsDescription}>Manage push notifications and email alerts</Text>
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>🔐 Privacy</Text>
          <Text style={styles.settingsDescription}>Control your data and privacy settings</Text>
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>🎨 Appearance</Text>
          <Text style={styles.settingsDescription}>Customize app theme and display options</Text>
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>📧 Email Accounts</Text>
          <Text style={styles.settingsDescription}>Manage connected email accounts</Text>
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>📅 Calendar Sync</Text>
          <Text style={styles.settingsDescription}>Configure calendar integration</Text>
        </Card>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

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
  },
  settingsCard: {
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  settingsTitle: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  settingsDescription: {
    ...typography.body2,
    color: colors.textSecondary,
  },
});
