import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import colors from '../components/ColorTemplate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const SettingScreen: React.FC = () => {  
    // To clear AsyncStorage and navigate back to onboarding screen
    const handleClearData = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage cleared');
        RNRestart.Restart();

      } catch (error) {
        console.error('Error clearing data:', error);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Settings</Text>
        <Button title="Clear Data and Logout" onPress={handleClearData} />
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
  text: {
    fontSize: 20,
  },
});

export default SettingScreen;