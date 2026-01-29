import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { DashboardScreenProps } from '../types';

const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today’s Tasks</Text>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View style={styles.taskCard}>
          <Text>Sample Task 1</Text>
          <Button title="Details" onPress={() => navigation.navigate('TaskDetail')} />
        </View>
        <View style={styles.taskCard}>
          <Text>Sample Task 2</Text>
          <Button title="Details" onPress={() => navigation.navigate('TaskDetail')} />
        </View>
      </ScrollView>
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
      <Button title="Routines" onPress={() => navigation.navigate('Routines')} />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#4B7BEC' },
  taskCard: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 10 },
});
