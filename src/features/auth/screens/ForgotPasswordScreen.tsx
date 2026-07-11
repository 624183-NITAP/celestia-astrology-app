import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { CosmicBackground, GlassCard, Button, Input } from '../../../shared/components';
import { Colors, TextStyles, Spacing } from '../../../shared/theme';

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = useCallback(() => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  }, [email]);

  return (
    <CosmicBackground variant="auth">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={[TextStyles.displaySmall, styles.title]}>Reset Alignment</Text>
            <Text style={[TextStyles.bodySmall, styles.subtitle]}>Recover your connection to the stars</Text>
          </View>

          <GlassCard style={styles.card}>
            {!sent ? (
              <>
                <Text style={[TextStyles.body, styles.infoText]}>
                  Enter the email address associated with your profile, and we will send instructions to reset your password.
                </Text>
                <View style={styles.inputContainer}>
                  <Input
                    label="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    error={error}
                  />
                </View>
                <Button
                  title="Send Reset Instructions"
                  onPress={handleReset}
                  style={styles.btn}
                  loading={loading}
                />
              </>
            ) : (
              <View style={styles.successContainer}>
                <Text style={styles.successEmoji}>📬</Text>
                <Text style={[TextStyles.h3, styles.successTitle]}>Instructions Sent</Text>
                <Text style={[TextStyles.body, styles.successText]}>
                  Check your inbox for a reset link. If you do not see it soon, check your spam folder.
                </Text>
                <Button
                  title="Return to Login"
                  onPress={() => navigation.navigate('Login')}
                  style={styles.successBtn}
                />
              </View>
            )}
          </GlassCard>

          {!sent && (
            <Button
              title="Back to Sign In"
              variant="ghost"
              onPress={() => navigation.navigate('Login')}
              style={styles.backBtn}
            />
          )}
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
  infoText: {
    color: Colors.text.secondary,
    marginBottom: Spacing.xl,
    textAlign: 'center',
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: Spacing.xl,
  },
  btn: {
    marginTop: Spacing.sm,
  },
  backBtn: {
    marginTop: Spacing.xl,
  },
  successContainer: {
    alignItems: 'center',
    padding: Spacing.md,
  },
  successEmoji: {
    fontSize: 56,
    marginBottom: Spacing.md,
  },
  successTitle: {
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  successText: {
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  successBtn: {
    width: '100%',
  },
});
