import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';


const Stack = createNativeStackNavigator();

const MoreStackNav = () => {   
    return (
        <Stack.Navigator screenOptions={{ animation: 'none' }}>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingScreen} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
};

export default MoreStackNav;