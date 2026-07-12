import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { getSunSign, getMoonSign, getRisingSign } from '../../../shared/utils/astrology';
import { CosmicBackground, GlassCard, Button, Input } from '../../../shared/components';
import { Colors, TextStyles, Spacing } from '../../../shared/theme';

export default function OnboardingScreen({ navigation }: any) {
  const {
    fullName,
    birthDate,
    birthTime,
    birthLocation,
    setFullName,
    setBirthDate,
    setBirthTime,
    setBirthLocation,
    setPendingProfile,
  } = useOnboardingStore();

  const [step, setStep] = useState(1);
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState(birthTime);
  const [locationInput, setLocationInput] = useState(birthLocation);

  const [nameError, setNameError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleNext = useCallback(() => {
    if (step === 1) {
      if (!fullName.trim()) {
        setNameError('Please enter your full name');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const parsedDate = new Date(dateInput);
      if (isNaN(parsedDate.getTime())) {
        setDateError('Please enter a valid date (YYYY-MM-DD)');
        return;
      }
      if (parsedDate > new Date()) {
        setDateError('Date cannot be in the future');
        return;
      }
      setBirthDate(parsedDate);
      setStep(3);
    } else if (step === 3) {
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(timeInput)) {
        setTimeError('Please enter a valid time (HH:MM)');
        return;
      }
      setBirthTime(timeInput);
      setStep(4);
    } else if (step === 4) {
      if (!locationInput.trim()) {
        setLocationError('Please enter your birth location');
        return;
      }
      setBirthLocation(locationInput);

      // Generate the signs
      const bDate = birthDate || new Date();
      const sunSign = getSunSign(bDate);
      const moonSign = getMoonSign(bDate, timeInput);
      const risingSign = getRisingSign(bDate, timeInput, locationInput);

      // Stage profile in onboarding store (not user store yet)
      setPendingProfile({
        name: fullName,
        birthDate: bDate.toISOString(),
        birthTime: timeInput,
        birthLocation: locationInput,
        sunSign: sunSign.name,
        moonSign: moonSign.name,
        risingSign: risingSign.name,
      });

      navigation.navigate('ProfileCreation');
    }
  }, [step, fullName, dateInput, timeInput, locationInput, birthDate, setBirthDate, setBirthTime, setBirthLocation, setPendingProfile, navigation]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step]);

  return (
    <CosmicBackground variant="onboarding">
      <SafeAreaView style={styles.container}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${(step / 4) * 100}%` }]} />
        </View>

        <View style={styles.content}>
          <GlassCard style={styles.card}>
            {step === 1 && (
              <>
                <Text style={[TextStyles.h2, styles.stepTitle]}>What should the cosmos call you?</Text>
                <Text style={[TextStyles.bodySmall, styles.stepDesc]}>Enter your name to begin personalizing your celestial blueprint.</Text>
                <Input
                  label="Full Name"
                  value={fullName}
                  onChangeText={(text) => { setFullName(text); setNameError(null); }}
                  autoCapitalize="words"
                  autoComplete="name"
                  error={nameError}
                />
              </>
            )}

            {step === 2 && (
              <>
                <Text style={[TextStyles.h2, styles.stepTitle]}>When were you born?</Text>
                <Text style={[TextStyles.bodySmall, styles.stepDesc]}>Your date of birth determines your core planetary alignments.</Text>
                <Input
                  label="Date of Birth (YYYY-MM-DD)"
                  value={dateInput}
                  onChangeText={(text) => { setDateInput(text); setDateError(null); }}
                  placeholder="e.g. 1995-10-24"
                  keyboardType="numeric"
                  error={dateError}
                />
              </>
            )}

            {step === 3 && (
              <>
                <Text style={[TextStyles.h2, styles.stepTitle]}>What time were you born?</Text>
                <Text style={[TextStyles.bodySmall, styles.stepDesc]}>Knowing your birth time yields a highly accurate Rising sign.</Text>
                <Input
                  label="Time of Birth (24-hour HH:MM)"
                  value={timeInput}
                  onChangeText={(text) => { setTimeInput(text); setTimeError(null); }}
                  placeholder="e.g. 14:30"
                  keyboardType="numeric"
                  error={timeError}
                />
              </>
            )}

            {step === 4 && (
              <>
                <Text style={[TextStyles.h2, styles.stepTitle]}>Where were you born?</Text>
                <Text style={[TextStyles.bodySmall, styles.stepDesc]}>Birth location calculates the exact local horizon offset.</Text>
                <Input
                  label="Location (City, Country)"
                  value={locationInput}
                  onChangeText={(text) => { setLocationInput(text); setLocationError(null); }}
                  placeholder="e.g. Los Angeles, USA"
                  error={locationError}
                />
              </>
            )}

            <View style={styles.actionContainer}>
              {step > 1 && (
                <Button
                  title="Back"
                  variant="ghost"
                  onPress={handleBack}
                  style={styles.backButton}
                />
              )}
              <Button
                title={step === 4 ? "Calculate My Alignment" : "Continue"}
                onPress={handleNext}
                style={[styles.button, step > 1 && styles.nextButtonCompact]}
              />
            </View>
          </GlassCard>
        </View>
      </SafeAreaView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.accent.gold,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  card: {
    padding: Spacing.xl,
  },
  stepTitle: {
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  stepDesc: {
    color: Colors.text.tertiary,
    marginBottom: Spacing.xl,
    textAlign: 'center',
    lineHeight: 20,
  },
  actionContainer: {
    marginTop: Spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  button: {
    flex: 1,
  },
  backButton: {
    flex: 0.4,
  },
  nextButtonCompact: {
    flex: 1,
  },
});
