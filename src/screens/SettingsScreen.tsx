import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';
import { SettingsScreenProps } from '../types';
import { Button, Card } from '../components';
import { useDynamicColors } from '../constants/dynamicColors';
import { spacing, typography } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { user, updateUser } = useAuth();
  const { theme, setTheme, isDarkMode } = useTheme();
  const colors = useDynamicColors();
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const handleProfilePicture = () => {
    Alert.alert(
      'Profile Picture',
      'Choose how you want to set your profile picture',
      [
        {
          text: 'Take Photo',
          onPress: () => openCamera(),
        },
        {
          text: 'Choose from Gallery',
          onPress: () => openGallery(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const openCamera = async () => {
    try {
      // Request camera permission
      const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
      const permissionResult = await request(permission);

      if (permissionResult !== RESULTS.GRANTED) {
        Alert.alert(
          'Permission Required',
          'Camera permission is required to take photos. Please enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Try Again', onPress: () => openCamera() }
          ]
        );
        return;
      }

      // Launch camera
      const cameraResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!cameraResult.canceled && cameraResult.assets && cameraResult.assets[0]) {
        const imageUri = cameraResult.assets[0].uri;
        if (imageUri) {
          updateProfilePicture(imageUri);
        }
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to open camera. Please try again.');
    }
  };

  const openGallery = async () => {
    try {
      // Request gallery permission
      const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      const permissionResult = await request(permission);

      if (permissionResult !== RESULTS.GRANTED) {
        Alert.alert(
          'Permission Required',
          'Gallery permission is required to select photos. Please enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Try Again', onPress: () => openGallery() }
          ]
        );
        return;
      }

      // Launch image library
      const galleryResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!galleryResult.canceled && galleryResult.assets && galleryResult.assets[0]) {
        const imageUri = galleryResult.assets[0].uri;
        if (imageUri) {
          updateProfilePicture(imageUri);
        }
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Error', 'Failed to open gallery. Please try again.');
    }
  };

  const updateProfilePicture = async (uri?: string) => {
    if (!uri) return;

    setUpdatingProfile(true);
    try {
      updateUser({ profilePicture: uri });
      Alert.alert('Success', 'Profile picture updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile picture');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const themeOptions = [
    { label: 'Light', value: 'light' as const },
    { label: 'Dark', value: 'dark' as const },
    { label: 'System', value: 'system' as const },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        </View>

        {/* Profile Section */}
        <Card style={styles.settingsCard}>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={handleProfilePicture} style={styles.profilePictureContainer}>
              {user?.profilePicture ? (
                <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
              ) : (
                <View style={[styles.profilePicturePlaceholder, { backgroundColor: colors.primary }]}>
                  <Text style={styles.profilePictureText}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
              )}
              <View style={[styles.editIcon, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Text style={styles.editIconText}>📷</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>{user?.name}</Text>
              <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>{user?.email}</Text>
              <TouchableOpacity onPress={handleProfilePicture} style={styles.changePhotoButton}>
                <Text style={[styles.changePhotoText, { color: colors.primary }]}>Change Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Theme Settings */}
        <Card style={styles.settingsCard}>
          <Text style={[styles.settingsTitle, { color: colors.text }]}>🎨 Appearance</Text>
          <View style={styles.themeOptions}>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.themeOption,
                  theme === option.value && styles.themeOptionSelected,
                  { borderColor: colors.border },
                  theme === option.value && { borderColor: colors.primary, backgroundColor: colors.primaryLight }
                ]}
                onPress={() => setTheme(option.value)}
              >
                <Text
                  style={[
                    styles.themeOptionText,
                    { color: colors.text },
                    theme === option.value && styles.themeOptionTextSelected,
                    theme === option.value && { color: theme === 'light' ? colors.text : colors.text }
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.settingsDescription, { color: colors.textSecondary }]}>
            Current: {theme === 'system' ? `System (${isDarkMode ? 'Dark' : 'Light'})` : theme}
          </Text>
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={[styles.settingsTitle, { color: colors.text }]}>🔔 Notifications</Text>
          <Text style={[styles.settingsDescription, { color: colors.textSecondary }]}>Manage push notifications and email alerts</Text>
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={[styles.settingsTitle, { color: colors.text }]}>🔐 Privacy</Text>
          <Text style={[styles.settingsDescription, { color: colors.textSecondary }]}>Control your data and privacy settings</Text>
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={[styles.settingsTitle, { color: colors.text }]}>📧 Email Accounts</Text>
          <Text style={[styles.settingsDescription, { color: colors.textSecondary }]}>Manage connected email accounts</Text>
        </Card>

        <Card style={styles.settingsCard}>
          <Text style={[styles.settingsTitle, { color: colors.text }]}>📅 Calendar Sync</Text>
          <Text style={[styles.settingsDescription, { color: colors.textSecondary }]}>Configure calendar integration</Text>
        </Card>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: spacing.md,
  },
  settingsCard: {
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  settingsTitle: {
    ...typography.body1,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  settingsDescription: {
    ...typography.body2,
    marginTop: spacing.sm,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePictureContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profilePicturePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureText: {
    ...typography.h2,
    color: '#FFFFFF',
  },
  editIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  editIconText: {
    fontSize: 14,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...typography.body1,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  profileEmail: {
    ...typography.body2,
    marginBottom: spacing.sm,
  },
  changePhotoButton: {
    alignSelf: 'flex-start',
  },
  changePhotoText: {
    ...typography.caption,
    fontWeight: '500',
  },
  themeOptions: {
    flexDirection: 'row',
    marginVertical: spacing.sm,
  },
  themeOption: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  themeOptionSelected: {
    borderWidth: 2,
  },
  themeOptionText: {
    ...typography.body2,
  },
  themeOptionTextSelected: {
    fontWeight: '600',
  },
});
