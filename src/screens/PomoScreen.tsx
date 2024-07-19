import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PomodoroScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pomodoro Timer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default PomodoroScreen;