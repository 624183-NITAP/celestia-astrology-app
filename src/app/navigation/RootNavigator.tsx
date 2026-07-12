import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import SplashScreen from '../../features/auth/screens/SplashScreen';
import LoginScreen from '../../features/auth/screens/LoginScreen';
import RegisterScreen from '../../features/auth/screens/RegisterScreen';
import ForgotPasswordScreen from '../../features/auth/screens/ForgotPasswordScreen';
import OnboardingScreen from '../../features/onboarding/screens/OnboardingScreen';
import ProfileCreationScreen from '../../features/onboarding/screens/ProfileCreationScreen';

import HomeScreen from '../../features/home/screens/HomeScreen';
import HoroscopeScreen from '../../features/horoscope/screens/HoroscopeScreen';
import BirthChartScreen from '../../features/birthchart/screens/BirthChartScreen';
import CompatibilityScreen from '../../features/compatibility/screens/CompatibilityScreen';
import ChatScreen from '../../features/chat/screens/ChatScreen';
import ProfileScreen from '../../features/profile/screens/ProfileScreen';
import SettingsScreen from '../../features/settings/screens/SettingsScreen';

import { useAuthStore } from '../../features/auth/store/useAuthStore';
import { useUserStore } from '../../store/useUserStore';
import { Colors } from '../../shared/theme';

const Stack = createNativeStackNavigator();
const ProfileStackNav = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/** Nested stack: Profile → Settings */
function ProfileStack() {
  return (
    <ProfileStackNav.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStackNav.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStackNav.Screen name="Settings" component={SettingsScreen} />
    </ProfileStackNav.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.accent.gold,
        tabBarInactiveTintColor: Colors.text.muted,
        tabBarStyle: {
          backgroundColor: Colors.background.darkNavy,
          borderTopColor: Colors.glass.border,
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let icon = '✨';
          if (route.name === 'Home') icon = '🏠';
          else if (route.name === 'Horoscope') icon = '🔮';
          else if (route.name === 'Birth Chart') icon = '📊';
          else if (route.name === 'Compatibility') icon = '💕';
          else if (route.name === 'AI Chat') icon = '💬';
          else if (route.name === 'Profile') icon = '👤';

          return <Text style={{ color, fontSize: size }}>{icon}</Text>;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Horoscope" component={HoroscopeScreen} />
      <Tab.Screen name="Birth Chart" component={BirthChartScreen} />
      <Tab.Screen name="Compatibility" component={CompatibilityScreen} />
      <Tab.Screen name="AI Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { isAuthenticated } = useAuthStore();
  const { profile } = useUserStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        ) : !profile ? (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="ProfileCreation" component={ProfileCreationScreen} />
          </>
        ) : (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
