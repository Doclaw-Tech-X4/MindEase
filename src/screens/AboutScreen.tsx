import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AboutScreenProps } from '../types';
import { Card } from '../components';
import { colors, spacing, typography } from '../constants/colors';

const AboutScreen = ({ navigation }: AboutScreenProps) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>🧠</Text>
          <Text style={styles.title}>MindEase</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <Card style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>About MindEase</Text>
          <Text style={styles.aboutText}>
            MindEase is your comprehensive mental wellness and productivity companion.
            Powered by AI, it helps you manage tasks, emails, calendar, and provides
            personalized insights to enhance your daily life.
            Developed by Lawrence Ouma
          </Text>
        </Card>

        <Card style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>Key Features</Text>
          <Text style={styles.feature}>🤖 AI-powered email summarization</Text>
          <Text style={styles.feature}>📋 Smart task management</Text>
          <Text style={styles.feature}>📅 Calendar integration</Text>
          <Text style={styles.feature}>📊 Productivity analytics</Text>
          <Text style={styles.feature}>🧘 Wellness routines</Text>
          <Text style={styles.feature}>📈 Personalized insights</Text>
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>Contact & Support</Text>
          <Text style={styles.info}>📧 support@mindease.app</Text>
          <Text style={styles.info}>🌐 www.mindease.app</Text>
          <Text style={styles.info}>📱 @MindEaseApp</Text>
        </Card>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;

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
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  version: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  aboutCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  aboutTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  aboutText: {
    ...typography.body1,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  featuresCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  featuresTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  feature: {
    ...typography.body2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoCard: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  infoTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  info: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
});
