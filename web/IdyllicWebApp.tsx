import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from './shims/safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from './shims/async-storage';

// Import all screens
import LoadingScreen from '../src/screens/LoadingScreen';
import OnboardingScreen from '../src/screens/OnboardingScreen';
import DashboardScreen from '../src/screens/DashboardScreen';
import TodoScreen from '../src/screens/TodoScreen';
import MatrixScreen from '../src/screens/MatrixScreen';
import PomoScreen from '../src/screens/PomoScreen';
import CalendarScreen from '../src/screens/CalendarScreen';
import AgendaScreen from '../src/screens/AgendaScreen';
import MoodTrackerScreen from '../src/screens/MoodTracker';
import CanvaScreen from '../src/screens/CanvaScreen';
import SettingScreen from '../src/screens/SettingScreen';

// Import Eisenhower Matrix screens
import DoItQuadrantScreen from '../src/screens/DoItQuadrantScreen';
import DecideItQuadrantScreen from '../src/screens/DecideItQuadrantScreen';
import DelegateItQuadrantScreen from '../src/screens/DelegateItQuadrantScreen';
import DeleteItQuadrantScreen from '../src/screens/DeleteItQuadrantScreen';

// Import Add/Edit screens
import AddDoItQuadrantScreen from '../src/screens/AddDoItQuadrantScreen';
import AddDecideItQuadrantScreen from '../src/screens/AddDecideItQuadrantScreen';
import AddDelegateItQuadrantScreen from '../src/screens/AddDelegateItQuadrantScreen';
import AddDeleteItQuadrantScreen from '../src/screens/AddDeleteItQuadrantScreen';
import EditDoItQuadrantScreen from '../src/screens/EditDoItQuadrantScreen';
import EditDecideItQuadrantScreen from '../src/screens/EditDecideItQuadrantScreen';
import EditDelegateItQuadrantScreen from '../src/screens/EditDelegateItQuadrantScreen';
import EditDeleteItQuadrantScreen from '../src/screens/EditDeleteItQuadrantScreen';

// Import custom components
import CustomTabBar from '../src/navigation/CustomTabBar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const DashboardStack = createStackNavigator();
const MatrixStack = createStackNavigator();
const MoreStack = createStackNavigator();

// Dashboard Stack Navigator
const DashboardStackNav = () => (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
        <DashboardStack.Screen name="Dashboards" component={DashboardScreen} />
        <DashboardStack.Screen name="Calendar" component={CalendarScreen} />
        <DashboardStack.Screen name="Agenda" component={AgendaScreen} />
        <DashboardStack.Screen name="MoodTracker" component={MoodTrackerScreen} />
        <DashboardStack.Screen name="DoIt" component={DoItQuadrantScreen} />
    </DashboardStack.Navigator>
);

// Matrix Stack Navigator
const MatrixStackNav = () => (
    <MatrixStack.Navigator screenOptions={{ headerShown: false }}>
        <MatrixStack.Screen name="Matrix" component={MatrixScreen} />
        <MatrixStack.Screen name="DoIt" component={DoItQuadrantScreen} />
        <MatrixStack.Screen name="AddDoIt" component={AddDoItQuadrantScreen} />
        <MatrixStack.Screen name="EditDoIt" component={EditDoItQuadrantScreen} />
        <MatrixStack.Screen name="DecideIt" component={DecideItQuadrantScreen} />
        <MatrixStack.Screen name="AddDecideIt" component={AddDecideItQuadrantScreen} />
        <MatrixStack.Screen name="EditDecideIt" component={EditDecideItQuadrantScreen} />
        <MatrixStack.Screen name="DelegateIt" component={DelegateItQuadrantScreen} />
        <MatrixStack.Screen name="AddDelegateIt" component={AddDelegateItQuadrantScreen} />
        <MatrixStack.Screen name="EditDelegateIt" component={EditDelegateItQuadrantScreen} />
        <MatrixStack.Screen name="DeleteIt" component={DeleteItQuadrantScreen} />
        <MatrixStack.Screen name="AddDeleteIt" component={AddDeleteItQuadrantScreen} />
        <MatrixStack.Screen name="EditDeleteIt" component={EditDeleteItQuadrantScreen} />
    </MatrixStack.Navigator>
);

// More Stack Navigator
const MoreStackNav = () => (
    <MoreStack.Navigator screenOptions={{ headerShown: false }}>
        <MoreStack.Screen name="Canvas" component={CanvaScreen} />
        <MoreStack.Screen name="Settings" component={SettingScreen} />
    </MoreStack.Navigator>
);

// Bottom Tab Navigator
const BottomTabNavigator = () => (
    <Tab.Navigator 
        tabBar={(props) => <CustomTabBar {...props} />} 
        initialRouteName="Dashboard" 
        screenOptions={{ tabBarStyle: { elevation: 0 } }}
    >
        <Tab.Screen 
            name="To Do List" 
            component={TodoScreen} 
            options={{ tabBarLabel: () => null, headerShown: false }} 
        />
        <Tab.Screen 
            name="Eisenhower Matrix" 
            component={MatrixStackNav} 
            options={{ tabBarLabel: () => null, headerShown: false }} 
        />
        <Tab.Screen 
            name="Dashboard" 
            component={DashboardStackNav} 
            options={{ tabBarLabel: () => null, headerShown: false }} 
        />
        <Tab.Screen 
            name="Pomodoro Timer" 
            component={PomoScreen} 
            options={{ tabBarLabel: () => null, headerShown: false }} 
        />
        <Tab.Screen 
            name="More" 
            component={MoreStackNav} 
            options={{ tabBarLabel: () => null, tabBarStyle: { display: 'none' }, headerShown: false }} 
        />
    </Tab.Navigator>
);

// Main App Stack Navigator with Loading and Onboarding
const AppStackNavigator = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean | null>(null);

    const checkOnboarding = async () => {
        try {
            console.log('🔍 Checking onboarding status...');
            const idyllicUsername = await AsyncStorage.getItem('IdyllicUsername');
            
            if (idyllicUsername) {
                console.log('✅ User found:', idyllicUsername);
                setIsOnboardingCompleted(true);
            } else {
                console.log('⚠️ No user found - for web demo, skipping onboarding');
                // For web demo, skip onboarding and go straight to app
                setIsOnboardingCompleted(true);
            }
        } catch (error) {
            console.error('❌ Onboarding check error:', error);
            // On error, go to main app for web demo
            setIsOnboardingCompleted(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('⏰ Starting loading sequence...');
        const loadingTimer = setTimeout(() => {
            console.log('⏰ Loading complete, checking onboarding...');
            checkOnboarding();
        }, 4000);

        return () => clearTimeout(loadingTimer);
    }, []);

    console.log('🔍 App state - isLoading:', isLoading, 'isOnboardingCompleted:', isOnboardingCompleted);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isOnboardingCompleted === null ? (
                    <Stack.Screen name="Loading" component={LoadingScreen} />
                ) : !isOnboardingCompleted ? (
                    <Stack.Screen name="Onboarding">
                        {(props) => (
                            <OnboardingScreen 
                                {...props} 
                                onComplete={() => setIsOnboardingCompleted(true)} 
                            />
                        )}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="Main" component={BottomTabNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// Main Idyllic Web App Component
const IdyllicWebApp = () => {
    console.log('🌐 IdyllicWebApp initializing...');

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <AppStackNavigator />
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
});

export default IdyllicWebApp;
