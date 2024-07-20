import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import colors from '../components/Colors';

const focusTime = 0.2 * 60 * 1000;
const breakTime = 5 * 60 * 1000;

const PomodoroScreen = () => {
  const [timerCount, setTimerCount] = useState<number>(focusTime);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);
  const [isTimerStart, setIsTimerStart] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<"Focus" | "Break">("Focus");
  

  useEffect(() => {
    if (timerCount == 0) {
      if (timerMode == 'Focus') {
        setTimerMode('Break');
        setTimerCount(breakTime);
      } else {
        setTimerMode('Focus');
        setTimerCount(focusTime);
      }
      stopTimer();
    }
  }, [timerCount])

  const startTimer = () => {
    setIsTimerStart(true);
    const id = setInterval(() => setTimerCount(prev => prev - 1000), 1000) as unknown as number;
    setTimerInterval(id);
  };

  const stopTimer = () => {
    if(timerInterval != null) {
      clearInterval(timerInterval);
    }
    setIsTimerStart(false);
  };

  const resetTimer = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setTimerCount(focusTime);
    setIsTimerStart(false);
  };


  const handleButtonPress = () => {
    if (isTimerStart) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const timerDate = new Date(timerCount);


  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={isTimerStart ? styles.stopButton : styles.startButton} 
        onPress={handleButtonPress}
      >      
      </TouchableOpacity>
      <Text>{timerDate.getMinutes().toString().padStart(2, "0")} : {timerDate.getSeconds().toString().padStart(2, "0")}</Text>
      <TouchableOpacity 
          style={styles.resetButton} 
          onPress={resetTimer}
      >
      </TouchableOpacity>

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
  startButton: {
    backgroundColor: '#007BFF', // Button color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#007B97', // Button color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#12BBB7', // Button color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#122437', // Button color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  reduceButton: {
    backgroundColor: '#FFF000', // Button color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  }
});

export default PomodoroScreen;