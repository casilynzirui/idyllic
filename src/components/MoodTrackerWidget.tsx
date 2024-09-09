import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DashboardStackNavigationProp } from '../navigation/NavigationTypes';
import colors from './ColorTemplate';

const MoodTrackerWidget = () => {
  const navigation = useNavigation<DashboardStackNavigationProp>();

  return (
    <View style={styles.trackerContainer}>
        <TouchableOpacity style={styles.trackerHeader} onPress={() => navigation.navigate('MoodTracker')}>
            <Text style={styles.trackerText}>How are you feeling today?</Text>
            <Image source={require('../assets/back.png')} style={styles.forwardIcon} />
        </TouchableOpacity>
    </View>
  
  );
};

const styles = StyleSheet.create({
trackerContainer: {
    padding: 10,
    borderRadius: 10,
},
trackerHeader: {
    flexDirection: 'row',
},
trackerText: {
    color: colors.textPrimary,
    right: -10,
    bottom: -5,
    fontWeight: '500',
    fontSize: 16
},
forwardIcon: {
    width: 20,
    height: 20,
    transform: [{ rotate: '180deg' }],
    right: -95,
    bottom: -5,
}
});

export default MoodTrackerWidget;
