import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ProfileScreenDetailProps } from '../types';
import { Button, Card } from '../components';
import { colors, spacing, typography } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const ProfileScreenDetail = ({ navigation }: ProfileScreenDetailProps) => {
  const { user, logout } = useAuth();
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Please log in to view your profile</Text>
      </View>
    );
  }

  const stats = [
    { label: 'Tasks Completed', value: '247' },
    { label: 'Emails Processed', value: '1,234' },
    { label: 'Productivity Score', value: '85%' },
    { label: 'Streak', value: '12 days' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            {user.profilePicture ? (
              <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <View style={styles.subscriptionBadge}>
                <Text style={styles.subscriptionText}>
                  {user.subscription ?
                    user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1) : 'Free'
                  } Plan
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.joinDate}>Member since {user.joinDate}</Text>
        </Card>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionIcon}>⚙️</Text>
            <Text style={styles.actionText}>Settings</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.actionIcon}>🔔</Text>
            <Text style={styles.actionText}>Notifications</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionIcon}>🔒</Text>
            <Text style={styles.actionText}>Privacy & Security</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate('About')}
          >
            <Text style={styles.actionIcon}>ℹ️</Text>
            <Text style={styles.actionText}>About</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Premium Features */}
        <Card style={styles.premiumCard}>
          <Text style={styles.premiumTitle}>🌟 Premium Features</Text>
          <Text style={styles.premiumFeature}>• Unlimited email summarization</Text>
          <Text style={styles.premiumFeature}>• Advanced analytics</Text>
          <Text style={styles.premiumFeature}>• Priority support</Text>
          <Text style={styles.premiumFeature}>• Custom integrations</Text>
        </Card>

        {/* Sign Out */}
        <View style={styles.section}>
          <Button
            title="Sign Out"
            onPress={async () => {
              await logout();
              rootNavigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              });
            }}
            variant="outline"
            style={styles.signOutButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreenDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },
  profileCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    ...typography.h2,
    color: colors.white,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  subscriptionBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  subscriptionText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  joinDate: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: spacing.md,
  },
  statValue: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  actionIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  actionText: {
    ...typography.body1,
    color: colors.text,
    flex: 1,
  },
  actionArrow: {
    ...typography.body1,
    color: colors.textSecondary,
  },
  premiumCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  premiumTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  premiumFeature: {
    ...typography.body2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  signOutButton: {
    marginBottom: spacing.xl,
  },
  errorText: {
    ...typography.body1,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});
