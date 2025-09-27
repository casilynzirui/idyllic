import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from './shims/react-navigation-native';
import LoadingScreen from '../src/screens/LoadingScreen';

// Import main screens
import DashboardScreen from '../src/screens/DashboardScreen';
import TodoScreen from '../src/screens/TodoScreen';
import MatrixScreen from '../src/screens/MatrixScreen';
import PomoScreen from '../src/screens/PomoScreen';

// Import your custom tab bar component
import CustomTabBar from '../src/navigation/CustomTabBar';

// Working Idyllic App with your real screens but simplified navigation
const WorkingIdyllicApp = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Dashboard');

    useEffect(() => {
        console.log('⏰ WorkingIdyllicApp: Starting loading sequence...');
        const loadingTimer = setTimeout(() => {
            console.log('⏰ WorkingIdyllicApp: Loading complete, showing main app');
            setIsLoading(false);
        }, 4000);

        return () => clearTimeout(loadingTimer);
    }, []);

    console.log('🔍 WorkingIdyllicApp render - isLoading:', isLoading, 'activeTab:', activeTab);

    if (isLoading) {
        console.log('📱 WorkingIdyllicApp: Showing loading screen');
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

    console.log('🚀 WorkingIdyllicApp: Loading complete, rendering main app');

    const renderScreen = () => {
        console.log('📱 Rendering screen for tab:', activeTab);
        
        // Enhanced mock navigation object that matches what your screens expect
        const mockNavigation = {
            navigate: (screen: string, params?: any) => {
                console.log('🧭 Navigation to:', screen, params);
                // Handle navigation between main tabs
                if (['Dashboard', 'Todo', 'Matrix', 'Pomodoro'].includes(screen)) {
                    setActiveTab(screen);
                }
                // Handle sub-navigation within tabs (like going to specific quadrants)
                if (screen.includes('It') || screen.includes('Calendar') || screen.includes('Mood')) {
                    console.log('🧭 Sub-navigation to:', screen);
                    // For web demo, we can just log these or implement specific handlers
                }
            },
            goBack: () => {
                console.log('🧭 Mock goBack');
                setActiveTab('Dashboard'); // Simple fallback
            },
            push: (screen: string, params?: any) => console.log('🧭 Mock push:', screen, params),
            pop: () => console.log('🧭 Mock pop'),
            popToTop: () => console.log('🧭 Mock popToTop'),
            reset: () => console.log('🧭 Mock reset'),
            setParams: (params: any) => console.log('🧭 Mock setParams:', params),
            dispatch: (action: any) => console.log('🧭 Mock dispatch:', action),
            setOptions: (options: any) => console.log('🧭 Mock setOptions:', options),
            isFocused: () => true,
            canGoBack: () => false,
            getId: () => `mock-${activeTab}`,
            getParent: () => null,
            getState: () => ({ 
                index: ['Todo', 'Matrix', 'Dashboard', 'Pomodoro'].indexOf(activeTab),
                routes: [
                    { key: 'Todo', name: 'To Do List' },
                    { key: 'Matrix', name: 'Eisenhower Matrix' },
                    { key: 'Dashboard', name: 'Dashboard' },
                    { key: 'Pomodoro', name: 'Pomodoro Timer' },
                ]
            }),
        };

        const mockRoute = {
            key: `${activeTab}-route`,
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
                            <Text style={styles.defaultSubText}>Your productivity companion</Text>
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

    // Mock tab bar props for CustomTabBar
    const mockTabBarProps = {
        state: {
            index: ['To Do List', 'Eisenhower Matrix', 'Dashboard', 'Pomodoro Timer'].indexOf(
                activeTab === 'Todo' ? 'To Do List' :
                activeTab === 'Matrix' ? 'Eisenhower Matrix' :
                activeTab === 'Pomodoro' ? 'Pomodoro Timer' : 'Dashboard'
            ),
            routes: [
                { key: 'todo', name: 'To Do List' },
                { key: 'matrix', name: 'Eisenhower Matrix' },
                { key: 'dashboard', name: 'Dashboard' },
                { key: 'pomodoro', name: 'Pomodoro Timer' },
                { key: 'more', name: 'More' },
            ]
        },
        descriptors: {},
        navigation: {
            navigate: (routeName: string) => {
                console.log('🧭 Tab navigation to:', routeName);
                switch (routeName) {
                    case 'To Do List':
                        setActiveTab('Todo');
                        break;
                    case 'Eisenhower Matrix':
                        setActiveTab('Matrix');
                        break;
                    case 'Dashboard':
                        setActiveTab('Dashboard');
                        break;
                    case 'Pomodoro Timer':
                        setActiveTab('Pomodoro');
                        break;
                    case 'More':
                        console.log('🧭 More tab - showing options');
                        break;
                }
            }
        }
    };

    return (
        <NavigationContainer>
            <View style={styles.container}>
                {/* Main content area */}
                <View style={styles.content}>
                    {renderScreen()}
                </View>

                {/* Use your actual CustomTabBar component */}
                <CustomTabBar {...mockTabBarProps} />
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

export default WorkingIdyllicApp;
