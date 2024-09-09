import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LoadingBar from '../components/LoadingBar';
import colors from '../components/ColorTemplate';

const LoadingScreen: React.FC = () => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingStage, setLoadingStage] = useState<'appIcon' | 'appName' | 'loading'>('appIcon');

    useEffect(() => {
        const iconTimer = setTimeout(() => {
        if (loadingStage === 'appIcon') {
            setLoadingStage('loading');
        }
        }, 1000);

        return () => clearTimeout(iconTimer);
    }, [loadingStage]);

    useEffect(() => {
        if (loadingStage === 'loading') {
        const progressInterval = setInterval(() => {
            setLoadingProgress(prev => {
            if (prev < 1) {
                return prev + 0.1;
            } else {
                clearInterval(progressInterval);
                return prev;
            }
            });
        }, 200);

        return () => clearInterval(progressInterval);
        }
    }, [loadingStage]);

    const handleIconPress = () => {
        setLoadingStage('appName');
        setTimeout(() => {
        setLoadingStage('loading');
        }, 1000);
    };

    return (
        <View style={styles.container}>

        {loadingStage === 'appIcon' && (
            <TouchableOpacity onPress={handleIconPress}>
            <Image source={require('../assets/imiley_loading.png')} style={styles.appIcon} />
            </TouchableOpacity>
        )}
        {loadingStage === 'appName' && <Text style={styles.appName}>Idyllic</Text>}
        {loadingStage === 'loading' && <LoadingBar loadingPercentage={loadingProgress} />}
        
        </View>
    );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background
},
appIcon: {
    width: 93,
    height: 30,
},
appName: {
    fontSize: 30,
    color: colors.primary
},
hiddenView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.white, 
},
});

export default LoadingScreen;