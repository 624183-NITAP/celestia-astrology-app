# Celestia - Astrology & Cosmic Insights App ✨

![Celestia Banner](./assets/placeholder-banner.png)

*A premium, beautifully crafted React Native application delivering personalized astrological insights, synastry tracking, and cosmic timelines.*

## 🌟 Project Overview
Celestia (originally codenamed `8xengineer`) is a feature-rich astrology application designed with a state-of-the-art "Premium Dribbble" UI/UX. It utilizes deep space gradients, intense glassmorphism, and bold editorial typography to create an immersive, ethereal user experience.

The app is built entirely with **React Native (Expo)**, relying on robust local state management via **Zustand** and highly optimized UI rendering via **Reanimated**.

## ✨ Features
- **🔮 Dynamic Horoscopes**: Daily, Weekly, Monthly, and Yearly editorial-style readings.
- **📈 Cosmic Insights**: An animated, interactive bento-box dashboard tracking mood rhythms, energy, focus, and spiritual growth using bespoke Reanimated SVG charts.
- **💕 Synastry & Compatibility**: Check relationship alignment between zodiac signs across multiple vectors (Love, Friendship, Dialogue, Bond).
- **👤 Premium Profiles**: Beautifully constructed user profiles featuring glowing avatars and horizontal scrolling sign trackers (Sun, Moon, Rising).
- **💫 Fluid Animations**: Drifting, twinkling cosmic backgrounds and interactive data rings running cleanly on the native UI thread.
- **🔐 Secure Onboarding**: Polished authentication and birth-detail collection wizard with inline validation.

## 📸 Screenshots
*(Add high-fidelity screenshots of the Home, Insights, and Horoscope screens here)*

## 🛠 Tech Stack
- **Framework**: React Native & Expo SDK (~57)
- **Language**: TypeScript (Strict Mode)
- **State Management**: Zustand
- **Navigation**: React Navigation v7 (Bottom Tabs & Native Stack)
- **Animations**: React Native Reanimated v4 & React Native Gesture Handler
- **Local Storage**: AsyncStorage
- **UI Toolkit**: `expo-blur`, `expo-linear-gradient`, `react-native-svg`

## 🏗 Architecture
The project strictly adheres to a **Feature-Based Architecture** to ensure modularity and scalability:
- `src/features/*`: Contains domain-specific screens and local stores (e.g., `auth`, `home`, `insights`).
- `src/shared/*`: Houses the global design system (theme tokens), core reusable components (`GlassCard`, `ProgressRing`), and utilities.
- `src/app/*`: Centralized navigation and app-level wrappers.
- `src/store/*`: Global user data persistence.

## 🚀 Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/624183-NITAP/celestia-astrology-app.git
   cd celestia-astrology-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the application:**
   ```bash
   npm start
   ```
   *Press `i` for iOS Simulator or `a` for Android Emulator.*

## 📁 Folder Structure
```
src/
├── app/               # Root navigators
├── features/          # Feature domains (auth, home, insights, horoscope, compatibility)
├── shared/            # Shared UI components, constants (mockData), theme definitions
└── store/             # Global Zustand stores
```

## 🔮 Future Improvements
- **API Integration**: Connect the client to a live GraphQL/REST endpoint for real-time astronomical ephemeris data.
- **AI Chat Backend**: Hook the `ChatScreen` UI up to an LLM provider (e.g., OpenAI) for dynamic conversational astrology.
- **Birth Chart Generation**: Replace the placeholder birth chart screen with complex SVG geometry calculating planetary houses.

---
*Developed as part of the 8x Engineer Assessment.*
