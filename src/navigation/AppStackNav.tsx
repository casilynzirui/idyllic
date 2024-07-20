import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabBar from './BottomTabBar';
import LoadingScreen from '../screens/LoadingScreen';

const AppStackNav = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 4000);

        return () => clearTimeout(loadingTimer);
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <NavigationContainer>
            <BottomTabBar/>
        </NavigationContainer>
    );
};

export default AppStackNav;