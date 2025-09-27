import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from './shims/react-navigation-native';
import LoadingScreen from '../src/screens/LoadingScreen';

// Import screens directly to avoid navigation issues
import DashboardScreen from '../src/screens/DashboardScreen';
import TodoScreen from '../src/screens/TodoScreen';
import MatrixScreen from '../src/screens/MatrixScreen';
import PomoScreen from '../src/screens/PomoScreen';

// Simple tab-based app without React Navigation to avoid screen container issues
const SimpleIdyllicApp = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Dashboard');

    useEffect(() => {
        console.log('⏰ SimpleIdyllicApp: Starting loading sequence...');
        const loadingTimer = setTimeout(() => {
            console.log('⏰ SimpleIdyllicApp: Loading complete');
            setIsLoading(false);
        }, 4000);

        return () => clearTimeout(loadingTimer);
    }, []);

    console.log('🔍 SimpleIdyllicApp render - isLoading:', isLoading, 'activeTab:', activeTab);

    if (isLoading) {
        console.log('📱 SimpleIdyllicApp: Showing loading screen');
        try {
            return <LoadingScreen />;
        } catch (loadingError) {
            console.error('❌ Error rendering loading screen:', loadingError);
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>❌ Loading Error</Text>
                    <Text style={styles.errorDetails}>{loadingError.message}</Text>
                </View>
            );
        }
    }

    console.log('🚀 SimpleIdyllicApp: Loading complete, rendering main app');

    const renderScreen = () => {
        console.log('📱 Rendering screen for tab:', activeTab);
        
        // Mock navigation object for screens that expect it
        const mockNavigation = {
            navigate: (screen: string, params?: any) => {
                console.log('🧭 Mock navigation to:', screen, params);
                if (['Dashboard', 'Todo', 'Matrix', 'Pomodoro'].includes(screen)) {
                    setActiveTab(screen);
                }
            },
            goBack: () => console.log('🧭 Mock goBack'),
            push: (screen: string, params?: any) => console.log('🧭 Mock push:', screen, params),
            pop: () => console.log('🧭 Mock pop'),
            popToTop: () => console.log('🧭 Mock popToTop'),
            reset: () => console.log('🧭 Mock reset'),
            setParams: (params: any) => console.log('🧭 Mock setParams:', params),
            dispatch: (action: any) => console.log('🧭 Mock dispatch:', action),
        };

        const mockRoute = {
            key: activeTab,
            name: activeTab,
            params: {},
        };

        try {
            switch (activeTab) {
                case 'Dashboard':
                    console.log('🏠 Rendering Dashboard screen');
                    return <DashboardScreen navigation={mockNavigation} route={mockRoute} />;
                case 'Todo':
                    console.log('📝 Rendering Todo screen');
                    return <TodoScreen navigation={mockNavigation} route={mockRoute} />;
                case 'Matrix':
                    console.log('📊 Rendering Matrix screen');
                    return <MatrixScreen navigation={mockNavigation} route={mockRoute} />;
                case 'Pomodoro':
                    console.log('🍅 Rendering Pomodoro screen');
                    return <PomoScreen navigation={mockNavigation} route={mockRoute} />;
                default:
                    return (
                        <View style={styles.defaultScreen}>
                            <Text style={styles.defaultText}>Welcome to Idyllic!</Text>
                            <Text style={styles.defaultSubText}>Select a tab below to get started</Text>
                        </View>
                    );
            }
        } catch (error) {
            console.error('❌ Error rendering screen:', error);
            return (
                <View style={styles.errorScreen}>
                    <Text style={styles.errorText}>❌ Error loading {activeTab} screen</Text>
                    <Text style={styles.errorDetails}>{error.message}</Text>
                    <TouchableOpacity 
                        style={styles.retryButton} 
                        onPress={() => setActiveTab('Dashboard')}
                    >
                        <Text style={styles.retryText}>Go to Dashboard</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    };

    return (
        <NavigationContainer>
            <View style={styles.container}>
                {/* Main content area */}
                <View style={styles.content}>
                    {renderScreen()}
                </View>

            {/* Simple bottom tab bar */}
            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Todo' && styles.activeTab]}
                    onPress={() => setActiveTab('Todo')}
                >
                    <View style={[styles.tabIcon, { backgroundColor: activeTab === 'Todo' ? '#A2AB9B' : '#E5E5E5' }]} />
                    <Text style={[styles.tabText, activeTab === 'Todo' && styles.activeTabText]}>Todo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Matrix' && styles.activeTab]}
                    onPress={() => setActiveTab('Matrix')}
                >
                    <View style={[styles.tabIcon, { backgroundColor: activeTab === 'Matrix' ? '#A2AB9B' : '#E5E5E5' }]} />
                    <Text style={[styles.tabText, activeTab === 'Matrix' && styles.activeTabText]}>Matrix</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Dashboard' && styles.activeTab]}
                    onPress={() => setActiveTab('Dashboard')}
                >
                    <View style={[styles.tabIcon, { backgroundColor: activeTab === 'Dashboard' ? '#A2AB9B' : '#E5E5E5' }]} />
                    <Text style={[styles.tabText, activeTab === 'Dashboard' && styles.activeTabText]}>Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Pomodoro' && styles.activeTab]}
                    onPress={() => setActiveTab('Pomodoro')}
                >
                    <View style={[styles.tabIcon, { backgroundColor: activeTab === 'Pomodoro' ? '#A2AB9B' : '#E5E5E5' }]} />
                    <Text style={[styles.tabText, activeTab === 'Pomodoro' && styles.activeTabText]}>Pomodoro</Text>
                </TouchableOpacity>
            </View>
        </View>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    content: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#FAFAFA',
        borderTopWidth: 1,
        borderTopColor: '#E5DCCC',
        paddingBottom: 5,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
    },
    activeTab: {
        backgroundColor: 'rgba(162, 171, 155, 0.1)',
    },
    tabIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginBottom: 4,
    },
    tabText: {
        fontSize: 12,
        color: '#A2AB9B',
    },
    activeTabText: {
        color: '#6E6F67',
        fontWeight: 'bold',
    },
    defaultScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    defaultText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6E6F67',
        marginBottom: 10,
    },
    defaultSubText: {
        fontSize: 16,
        color: '#A2AB9B',
        textAlign: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffebee',
    },
    errorScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffebee',
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d32f2f',
        marginBottom: 10,
        textAlign: 'center',
    },
    errorDetails: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#A2AB9B',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    retryText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SimpleIdyllicApp;
