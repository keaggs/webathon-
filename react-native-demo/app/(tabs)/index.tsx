import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  View,
  RefreshControl,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { userService, type User } from '@/services/userService';

export default function UsersScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const hasInitialLoad = useRef(false);

  function loadUsers() {
    return userService
      .getUsers()
      .then((res) => {
        setUsers(res.data);
        setError('');
      })
      .catch(() => setError('Failed to load users'));
  }

  useEffect(() => {
    loadUsers().finally(() => {
      setLoading(false);
      hasInitialLoad.current = true;
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (hasInitialLoad.current) loadUsers();
    }, [])
  );

  function onRefresh() {
    setRefreshing(true);
    loadUsers().finally(() => setRefreshing(false));
  }

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <ThemedText style={styles.loadingText}>Loading users...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Users</ThemedText>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/user-form')}
        >
          <ThemedText style={styles.addButtonText}>Add User</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <ThemedText style={[styles.cell, styles.headerCell, styles.nameCol]}>
              Name
            </ThemedText>
            <ThemedText style={[styles.cell, styles.headerCell, styles.emailCol]}>
              Email
            </ThemedText>
            <ThemedText style={[styles.cell, styles.headerCell, styles.actionsCol]}>
              Actions
            </ThemedText>
          </View>
          {users.map((user) => (
            <View key={user.id} style={styles.tableRow}>
              <ThemedText style={[styles.cell, styles.nameCol]} numberOfLines={1}>
                {user.name}
              </ThemedText>
              <ThemedText style={[styles.cell, styles.emailCol]} numberOfLines={1}>
                {user.email}
              </ThemedText>
              <View style={styles.actionsCol}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => router.push({ pathname: '/user-form', params: { id: String(user.id) } })}
                >
                  <ThemedText style={styles.editButtonText}>Edit</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: { marginTop: 12 },
  errorText: { color: '#b91c1c' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  addButton: {
    backgroundColor: '#374151',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  table: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
  },
  cell: { fontSize: 14 },
  headerCell: { fontWeight: '600' },
  nameCol: { flex: 1.2 },
  emailCol: { flex: 1.5 },
  actionsCol: { flex: 0.6, alignItems: 'flex-end' },
  editButton: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editButtonText: { fontWeight: '600', fontSize: 13 },
});
