import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import colors from './ColorTemplate';
import { getIdyllicUsername } from './GetItem';

const allGreetings = [
    "How are you doing today?",
    "It's a beautiful day.",
    "Hope you're having a great day!",
    "Nice to see you again!",
    "Welcome back!"
]

const getRandomGreeting = () => {
    const randomIndex = Math.floor(Math.random() * allGreetings.length);
    return allGreetings[randomIndex];
  };

const GreetingMessage: React.FC = () => {
    const [greetingMessage, setGreetingMessage] = useState<string>('');
    const [initialLogin, setInitialLogin] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const [displayUsername, setDisplayUsername] = useState<string | null>(null);

    useEffect(() => {
        if (isFocused) {
            const fetchDisplayUsername = async () => {
                try {
                    const idyllicUsername = await getIdyllicUsername(); // Fetching idyllic username
                    setDisplayUsername(idyllicUsername); // Set username and update state
                } catch (error) {
                    console.error('Error fetching username:', error);
                }
            };

            fetchDisplayUsername();
        }
    }, [isFocused]); 

    useEffect(() => {
        if (isFocused) {
            if (displayUsername !== null) {
                if (!initialLogin) {
                    // Initial login to app
                    setGreetingMessage(`Hello, ${displayUsername}!`);
                    setInitialLogin(true); // Mark app as visited
                } else {
                    // Subsequent visit to dashboard
                    setGreetingMessage(getRandomGreeting());
                }
            }
        }           
    }, [isFocused, displayUsername]);

    return (
        <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>{greetingMessage}</Text>
            <View style={styles.pointyAngle}></View>
        </View>
    );
};

const styles = StyleSheet.create({
greetingContainer: {
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
    bottom: 10,
    right: -240
},
greetingText: {
    fontSize: 15,
    color: colors.textPrimary,
    padding: 8,
    lineHeight: 18,
    left: 3,
    top: 3
    },
});

export default GreetingMessage;