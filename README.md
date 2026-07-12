# Celestia - Astrology & Cosmic Insights App ✨

![Celestia Banner](./assets/placeholder-banner.png)

*A premium, beautifully crafted React Native application delivering personalized astrological insights, synastry tracking, and cosmic timelines.*

## 🌟 Project Overview
Celestia (originally codenamed `8xengineer`) is a feature-rich astrology application designed with a state-of-the-art "Premium Dribbble" UI/UX. It utilizes deep space gradients, intense glassmorphism, and bold editorial typography to create an immersive, ethereal user experience.

The app is built entirely with **React Native (Expo)**, relying on robust local state management via **Zustand** and highly optimized UI rendering via **Reanimated**.

## ✨ Features
- **🔐 Authentication**: Secure polished authentication wizard (Sign In, Sign Up, Guest Mode) with inline validation.
- **🚀 Guided Onboarding**: Beautiful profile creation flow to collect birth details.
- **🔮 Personalized Home Dashboard**: An interactive, dynamic dashboard tracking daily rhythms, energies, and focus.
- **✨ Daily / Weekly / Monthly / Yearly Horoscope**: Editorial-style readings tailored to the user's cosmic blueprint.
- **📊 Interactive Birth Chart**: An animated, interactive SVG natal wheel. Tap on planet badges to reveal their influence and details directly within a beautiful celestial map.
- **💕 Zodiac Compatibility**: Check relationship alignment and synastry between zodiac signs across multiple vectors (Love, Friendship, Dialogue, Bond).
- **💬 AI Chat**: Conversational AI Astrologer interface ready for integration with LLM providers.
- **👤 User Profile**: Beautifully constructed user profiles featuring glowing avatars and horizontal scrolling sign trackers (Sun, Moon, Rising).
- **💎 Glassmorphism UI**: High-end aesthetic using premium blurs, borders, and overlays.
- **🌌 Animated Cosmic Background**: Drifting, twinkling cosmic backgrounds running cleanly on the native UI thread.

## 📸 Screenshots
*(Add high-fidelity screenshots of the Home, Birth Chart, and Horoscope screens here)*

## 🛠 Tech Stack
- **Framework**: React Native & Expo SDK 57
- **Language**: TypeScript (Strict Mode)
- **State Management**: Zustand
- **Navigation**: React Navigation v7 (Bottom Tabs & Native Stack)
- **Animations**: React Native Reanimated v4 & React Native Gesture Handler
- **Graphics**: React Native SVG
- **Local Storage**: AsyncStorage
- **UI Toolkit**: Expo Blur, Expo Linear Gradient

## 🏗 Architecture
The project strictly adheres to a **Feature-Based Architecture** to ensure modularity and scalability:
- `src/features/*`: Contains domain-specific screens and local stores (e.g., `auth`, `home`, `horoscope`, `birthchart`, `compatibility`, `chat`, `profile`).
- `src/shared/*`: Houses the global design system (theme tokens), core reusable components (`GlassCard`, `ProgressRing`), utilities, and constants.
- `src/app/*`: Centralized navigation (e.g., `RootNavigator`) and app-level wrappers.
- `src/store/*`: Global user data persistence using Zustand.

## 📁 Folder Structure
```
src/
├── app/               # Root navigators and app wrappers
├── features/          # Feature domains (auth, home, horoscope, birthchart, compatibility, chat, profile, settings)
├── shared/            # Shared UI components, constants (mockData), theme definitions, utilities
└── store/             # Global Zustand stores (e.g., userStore)
```

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

## 📱 Running the project
Start the Expo development server:
```bash
npx expo start
```
*Press `i` for iOS Simulator, `a` for Android Emulator, or `w` for Web.*

## 🔮 Future Improvements
- **API Integration**: Connect the client to a live GraphQL/REST endpoint for real-time astronomical ephemeris data.
- **AI Chat Backend**: Hook the `ChatScreen` UI up to an LLM provider (e.g., OpenAI) for dynamic conversational astrology.
- **Live Ephemeris**: Integrate accurate astrological APIs for real-time planetary transits.

## 📄 License
This project is licensed under the MIT License.
