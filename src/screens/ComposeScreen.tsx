import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { ComposeScreenProps } from '../types';
import { Button, Input } from '../components';
import { colors, spacing, typography } from '../constants/colors';

const ComposeScreen = ({ navigation }: ComposeScreenProps) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<{ to?: string; subject?: string; body?: string }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { to?: string; subject?: string; body?: string } = {};

    if (!to.trim()) {
      newErrors.to = 'Recipient is required';
    } else if (!/\S+@\S+\.\S+/.test(to)) {
      newErrors.to = 'Invalid email address';
    }

    if (!subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!body.trim()) {
      newErrors.body = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = () => {
    if (validateForm()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigation.goBack();
      }, 1500);
    }
  };

  const handleSaveDraft = () => {
    Alert.alert('Draft Saved', 'Your email has been saved as a draft.');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Compose Email</Text>
        <View style={styles.headerActions}>
          <Button
            title="Save Draft"
            onPress={handleSaveDraft}
            variant="ghost"
            size="small"
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Input
            label="To"
            placeholder="recipient@example.com"
            value={to}
            onChangeText={setTo}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.to}
          />

          <Input
            label="Subject"
            placeholder="Email subject"
            value={subject}
            onChangeText={setSubject}
            error={errors.subject}
          />

          <Input
            label="Message"
            placeholder="Type your message here..."
            value={body}
            onChangeText={setBody}
            multiline
            numberOfLines={10}
            error={errors.body}
            style={styles.messageInput}
          />
        </View>

        <View style={styles.actions}>
          <Button
            title="Send Email"
            onPress={handleSend}
            loading={loading}
            style={styles.sendButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ComposeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },
  form: {
    flex: 1,
  },
  messageInput: {
    height: 200,
    textAlignVertical: 'top',
  },
  actions: {
    paddingVertical: spacing.lg,
  },
  sendButton: {
    marginBottom: spacing.xl,
  },
});
