import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { CosmicBackground, GlassCard, Button, Input } from '../../../shared/components';
import { Colors, TextStyles, Spacing } from '../../../shared/theme';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading } = useAuthStore();
  
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const handleRegister = useCallback(async () => {
    let hasError = false;
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setError(null);

    if (!name.trim()) {
      setNameError('Please enter your name');
      hasError = true;
    }

    if (!email) {
      setEmailError('Please enter your email');
      hasError = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Please enter a valid email');
        hasError = true;
      }
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    if (hasError) return;

    try {
      await register(email, name);
    } catch (e) {
      setError('Failed to create account');
    }
  }, [name, email, password, confirmPassword, register]);

  return (
    <CosmicBackground variant="auth">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={[TextStyles.displaySmall, styles.title]}>Create Profile</Text>
            <Text style={[TextStyles.bodySmall, styles.subtitle]}>Begin your celestial alignment</Text>
          </View>

          <GlassCard style={styles.card}>
            <View style={styles.inputContainer}>
              <Input
                label="Full Name"
                value={name}
                onChangeText={(text) => { setName(text); setNameError(null); }}
                autoCapitalize="words"
                autoComplete="name"
                error={nameError}
              />
              <Input
                label="Email Address"
                value={email}
                onChangeText={(text) => { setEmail(text); setEmailError(null); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={emailError}
              />
              <Input
                label="Password"
                value={password}
                onChangeText={(text) => { setPassword(text); setPasswordError(null); }}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
                error={passwordError}
              />
              <Input
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => { setConfirmPassword(text); setConfirmPasswordError(null); }}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
                error={confirmPasswordError}
              />
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <Button
              title="Ascend to the Stars"
              onPress={handleRegister}
              loading={isLoading}
              style={styles.btn}
            />
          </GlassCard>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    color: Colors.text.primary,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.text.tertiary,
    marginTop: Spacing.xs,
  },
  card: {
    width: '100%',
  },
  inputContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  btn: {
    marginTop: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  footerText: {
    color: Colors.text.tertiary,
  },
  loginLink: {
    color: Colors.accent.goldLight,
    fontWeight: '600',
  },
  errorText: {
    color: Colors.status.error,
    marginBottom: Spacing.sm,
  },
});
