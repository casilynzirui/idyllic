import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MatrixScreen from '../screens/MatrixScreen';
import DoItQuadrant from '../screens/DoItQuadrantScreen';
import AddDoItQuadrant from '../screens/AddDoItQuadrantScreen';
import EditDoItQuadrant from '../screens/EditDoItQuadrantScreen';
import DecideItQuadrant from '../screens/DecideItQuadrantScreen';
import AddDecideItQuadrant from '../screens/AddDecideItQuadrantScreen';
import EditDecideItQuadrant from '../screens/EditDecideItQuadrantScreen';
import DelegateItQuadrant from '../screens/DelegateItQuadrantScreen';
import AddDelegateItQuadrant from '../screens/AddDelegateItQuadrantScreen';
import EditDelegateItQuadrant from '../screens/EditDelegateItQuadrantScreen';
import DeleteItQuadrant from '../screens/DeleteItQuadrantScreen';
import AddDeleteItQuadrant from '../screens/AddDeleteItQuadrantScreen';
import EditDeleteItQuadrant from '../screens/EditDeleteItQuadrantScreen';

const Stack = createNativeStackNavigator();

const MatrixStackNav = () => {   
    return (
        <Stack.Navigator screenOptions={{ animation: 'none' }} initialRouteName="Matrix">
            <Stack.Screen name="Matrix" component={MatrixScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DoIt" component={DoItQuadrant} options={{ headerShown: false }} />
            <Stack.Screen name="AddDoIt" component={AddDoItQuadrant} options={{ headerShown: false }} />
            <Stack.Screen name="EditDoIt" component={EditDoItQuadrant} options={{ headerShown: false }} />

            <Stack.Screen name="DecideIt" component={DecideItQuadrant} options={{ headerShown: false }} />
            <Stack.Screen name="AddDecideIt" component={AddDecideItQuadrant} options={{ headerShown: false }} />
            <Stack.Screen name="EditDecideIt" component={EditDecideItQuadrant} options={{ headerShown: false }} />

            <Stack.Screen name="DelegateIt" component={DelegateItQuadrant} options={{ headerShown: false }} />
            <Stack.Screen name="AddDelegateIt" component={AddDelegateItQuadrant} options={{ headerShown: false }} />
            <Stack.Screen name="EditDelegateIt" component={EditDelegateItQuadrant} options={{ headerShown: false }} />

            <Stack.Screen name="DeleteIt" component={DeleteItQuadrant} options={{ headerShown: false }} />
            <Stack.Screen name="AddDeleteIt" component={AddDeleteItQuadrant} options={{ headerShown: false }} />
            <Stack.Screen name="EditDeleteIt" component={EditDeleteItQuadrant} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
};

export default MatrixStackNav;