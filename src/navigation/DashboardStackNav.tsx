import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AgendaScreen from '../screens/AgendaScreen';
import MoodTrackerScreen from '../screens/MoodTracker';
import DoItQuadrant from '../screens/DoItQuadrantScreen';

const Stack = createNativeStackNavigator();

const DashboardStackNav = () => {   
    return (
        <Stack.Navigator screenOptions={{ animation: 'none' }} initialRouteName="Dashboard">
            <Stack.Screen name="Dashboards" component={DashboardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Agenda" component={AgendaScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MoodTracker" component={MoodTrackerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DoIt" component={DoItQuadrant} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
};

export default DashboardStackNav;