import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import colors from './Colors';


const GreetingMessage: React.FC = () => {
    const [greetingMessage, setGreetingMessage] = useState<string>('Welcome back!');
    const [initialLogin, setInitialLogin] = useState<boolean>(false);
    const isFocused = useIsFocused();
  
    useEffect(() => {
        if (isFocused) {
          if (!initialLogin) {
            // This is the first visit
            setGreetingMessage('Welcome back!');
            setInitialLogin(true); // Mark as visited
          } else {
            // Subsequent visit
            setGreetingMessage('How are you doing today?');
          }
        }
      }, [isFocused]);
  
    return (
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>{greetingMessage}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  greetingContainer: {
    width: 258,
    height: 80,
    borderRadius: 20,
  },
  greetingText: {
    fontSize: 13,
    color: colors.textPrimary,
    padding: 8,
    lineHeight: 18,
    left: 3,
    top: 3
  },
});

export default GreetingMessage;