import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from './ColorTemplate';

const allMessages = [
    "Believe in yourself!",
    "Stay positive, work hard, make it happen.",
    "Don't watch the clock; do what it does. Keep going.",
    "Dream it. Believe it. Build it.",
    "Success is the sum of small efforts. You can do it!",
    "The best way of getting ahead is getting started.",
    "You are capable of amazing things!",
    "When it comes to luck, you make your own.",
    "It takes courage to grow up and become who you really are.",
    "Our dreams can come true, if we have the courage to pursue them.",
    "Believe in yourself and all that you are.",
    "The best time for new beginnings is now.",
    "You are stronger than you think.",
    "Dream big. Start small. Act now.",
    "Your only limit is your mind.",

];

const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * allMessages.length);
    return allMessages[randomIndex];
};

const MotivationalMessages: React.FC = () => {
    /* PREVIOUS IMPLEMENTATION where messages are in sequence
    const [currentMessage, setCurrentMessage] = useState<string>(allMessages[0]);

    
    useEffect(() => {
      const messageInterval = setInterval(() => {
        setCurrentMessage((previousMessage) => {
          const currentIndex = allMessages.indexOf(previousMessage);
          const nextIndex = (currentIndex + 1) % allMessages.length;
          return allMessages[nextIndex];
        });
      }, 15000); 
  
      return () => clearInterval(messageInterval); 
    }, []);
    */

    const [currentMessage, setCurrentMessage] = useState<string>(getRandomMessage());

    useEffect(() => {
        const changeMessage = () => {
            setCurrentMessage(getRandomMessage());
        };

        const intervalId = setInterval(changeMessage, 15000); 
        return () => clearInterval(intervalId);
    }, []);
  
    return (
        <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{currentMessage}</Text>
            <View style={styles.pointyAngle}></View>
        </View>
    );
};

const styles = StyleSheet.create({
messageContainer: {
    width: 258,
    height: 80,
    borderRadius: 20,
},
pointyAngle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 20,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.ascent,
    transform: [{ rotate: '-40deg' }],
    bottom: 25,
    right: -240
},
messageText: {
    fontSize: 15,
    color: colors.textPrimary,
    padding: 8,
    lineHeight: 18,
    left: 3,
    top: 3
},
});
  
export default MotivationalMessages;
