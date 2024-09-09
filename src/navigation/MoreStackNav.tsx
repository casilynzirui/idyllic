import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CanvaScreen from '../screens/CanvaScreen';
import SettingScreen from '../screens/SettingScreen';


const Stack = createNativeStackNavigator();

const MoreStackNav = () => {   
    return (
        <Stack.Navigator screenOptions={{ animation: 'none' }}>
            <Stack.Screen name="Canvas" component={CanvaScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default MoreStackNav;