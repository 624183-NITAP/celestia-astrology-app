import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../../store/useUserStore';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { CosmicBackground, GlassCard, Button } from '../../../shared/components';
import { Colors, TextStyles, Spacing, FontSize, FontWeight, BorderRadius } from '../../../shared/theme';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { profile, setProfile } = useUserStore();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    setProfile(null);
  };

  return (
    <CosmicBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={[TextStyles.h1, styles.headerTitle]}>Cosmic Profile</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Avatar and name summary */}
          <View style={styles.profileHero}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarGlow} />
              <View style={styles.avatar}>
                <Text style={styles.avatarIcon}>✨</Text>
              </View>
            </View>
            <Text style={[TextStyles.displaySmall, styles.name]}>{profile?.name || 'Traveler'}</Text>
            <Text style={[TextStyles.label, styles.meta]}>
              BORN IN {profile?.birthLocation?.toUpperCase() || 'THE COSMOS'}
            </Text>
          </View>

          {/* The Big Three - Horizontal Scrolling Pills */}
          <View style={styles.bigThreeSection}>
            <Text style={[TextStyles.h4, styles.sectionTitle]}>Your Celestial Core</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bigThreeScroll}>
              <GlassCard style={styles.signPill} variant="gold" padding={Spacing.md}>
                <Text style={styles.signPillLabel}>☀️ SUN</Text>
                <Text style={[TextStyles.h3, styles.signPillValue]}>{profile?.sunSign || 'Unknown'}</Text>
              </GlassCard>
              <GlassCard style={styles.signPill} variant="elevated" padding={Spacing.md}>
                <Text style={styles.signPillLabel}>🌙 MOON</Text>
                <Text style={[TextStyles.h3, styles.signPillValue]}>{profile?.moonSign || 'Unknown'}</Text>
              </GlassCard>
              <GlassCard style={styles.signPill} variant="accent" padding={Spacing.md}>
                <Text style={styles.signPillLabel}>⬆️ RISING</Text>
                <Text style={[TextStyles.h3, styles.signPillValue]}>{profile?.risingSign || 'Unknown'}</Text>
              </GlassCard>
            </ScrollView>
          </View>

          {/* Configuration List */}
          <GlassCard style={styles.settingsCard} padding={Spacing.lg}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Birth Coordinates</Text>
              <Text style={styles.value}>{profile?.birthTime || 'N/A'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.label}>Account Status</Text>
              <Text style={styles.value}>Active Voyager</Text>
            </View>
          </GlassCard>

          {/* Settings shortcut */}
          <TouchableOpacity
            style={styles.settingsRow}
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={0.7}
          >
            <View style={styles.settingsRowLeft}>
              <Text style={styles.settingsRowIcon}>⚙️</Text>
              <Text style={styles.settingsRowLabel}>Settings</Text>
            </View>
            <Text style={styles.settingsRowChevron}>›</Text>
          </TouchableOpacity>

          {/* Action buttons */}
          <Button
            title="Log Out Profile"
            variant="danger"
            onPress={handleLogout}
            style={styles.logoutBtn}
          />
        </ScrollView>
      </SafeAreaView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    color: Colors.text.primary,
    fontWeight: '700',
  },
  scrollContainer: {
    padding: Spacing.xl,
    gap: Spacing.xl,
  },
  profileHero: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    width: '100%',
    marginBottom: Spacing.md,
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  avatarGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.accent.purple,
    opacity: 0.3,
    transform: [{ scale: 1.2 }],
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(20, 20, 50, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.accent.gold,
  },
  avatarIcon: {
    fontSize: 48,
  },
  name: {
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  meta: {
    color: Colors.accent.goldLight,
    letterSpacing: 2,
  },
  bigThreeSection: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  bigThreeScroll: {
    gap: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  signPill: {
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signPillLabel: {
    color: Colors.text.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: Spacing.xs,
  },
  signPillValue: {
    color: Colors.text.primary,
  },
  settingsCard: {
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  label: {
    color: Colors.text.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.glass.borderLight,
    marginVertical: Spacing.sm,
  },
  logoutBtn: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.glass.background,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.glass.border,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
    minHeight: 56,
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  settingsRowIcon: {
    fontSize: 22,
  },
  settingsRowLabel: {
    color: Colors.text.primary,
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
  },
  settingsRowChevron: {
    color: Colors.text.muted,
    fontSize: 24,
    lineHeight: 28,
  },
});
