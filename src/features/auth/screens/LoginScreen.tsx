import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { CosmicBackground, GlassCard, Button, Input } from '../../../shared/components';
import { Colors, TextStyles, Spacing } from '../../../shared/theme';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, continueAsGuest, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleLogin = useCallback(async () => {
    let hasError = false;
    setEmailError(null);
    setError(null);

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

    if (!password) {
      setError('Please enter your password');
      hasError = true;
    }

    if (hasError) return;

    try {
      await login(email);
    } catch (e) {
      setError('Invalid credentials');
    }
  }, [email, password, login]);

  return (
    <CosmicBackground variant="auth">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.logoSymbol}>🌌</Text>
            <Text style={[TextStyles.displaySmall, styles.title]}>Celestia</Text>
            <Text style={[TextStyles.bodySmall, styles.subtitle]}>Unlock your cosmic blueprint</Text>
          </View>

          <GlassCard style={styles.card}>
            <Text style={[TextStyles.h3, styles.cardTitle]}>Sign In</Text>

            <View style={styles.inputContainer}>
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
                onChangeText={(text) => { setPassword(text); setError(null); }}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
              />
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotBtn}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              title="Enter the Cosmos"
              onPress={handleLogin}
              loading={isLoading}
              style={styles.btn}
            />

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.line} />
            </View>

            <Button
              title="Continue as Guest"
              variant="secondary"
              onPress={continueAsGuest}
              style={styles.guestBtn}
            />
          </GlassCard>

          <View style={styles.footer}>
            <Text style={styles.footerText}>New to the stars? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Sign Up</Text>
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
    marginBottom: Spacing['2xl'],
  },
  logoSymbol: {
    fontSize: 54,
    marginBottom: Spacing.sm,
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
  cardTitle: {
    color: Colors.text.primary,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  inputContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.lg,
  },
  forgotText: {
    color: Colors.accent.purpleLight,
    fontSize: 14,
  },
  btn: {
    marginTop: Spacing.sm,
  },
  guestBtn: {
    marginTop: Spacing.sm,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.glass.border,
  },
  dividerText: {
    color: Colors.text.muted,
    paddingHorizontal: Spacing.md,
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  footerText: {
    color: Colors.text.tertiary,
  },
  registerLink: {
    color: Colors.accent.goldLight,
    fontWeight: '600',
  },
  errorText: {
    color: Colors.status.error,
    marginBottom: Spacing.sm,
  },
});
