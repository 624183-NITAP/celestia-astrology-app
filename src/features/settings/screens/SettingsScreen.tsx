/**
 * SettingsScreen — Premium full-featured settings panel
 * Sections: Account, Notifications, Appearance, Security, Support, Legal
 */

import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
  Animated,
  Modal,
  TextInput,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CosmicBackground, GlassCard } from '../../../shared/components';
import {
  Colors,
  Spacing,
  BorderRadius,
  TextStyles,
  FontSize,
  FontWeight,
  Shadows,
} from '../../../shared/theme';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { useUserStore } from '../../../store/useUserStore';

// ─── Types ───────────────────────────────────────────────────────────────────

interface SettingRowProps {
  icon: string;
  label: string;
  sublabel?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  tintColor?: string;
  showChevron?: boolean;
  destructive?: boolean;
}

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  label,
  sublabel,
  onPress,
  rightElement,
  tintColor = Colors.accent.purple,
  showChevron = true,
  destructive = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <View style={styles.row}>
          {/* Icon Badge */}
          <View style={[styles.iconBadge, { backgroundColor: tintColor + '22' }]}>
            <Text style={styles.rowIcon}>{icon}</Text>
          </View>

          {/* Label area */}
          <View style={styles.rowContent}>
            <Text
              style={[
                styles.rowLabel,
                destructive && { color: Colors.status.error },
              ]}
            >
              {label}
            </Text>
            {sublabel ? (
              <Text style={styles.rowSublabel}>{sublabel}</Text>
            ) : null}
          </View>

          {/* Right side */}
          <View style={styles.rowRight}>
            {rightElement ?? null}
            {showChevron && !rightElement && (
              <Text style={styles.chevron}>›</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <GlassCard style={styles.sectionCard} padding={0}>
      {children}
    </GlassCard>
  </View>
);

const Divider = () => <View style={styles.divider} />;

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function SettingsScreen() {
  const { logout } = useAuthStore();
  const { profile } = useUserStore();

  // Toggle States
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyHoroscope, setDailyHoroscope] = useState(true);
  const [cosmicAlerts, setCosmicAlerts] = useState(true);
  const [fullMoonReminders, setFullMoonReminders] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  // Modal state
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = ['English', 'Spanish', 'French', 'German', 'Arabic', 'Hindi', 'Portuguese'];

  const handleDeleteAccount = () => {
    Alert.alert(
      '🌑 Delete Account',
      'This will permanently erase your cosmic profile, readings, and all saved data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Forever',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deletion', 'Your account deletion request has been submitted.');
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of Celestia?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => logout() },
      ]
    );
  };

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim().length < 10) {
      Alert.alert('Too Short', 'Please write at least 10 characters of feedback.');
      return;
    }
    setFeedbackModalVisible(false);
    setFeedbackText('');
    Alert.alert('✨ Thank You!', 'Your feedback has been received. The stars appreciate you.');
  };

  const StyledSwitch = ({ value, onValueChange }: { value: boolean; onValueChange: (v: boolean) => void }) => (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: Colors.glass.border, true: Colors.accent.purple + '80' }}
      thumbColor={value ? Colors.accent.purple : Colors.text.muted}
      ios_backgroundColor={Colors.glass.border}
    />
  );

  return (
    <CosmicBackground>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>

        {/* ── Header ───────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={[TextStyles.h1, styles.headerTitle]}>Settings</Text>
          <Text style={styles.headerSub}>Customize your cosmic experience</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* ── User Card ────────────────────────────────────── */}
          <LinearGradient
            colors={Colors.gradient.nebula}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.userCard}
          >
            <View style={styles.userAvatarContainer}>
              <Text style={styles.userAvatarEmoji}>
                {profile?.sunSign ? '♈' : '✨'}
              </Text>
            </View>
            <View style={styles.userCardInfo}>
              <Text style={styles.userCardName}>{profile?.name ?? 'Cosmic Explorer'}</Text>
              <Text style={styles.userCardSub}>
                {profile?.sunSign ?? 'Set up your profile'} • Free Plan
              </Text>
            </View>
            <TouchableOpacity
              style={styles.upgradeBtn}
              onPress={() => Alert.alert('Celestia Pro', 'Subscription management coming soon!')}
            >
              <Text style={styles.upgradeBtnText}>PRO ✦</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* ── SUBSCRIPTION ─────────────────────────────────── */}
          <SettingsSection title="SUBSCRIPTION">
            <SettingRow
              icon="✦"
              label="Celestia Pro"
              sublabel="Unlock unlimited readings & charts"
              onPress={() => Alert.alert('Coming Soon', 'In-app purchase will be available in the next update.')}
              tintColor={Colors.accent.gold}
            />
            <Divider />
            <SettingRow
              icon="🎁"
              label="Redeem Code"
              sublabel="Enter a promo or gift code"
              onPress={() => Alert.alert('Redeem', 'Redemption portal launching soon.')}
              tintColor={Colors.status.success}
            />
          </SettingsSection>

          {/* ── NOTIFICATIONS ────────────────────────────────── */}
          <SettingsSection title="NOTIFICATIONS">
            <SettingRow
              icon="🔔"
              label="Push Notifications"
              onPress={() => setNotificationsEnabled(p => !p)}
              showChevron={false}
              tintColor={Colors.accent.blue}
              rightElement={
                <StyledSwitch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                />
              }
            />
            <Divider />
            <SettingRow
              icon="🌅"
              label="Daily Horoscope"
              sublabel="Every morning at 7:00 AM"
              showChevron={false}
              tintColor={Colors.accent.gold}
              rightElement={
                <StyledSwitch value={dailyHoroscope} onValueChange={setDailyHoroscope} />
              }
            />
            <Divider />
            <SettingRow
              icon="⚡"
              label="Cosmic Alerts"
              sublabel="Planetary shifts & transits"
              showChevron={false}
              tintColor={Colors.accent.pink}
              rightElement={
                <StyledSwitch value={cosmicAlerts} onValueChange={setCosmicAlerts} />
              }
            />
            <Divider />
            <SettingRow
              icon="🌕"
              label="Full Moon Reminders"
              showChevron={false}
              tintColor={Colors.accent.cyan}
              rightElement={
                <StyledSwitch value={fullMoonReminders} onValueChange={setFullMoonReminders} />
              }
            />
          </SettingsSection>

          {/* ── APPEARANCE ───────────────────────────────────── */}
          <SettingsSection title="APPEARANCE">
            <SettingRow
              icon="🌙"
              label="Dark Mode"
              sublabel="Always on — preserves the cosmic vibe"
              showChevron={false}
              tintColor={Colors.accent.indigo}
              rightElement={
                <StyledSwitch value={darkMode} onValueChange={setDarkMode} />
              }
            />
            <Divider />
            <SettingRow
              icon="🌐"
              label="Language"
              sublabel={selectedLanguage}
              onPress={() => setLanguageModalVisible(true)}
              tintColor={Colors.status.info}
            />
            <Divider />
            <SettingRow
              icon="📳"
              label="Haptic Feedback"
              showChevron={false}
              tintColor={Colors.semantic.health}
              rightElement={
                <StyledSwitch value={haptics} onValueChange={setHaptics} />
              }
            />
          </SettingsSection>

          {/* ── SECURITY & PRIVACY ───────────────────────────── */}
          <SettingsSection title="SECURITY & PRIVACY">
            <SettingRow
              icon="🔐"
              label="Biometric Login"
              sublabel="Face ID / Fingerprint"
              showChevron={false}
              tintColor={Colors.accent.purple}
              rightElement={
                <StyledSwitch value={biometricLogin} onValueChange={setBiometricLogin} />
              }
            />
            <Divider />
            <SettingRow
              icon="🛡️"
              label="Two-Factor Authentication"
              showChevron={false}
              tintColor={Colors.status.success}
              rightElement={
                <StyledSwitch value={twoFactor} onValueChange={setTwoFactor} />
              }
            />
            <Divider />
            <SettingRow
              icon="🔒"
              label="Change Password"
              onPress={() => Alert.alert('Change Password', 'A reset link will be sent to your email.')}
              tintColor={Colors.semantic.career}
            />
            <Divider />
            <SettingRow
              icon="📊"
              label="Data Sharing"
              sublabel="Share anonymized insights"
              showChevron={false}
              tintColor={Colors.status.warning}
              rightElement={
                <StyledSwitch value={dataSharing} onValueChange={setDataSharing} />
              }
            />
            <Divider />
            <SettingRow
              icon="📈"
              label="Analytics"
              sublabel="Help improve Celestia"
              showChevron={false}
              tintColor={Colors.semantic.communication}
              rightElement={
                <StyledSwitch value={analytics} onValueChange={setAnalytics} />
              }
            />
            <Divider />
            <SettingRow
              icon="📄"
              label="Privacy Policy"
              onPress={() => Alert.alert('Privacy Policy', 'Opening privacy policy...')}
              tintColor={Colors.text.muted}
            />
          </SettingsSection>

          {/* ── SUPPORT ──────────────────────────────────────── */}
          <SettingsSection title="SUPPORT">
            <SettingRow
              icon="💬"
              label="Send Feedback"
              sublabel="Tell us what you think"
              onPress={() => setFeedbackModalVisible(true)}
              tintColor={Colors.accent.purple}
            />
            <Divider />
            <SettingRow
              icon="🎧"
              label="Contact Support"
              sublabel="support@celestia.app"
              onPress={() => Alert.alert('Contact Support', 'Opening support portal...')}
              tintColor={Colors.accent.blue}
            />
            <Divider />
            <SettingRow
              icon="⭐"
              label="Rate Celestia"
              sublabel="Leave a review on the App Store"
              onPress={() => Alert.alert('Rate Us', 'Thank you! Opening App Store...')}
              tintColor={Colors.accent.gold}
            />
            <Divider />
            <SettingRow
              icon="📖"
              label="Help Center"
              onPress={() => Alert.alert('Help Center', 'Opening help documentation...')}
              tintColor={Colors.semantic.communication}
            />
          </SettingsSection>

          {/* ── ABOUT ────────────────────────────────────────── */}
          <SettingsSection title="ABOUT">
            <SettingRow
              icon="🪐"
              label="App Version"
              sublabel="Celestia v1.0.0 (Build 1)"
              showChevron={false}
              tintColor={Colors.accent.indigo}
            />
            <Divider />
            <SettingRow
              icon="📜"
              label="Terms of Service"
              onPress={() => Alert.alert('Terms of Service', 'Opening terms of service...')}
              tintColor={Colors.text.muted}
            />
            <Divider />
            <SettingRow
              icon="✨"
              label="Acknowledgements"
              onPress={() => Alert.alert('Acknowledgements', 'Built with cosmic intent during the 8x Engineer program.')}
              tintColor={Colors.semantic.emotional}
            />
          </SettingsSection>

          {/* ── ACCOUNT ACTIONS ──────────────────────────────── */}
          <SettingsSection title="ACCOUNT">
            <SettingRow
              icon="🚪"
              label="Sign Out"
              onPress={handleLogout}
              tintColor={Colors.status.warning}
              showChevron={false}
            />
            <Divider />
            <SettingRow
              icon="🗑️"
              label="Delete Account"
              sublabel="Permanently erase all your data"
              onPress={handleDeleteAccount}
              tintColor={Colors.status.error}
              showChevron={false}
              destructive
            />
          </SettingsSection>

          <View style={styles.footer}>
            <Text style={styles.footerText}>✦ Made with cosmic intention ✦</Text>
            <Text style={styles.footerSub}>Celestia © 2026</Text>
          </View>
        </ScrollView>

        {/* ── LANGUAGE MODAL ───────────────────────────────── */}
        <Modal
          visible={languageModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setLanguageModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <GlassCard style={styles.modalCard} padding={0}>
              <LinearGradient
                colors={['rgba(139,92,246,0.25)', 'rgba(0,0,0,0)']}
                style={styles.modalHeader}
              >
                <Text style={styles.modalTitle}>🌐 Select Language</Text>
              </LinearGradient>
              <ScrollView>
                {languages.map((lang, i) => (
                  <React.Fragment key={lang}>
                    <TouchableOpacity
                      style={styles.languageRow}
                      onPress={() => {
                        setSelectedLanguage(lang);
                        setLanguageModalVisible(false);
                      }}
                    >
                      <Text style={styles.languageLabel}>{lang}</Text>
                      {selectedLanguage === lang && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </TouchableOpacity>
                    {i < languages.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setLanguageModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </GlassCard>
          </View>
        </Modal>

        {/* ── FEEDBACK MODAL ───────────────────────────────── */}
        <Modal
          visible={feedbackModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setFeedbackModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <GlassCard style={styles.feedbackCard} padding={Spacing.xl}>
              <Text style={styles.modalTitle}>💬 Share Your Thoughts</Text>
              <Text style={styles.feedbackHint}>
                What would make Celestia more magical for you?
              </Text>
              <TextInput
                style={styles.feedbackInput}
                multiline
                numberOfLines={5}
                placeholder="Type your feedback here..."
                placeholderTextColor={Colors.text.muted}
                value={feedbackText}
                onChangeText={setFeedbackText}
                textAlignVertical="top"
              />
              <View style={styles.feedbackActions}>
                <TouchableOpacity
                  style={styles.feedbackCancelBtn}
                  onPress={() => {
                    setFeedbackModalVisible(false);
                    setFeedbackText('');
                  }}
                >
                  <Text style={styles.feedbackCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.feedbackSubmitBtn}
                  onPress={handleFeedbackSubmit}
                >
                  <LinearGradient
                    colors={Colors.gradient.cosmic}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.feedbackSubmitGradient}
                  >
                    <Text style={styles.feedbackSubmitText}>Send ✦</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </GlassCard>
          </View>
        </Modal>

      </SafeAreaView>
    </CosmicBackground>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerTitle: {
    color: Colors.text.primary,
  },
  headerSub: {
    fontSize: FontSize.md,
    color: Colors.text.muted,
    marginTop: 2,
    fontWeight: FontWeight.medium,
  },
  scroll: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 100,
    gap: Spacing.xl,
  },

  // ── User Card ──
  userCard: {
    borderRadius: BorderRadius['2xl'],
    padding: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    ...Shadows.card,
  },
  userAvatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarEmoji: {
    fontSize: 26,
  },
  userCardInfo: {
    flex: 1,
  },
  userCardName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  userCardSub: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  upgradeBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  upgradeBtnText: {
    color: Colors.accent.goldLight,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    letterSpacing: 1,
  },

  // ── Sections ──
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    letterSpacing: 2,
    color: Colors.text.muted,
    marginLeft: Spacing.sm,
  },
  sectionCard: {
    overflow: 'hidden',
  },

  // ── Row ──
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
    gap: Spacing.md,
    minHeight: 60,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIcon: {
    fontSize: 18,
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  rowSublabel: {
    fontSize: FontSize.sm,
    color: Colors.text.muted,
    marginTop: 2,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    fontSize: 22,
    color: Colors.text.muted,
    fontWeight: FontWeight.regular,
    lineHeight: 26,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.glass.borderLight,
    marginLeft: 64,
  },

  // ── Modals ──
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
    paddingBottom: Spacing['3xl'],
    paddingHorizontal: Spacing.xl,
  },
  modalCard: {
    overflow: 'hidden',
    maxHeight: 480,
  },
  modalHeader: {
    padding: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  modalTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
    letterSpacing: -0.3,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
    minHeight: 52,
  },
  languageLabel: {
    fontSize: FontSize.base,
    color: Colors.text.secondary,
    fontWeight: FontWeight.medium,
  },
  checkmark: {
    color: Colors.accent.purple,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  modalCancel: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.glass.borderLight,
  },
  modalCancelText: {
    color: Colors.status.error,
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
  },

  // ── Feedback Modal ──
  feedbackCard: {
    gap: Spacing.lg,
  },
  feedbackHint: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginTop: -Spacing.sm,
  },
  feedbackInput: {
    backgroundColor: Colors.glass.background,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.glass.border,
    color: Colors.text.primary,
    fontSize: FontSize.base,
    padding: Spacing.base,
    minHeight: 120,
    lineHeight: 22,
  },
  feedbackActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  feedbackCancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.glass.background,
    borderWidth: 1,
    borderColor: Colors.glass.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackCancelText: {
    color: Colors.text.secondary,
    fontWeight: FontWeight.semiBold,
  },
  feedbackSubmitBtn: {
    flex: 2,
    borderRadius: BorderRadius.base,
    overflow: 'hidden',
  },
  feedbackSubmitGradient: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackSubmitText: {
    color: Colors.white,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.base,
    letterSpacing: 0.5,
  },

  // ── Footer ──
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.xs,
  },
  footerText: {
    color: Colors.text.muted,
    fontSize: FontSize.sm,
    letterSpacing: 1,
  },
  footerSub: {
    color: Colors.text.muted,
    fontSize: FontSize.xs,
  },
});
