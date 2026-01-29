import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TaskDetailScreenProps } from '../types';

const TaskDetailScreen = ({ navigation }: TaskDetailScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>
      <Text style={styles.label}>Title: Sample Task</Text>
      <Text style={styles.label}>Description: This is a sample task description.</Text>
      <Text style={styles.label}>Due: Tomorrow at 10:00 AM</Text>
      <Button title="Mark Complete" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default TaskDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#4B7BEC', textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 10 },
});
