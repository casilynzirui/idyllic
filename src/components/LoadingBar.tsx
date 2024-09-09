import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import colors from './ColorTemplate';

interface LoadingBarProps {
    loadingPercentage: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ loadingPercentage }) => {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: loadingPercentage,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [loadingPercentage]);

    const widthInterpolated = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.loadingBar, { width: widthInterpolated }]} />
        </View>
    );
};

const styles = StyleSheet.create({
container: {
    height: 10,
    width: '60%',
    backgroundColor: colors.ascent,
    borderRadius: 5,
    overflow: 'hidden',
},
loadingBar: {
    height: '100%',
    backgroundColor: colors.primary
},
});

export default LoadingBar;