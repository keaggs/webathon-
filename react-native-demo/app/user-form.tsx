import { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { userService } from '@/services/userService';

export default function UserFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEdit = Boolean(id);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit && id) {
      userService
        .getUserById(Number(id))
        .then((res) => {
          setName(res.data.name);
          setEmail(res.data.email);
        })
        .catch(() => setSubmitError('Failed to load user'))
        .finally(() => setFetching(false));
    }
  }, [isEdit, id]);

  function validate(): boolean {
    const next: { name?: string; email?: string; password?: string } = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!email.trim()) next.email = 'Email is required';
    if (!isEdit && !password.trim()) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    setSubmitError('');
    if (!validate()) return;

    setLoading(true);
    if (isEdit && id) {
      userService
        .updateUser(Number(id), {
          name: name.trim(),
          email: email.trim(),
          ...(password.trim() && { password: password.trim() }),
        })
        .then(() => router.back())
        .catch((err) =>
          setSubmitError(err.response?.data?.message || 'Failed to update user')
        )
        .finally(() => setLoading(false));
    } else {
      userService
        .createUser({ name: name.trim(), email: email.trim(), password: password.trim() })
        .then(() => router.back())
        .catch((err) =>
          setSubmitError(err.response?.data?.message || 'Failed to create user')
        )
        .finally(() => setLoading(false));
    }
  }

  if (fetching) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <ThemedText style={styles.loadingText}>Loading user...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <ThemedView style={styles.form}>
          <ThemedText type="title" style={styles.title}>
            {isEdit ? 'Edit User' : 'Add User'}
          </ThemedText>

          {submitError ? (
            <View style={styles.errorBox}>
              <ThemedText style={styles.errorText}>{submitError}</ThemedText>
            </View>
          ) : null}

          <ThemedText style={styles.label}>Name</ThemedText>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="#687076"
            autoCapitalize="words"
          />
          {errors.name ? (
            <ThemedText style={styles.fieldError}>{errors.name}</ThemedText>
          ) : null}

          <ThemedText style={styles.label}>Email</ThemedText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#687076"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? (
            <ThemedText style={styles.fieldError}>{errors.email}</ThemedText>
          ) : null}

          <ThemedText style={styles.label}>
            Password {isEdit ? '(leave blank to keep current)' : ''}
          </ThemedText>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#687076"
            secureTextEntry
          />
          {errors.password ? (
            <ThemedText style={styles.fieldError}>{errors.password}</ThemedText>
          ) : null}

          <ThemedView style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <ThemedText style={styles.primaryButtonText}>
                  {isEdit ? 'Update' : 'Create'}
                </ThemedText>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => router.back()}>
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: { marginTop: 12 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  form: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  title: { marginBottom: 24 },
  errorBox: {
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: { color: '#b91c1c', fontSize: 14 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 4,
    backgroundColor: '#fff',
    color: '#111',
  },
  fieldError: { color: '#b91c1c', fontSize: 12, marginBottom: 12 },
  buttons: { flexDirection: 'row', gap: 12, marginTop: 24 },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  primaryButton: { backgroundColor: '#374151' },
  primaryButtonText: { color: '#fff', fontWeight: '600' },
  cancelButton: { backgroundColor: '#e5e7eb' },
  cancelButtonText: { color: '#374151', fontWeight: '600' },
});
