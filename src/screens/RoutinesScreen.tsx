import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { RoutinesScreenProps } from '../types';

const RoutinesScreen = ({ navigation }: RoutinesScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Routines</Text>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View style={styles.routineCard}>
          <Text>Morning Exercise</Text>
        </View>
        <View style={styles.routineCard}>
          <Text>Check Emails</Text>
        </View>
      </ScrollView>
      <Button title="Add Routine" onPress={() => alert('Add Routine Placeholder')} />
    </View>
  );
};

export default RoutinesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#4B7BEC' },
  routineCard: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 10 },
});
