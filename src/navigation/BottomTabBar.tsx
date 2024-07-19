import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoScreen from '../screens/TodoScreen';
import EhMatrixScreen from '../screens/EhMatrixScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PomoScreen from '../screens/PomoScreen';
import CustomTabBar from './CustomTabBar';
import MoreStackNav from './MoreStackNav';

const Tab = createBottomTabNavigator();

const BottomTabBar: React.FC = () => {
    return (
        <Tab.Navigator 
            tabBar={(props) => <CustomTabBar {...props} />}
            initialRouteName="Dashboard"
            screenOptions={{ tabBarStyle: {elevation: 0} }}
        >
            <Tab.Screen name="To Do List" component={TodoScreen} options={{ tabBarLabel: () => null, headerShown: false }} />
            <Tab.Screen name="Eisenhower Matrix" component={EhMatrixScreen} options={{ tabBarLabel: () => null, headerShown: false }} />
            <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarLabel: () => null, headerShown: false }} />
            <Tab.Screen name="Pomodoro Timer" component={PomoScreen} options={{ tabBarLabel: () => null, headerShown: false }} />
            <Tab.Screen name="More" component={MoreStackNav} options={{ tabBarLabel: () => null, tabBarStyle: {display: 'none'}, headerShown: false }} />
  
        </Tab.Navigator>
    );
};

export default BottomTabBar;