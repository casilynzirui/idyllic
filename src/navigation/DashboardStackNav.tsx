import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AgendaScreen from '../screens/AgendaScreen';

const Stack = createNativeStackNavigator();

const DashboardStackNav = () => {   
    return (
        <Stack.Navigator screenOptions={{ animation: 'none' }} initialRouteName="Dashboard">
            <Stack.Screen name="Dashboards" component={DashboardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Agenda" component={AgendaScreen} options={{ headerShown: false }} />

        </Stack.Navigator>

    );
};

export default DashboardStackNav;