import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { EmailSettingsScreenProps, EmailAccount } from '../types';
import { Button, Input, Card } from '../components';
import { colors, spacing, typography } from '../constants/colors';

const EmailSettingsScreen = ({ navigation }: EmailSettingsScreenProps) => {
  const [accounts, setAccounts] = useState<EmailAccount[]>([
    {
      id: '1',
      email: 'john.doe@gmail.com',
      provider: 'gmail',
      isConnected: true,
      lastSync: '2 minutes ago',
    },
    {
      id: '2',
      email: 'work@outlook.com',
      provider: 'outlook',
      isConnected: false,
    },
  ]);

  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newProvider, setNewProvider] = useState<'gmail' | 'outlook' | 'yahoo' | 'imap'>('gmail');
  const [loading, setLoading] = useState(false);

  const handleConnectAccount = async () => {
    if (!newEmail.trim() || !newPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newAccount: EmailAccount = {
        id: Date.now().toString(),
        email: newEmail,
        provider: newProvider,
        isConnected: true,
        lastSync: 'Just now',
      };

      setAccounts([...accounts, newAccount]);
      setNewEmail('');
      setNewPassword('');
      setShowAddAccount(false);
      setLoading(false);

      Alert.alert('Success', 'Email account connected successfully!');
    }, 2000);
  };

  const handleDisconnectAccount = (accountId: string) => {
    Alert.alert(
      'Disconnect Account',
      'Are you sure you want to disconnect this email account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: () => {
            setAccounts(accounts.filter(acc => acc.id !== accountId));
            Alert.alert('Success', 'Account disconnected successfully');
          },
        },
      ]
    );
  };

  const handleSyncAccount = (accountId: string) => {
    setAccounts(accounts.map(acc =>
      acc.id === accountId
        ? { ...acc, lastSync: 'Syncing...' }
        : acc
    ));

    setTimeout(() => {
      setAccounts(accounts.map(acc =>
        acc.id === accountId
          ? { ...acc, lastSync: 'Just now' }
          : acc
      ));
      Alert.alert('Success', 'Emails synced successfully');
    }, 1500);
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'gmail': return '📧';
      case 'outlook': return '📨';
      case 'yahoo': return '📪';
      case 'imap': return '📫';
      default: return '📬';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Email Accounts</Text>
          <Text style={styles.subtitle}>
            Connect your email accounts to enable AI-powered summarization
          </Text>
        </View>

        {/* Connected Accounts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Accounts</Text>
          {accounts.map(account => (
            <Card key={account.id} style={styles.accountCard}>
              <View style={styles.accountHeader}>
                <View style={styles.accountInfo}>
                  <Text style={styles.providerIcon}>
                    {getProviderIcon(account.provider)}
                  </Text>
                  <View style={styles.accountDetails}>
                    <Text style={styles.accountEmail}>{account.email}</Text>
                    <Text style={styles.accountProvider}>
                      {account.provider.charAt(0).toUpperCase() + account.provider.slice(1)}
                    </Text>
                    {account.isConnected && account.lastSync && (
                      <Text style={styles.lastSync}>Last sync: {account.lastSync}</Text>
                    )}
                  </View>
                </View>
                <View style={[styles.statusIndicator, account.isConnected ? styles.connected : styles.disconnected]} />
              </View>

              <View style={styles.accountActions}>
                {account.isConnected ? (
                  <>
                    <Button
                      title="Sync"
                      onPress={() => handleSyncAccount(account.id)}
                      variant="outline"
                      size="small"
                      style={styles.actionButton}
                    />
                    <Button
                      title="Disconnect"
                      onPress={() => handleDisconnectAccount(account.id)}
                      variant="outline"
                      size="small"
                      style={[styles.actionButton, styles.disconnectButton]}
                    />
                  </>
                ) : (
                  <Button
                    title="Reconnect"
                    onPress={() => handleConnectAccount()}
                    variant="outline"
                    size="small"
                    style={styles.actionButton}
                  />
                )}
              </View>
            </Card>
          ))}
        </View>

        {/* Add New Account */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add New Account</Text>

          {!showAddAccount ? (
            <Button
              title="Add Email Account"
              onPress={() => setShowAddAccount(true)}
              variant="outline"
              style={styles.addButton}
            />
          ) : (
            <Card style={styles.addAccountCard}>
              <Input
                label="Email Address"
                placeholder="your@email.com"
                value={newEmail}
                onChangeText={setNewEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Password"
                placeholder="Your password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />

              <View style={styles.providerButtons}>
                {(['gmail', 'outlook', 'yahoo', 'imap'] as const).map(provider => (
                  <Button
                    key={provider}
                    title={provider.charAt(0).toUpperCase() + provider.slice(1)}
                    onPress={() => setNewProvider(provider)}
                    variant={newProvider === provider ? 'primary' : 'outline'}
                    size="small"
                    style={styles.providerButton}
                  />
                ))}
              </View>

              <View style={styles.addAccountActions}>
                <Button
                  title="Cancel"
                  onPress={() => {
                    setShowAddAccount(false);
                    setNewEmail('');
                    setNewPassword('');
                  }}
                  variant="outline"
                  style={styles.cancelButton}
                />
                <Button
                  title="Connect"
                  onPress={handleConnectAccount}
                  loading={loading}
                  style={styles.connectButton}
                />
              </View>
            </Card>
          )}
        </View>

        {/* AI Features Info */}
        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>🤖 AI-Powered Features</Text>
          <Text style={styles.infoText}>
            • Automatic email summarization
          </Text>
          <Text style={styles.infoText}>
            • Priority email detection
          </Text>
          <Text style={styles.infoText}>
            • Smart categorization
          </Text>
          <Text style={styles.infoText}>
            • Action item extraction
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
};

export default EmailSettingsScreen;

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
    lineHeight: 22,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  accountCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  providerIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  accountDetails: {
    flex: 1,
  },
  accountEmail: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  accountProvider: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  lastSync: {
    ...typography.caption,
    color: colors.gray,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  connected: {
    backgroundColor: colors.success,
  },
  disconnected: {
    backgroundColor: colors.error,
  },
  accountActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  disconnectButton: {
    borderColor: colors.error,
  },
  addButton: {
    marginBottom: spacing.md,
  },
  addAccountCard: {
    padding: spacing.lg,
  },
  providerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  providerButton: {
    flex: 1,
    minWidth: 80,
  },
  addAccountActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cancelButton: {
    flex: 1,
  },
  connectButton: {
    flex: 2,
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
  infoText: {
    ...typography.body2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
});
