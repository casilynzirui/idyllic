# 🌸 Idyllic - Balancing Mindfulness through Productivity

![Idyllic App Banner](https://github.com/user-attachments/assets/7770404b-1ff9-41b9-81f2-2731ecb14e96)

**Final Year Project for University of London BSc Computer Science**

A comprehensive React Native productivity application that combines task management with mindfulness and mood tracking to create a balanced approach to personal productivity.

## 📱 About Idyllic

Idyllic is a holistic productivity companion that goes beyond simple task management. It integrates proven productivity methodologies with mindfulness practices to help users achieve their goals while maintaining mental well-being.

### 🎯 Core Philosophy
- **Productivity with Purpose**: Focus on what truly matters using the Eisenhower Matrix
- **Mindful Awareness**: Track moods and emotional well-being alongside tasks
- **Balanced Living**: Combine focused work sessions with mindful breaks
- **Personal Growth**: Motivational messaging and progress tracking

## ✨ Key Features

### 🏠 **Dashboard - Your Productivity Hub**
- **Personalized Greeting**: Dynamic welcome messages with user's name
- **Mood Tracker Widget**: Quick access to daily mood logging
- **Calendar Integration**: Interactive calendar with event management
- **Quick Actions**: Direct access to priority tasks from Do It quadrant
- **Visual Mood History**: 7-day mood visualization with color-coded indicators

### 📊 **Eisenhower Matrix - Priority Management**
The heart of the productivity system, implementing Stephen Covey's time management matrix:

#### **Do It Quadrant** (Urgent + Important)
- Tasks requiring immediate attention and crisis management
- Full CRUD operations with persistent storage
- Real-time task tracking and completion

#### **Decide It Quadrant** (Important + Not Urgent)  
- Strategic planning and goal setting
- Long-term project planning and personal development
- Prevention and preparation activities

#### **Delegate It Quadrant** (Urgent + Not Important)
- Tasks that can be assigned to others
- Time-sensitive but non-critical items
- Interruption and meeting management

#### **Delete It Quadrant** (Not Urgent + Not Important)
- Time-wasting activities to eliminate
- Distractions and busy work identification
- Conscious choice to reduce non-productive activities

### 📝 **Todo Management**
- **Smart Task Creation**: Intuitive task addition interface
- **In-place Editing**: Modify tasks without navigation
- **Completion Tracking**: Visual feedback for task completion
- **Recovery System**: View and restore deleted tasks
- **Persistent Storage**: Local data storage with AsyncStorage

### 🍅 **Pomodoro Timer - Focused Work Sessions**
- **25-minute Focus Sessions**: Scientifically-backed work intervals
- **5-minute Breaks**: Automatic break reminders
- **Visual Timer**: Large, easy-to-read countdown display
- **Session Controls**: Start, stop, and reset functionality
- **Automatic Transitions**: Seamless switching between focus and break modes
- **Character Feedback**: Imiley character provides visual state cues

### 🎭 **Mood Tracking & Mindfulness**
Daily emotional awareness with 7 distinct moods:
- 😸 **Kitty** (Playful/Happy) - Pink theme
- 😵 **Stun** (Surprised/Energetic) - Green theme
- 😢 **Sad** (Down/Melancholy) - Blue theme
- 😴 **Sleepy** (Tired/Relaxed) - Purple theme
- 😏 **Smirk** (Confident/Satisfied) - Yellow theme
- 🤨 **Eyebrow** (Skeptical/Thoughtful) - Orange theme
- 😊 **Happy** (Content/Joyful) - Light theme

**Features:**
- Calendar integration for mood history
- Visual mood analytics and patterns
- Emotional awareness promotion

### 📅 **Calendar & Agenda System**
- **Interactive Calendar**: Month view with date selection
- **Event Management**: Create, edit, and manage agenda items
- **Daily Planning**: Organize tasks and events by date
- **Visual Indicators**: Marked dates for events and mood entries

### 🎨 **Canvas & Creative Space**
- **Digital Canvas**: Skia-powered drawing and sketching
- **Creative Expression**: Mindful drawing and doodling
- **Visual Planning**: Mind mapping and visual organization

## 🏗️ Technical Architecture

### **Frontend Framework**
- **React Native 0.74.3**: Cross-platform mobile development
- **TypeScript 5.0.4**: Type-safe development with enhanced IDE support
- **React Navigation 6.x**: Complex navigation flows with stack and tab navigators

### **Key Dependencies**
```json
{
  "@react-navigation/bottom-tabs": "^6.6.1",
  "@react-navigation/native": "^6.1.18", 
  "@react-navigation/native-stack": "^6.10.1",
  "@react-navigation/stack": "^6.4.1",
  "@react-native-async-storage/async-storage": "^1.24.0",
  "react-native-calendars": "^1.1306.0",
  "@shopify/react-native-skia": "^1.3.11",
  "react-native-gesture-handler": "^2.17.1",
  "react-native-safe-area-context": "^4.10.8"
}
```

### **Project Structure**
```
idyllic/
├── src/
│   ├── screens/           # 23 application screens
│   │   ├── DashboardScreen.tsx      # Main dashboard
│   │   ├── TodoScreen.tsx           # Task management
│   │   ├── MatrixScreen.tsx         # Eisenhower Matrix overview
│   │   ├── PomoScreen.tsx           # Pomodoro timer
│   │   ├── MoodTracker.tsx          # Mood tracking interface
│   │   ├── LoadingScreen.tsx        # App initialization
│   │   ├── OnboardingScreen.tsx     # User setup flow
│   │   └── [Quadrant Screens]       # Matrix CRUD operations
│   ├── navigation/        # Navigation architecture
│   │   ├── AppStackNav.tsx          # Main app navigation
│   │   ├── BottomTabBar.tsx         # Tab navigation
│   │   ├── CustomTabBar.tsx         # Custom tab bar component
│   │   └── [Stack Navigators]       # Section-specific navigation
│   ├── components/        # 9 reusable UI components
│   │   ├── CalendarWidget.tsx       # Dashboard calendar widget
│   │   ├── MoodTrackerWidget.tsx    # Mood tracking widget
│   │   ├── GreetingMessage.tsx      # Personalized greetings
│   │   ├── LoadingBar.tsx           # Loading progress indicator
│   │   └── [Other Components]       # UI utilities and widgets
│   └── assets/            # 42 image assets
├── android/               # Android build configuration
├── ios/                   # iOS build configuration  
├── web/                   # Web demo (experimental)
└── __tests__/             # Test files
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18
- **React Native CLI** or **Expo CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd idyllic
```

2. **Install dependencies**
```bash
npm install
```

3. **iOS Setup** (macOS only)
```bash
cd ios && pod install && cd ..
```

4. **Run the application**

For Android:
```bash
npm run android
```

For iOS:
```bash
npm run ios
```

For development server:
```bash
npm start
```

## 🎮 How to Use Idyllic

### **First Launch**
1. **Loading Experience**: Enjoy the 4-second loading animation with Imiley character
2. **Onboarding**: Set up your username and learn about app features
3. **Dashboard Welcome**: Receive personalized greeting and explore interface

### **Daily Workflow**
1. **Morning Check-in**: Log your mood and review dashboard
2. **Task Prioritization**: Use Eisenhower Matrix to categorize tasks
3. **Focused Work**: Start Pomodoro sessions for important tasks
4. **Progress Tracking**: Monitor completion and mood throughout day
5. **Evening Reflection**: Review accomplishments and plan tomorrow

## 🎨 Design System

### **Color Palette**
- **Primary**: `#A2AB9B` (Sage Green) - Calming and productive
- **Accent**: `#E5DCCC` (Warm Beige) - Soft and welcoming  
- **Background**: `#FAFAFA` (Light Gray) - Clean and minimal
- **Text Primary**: `#6E6F67` (Dark Gray) - Readable and professional

### **Character Design**
- **Imiley**: Custom mascot character providing emotional feedback
- **7 Mood States**: Each mood has distinct visual representation
- **Interactive Elements**: Character responds to user actions and timer states

## 🔧 Development

### **Available Scripts**
- `npm start`: Start React Native development server
- `npm run android`: Build and run on Android device/emulator
- `npm run ios`: Build and run on iOS device/simulator
- `npm run lint`: Run ESLint for code quality
- `npm test`: Run Jest tests

### **Technical Highlights**
- **23 Screens**: Comprehensive app functionality
- **9 Components**: Reusable UI building blocks
- **42 Assets**: Custom icons and character images
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized for smooth mobile experience

## 🧠 Productivity Methodology

### **Eisenhower Matrix Implementation**
Based on Stephen Covey's "7 Habits of Highly Effective People"

### **Pomodoro Technique Integration**
- 25-minute focused work sessions
- 5-minute recovery breaks
- Automatic mode transitions

### **Mindfulness Integration**
- Daily emotional check-ins
- Visual progress tracking
- Motivational reinforcement

---

**Developed with ❤️ for balanced productivity and mindful living**

*University of London BSc Computer Science Final Year Project*
