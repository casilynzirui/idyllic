import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabBar from './BottomTabBar';
import LoadingScreen from '../screens/LoadingScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createStackNavigator();

const AppStackNav = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean | null>(null);

    const checkOnboarding = async () => {
        try {
            const idyllicUsername = await AsyncStorage.getItem('IdyllicUsername');
            if (idyllicUsername) {
                console.log('Retrieved Idyllic username:', idyllicUsername);
                setIsOnboardingCompleted(true);
            } else {
                setIsOnboardingCompleted(false);
            }
        } catch (error) {
            console.error('Onboarding status error:', error);
            setIsOnboardingCompleted(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            checkOnboarding(); // To check onboarding status after loading duration
        }, 4000); // Total duration for loading screen

        return () => clearTimeout(loadingTimer); 
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ animationEnabled: false }}>
                {isOnboardingCompleted === null ? (
                    <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }}/>
                ) : !isOnboardingCompleted ? (
                    <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
                        {props => (
                            <OnboardingScreen {...props} onComplete={() => setIsOnboardingCompleted(true)}/>
                        )}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="Main" component={BottomTabBar} options={{ headerShown: false }}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppStackNav;