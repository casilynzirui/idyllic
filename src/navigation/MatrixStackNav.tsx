import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MatrixScreen from '../screens/MatrixScreen';
import DoItQuadrant from '../screens/DoItQuadrant';

const Stack = createNativeStackNavigator();

const MatrixStackNav = () => {   
    return (
        <Stack.Navigator screenOptions={{ animation: 'none' }} initialRouteName="Matrix">
            <Stack.Screen name="Matrix" component={MatrixScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DoIt" component={DoItQuadrant} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
};

export default MatrixStackNav;