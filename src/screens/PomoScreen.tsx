import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'; 
import colors from '../components/ColorTemplate';
import MotivationalMessages from '../components/MotivationalMessage';

const focusTime = 25 * 60 * 1000;
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
            <View style={styles.headerContainer}>
                <View style={styles.motivationalContainer}>
                    <MotivationalMessages />
                </View>
                <View style={styles.imileyContainer}>
                    <Image source={require('../assets/imiley_loading.png')} style={styles.imileyIcon} />
                </View>
            </View>

            <View style={styles.pomoContainer}>
                {timerMode === "Focus" ? (
                    <>
                        <View style={styles.timerContainer}>
                            <Image source={require('../assets/imiley_loading.png')} style={styles.imileyIcon2} />

                            <TouchableOpacity 
                                style={isTimerStart ? styles.buttonContainer : styles.buttonContainer} 
                                onPress={handleButtonPress}
                                activeOpacity={1}
                            >      
                                <Image
                                    style={styles.buttonIcon}
                                    source={isTimerStart ? require('../assets/stopbutton.png') : require('../assets/playbutton.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.timerText}>{timerDate.getMinutes().toString().padStart(2, "0")} : {timerDate.getSeconds().toString().padStart(2, "0")}</Text>
                        <TouchableOpacity 
                                style={styles.resetButton} 
                                onPress={resetTimer}
                        >
                            <Image source={require('../assets/resetbutton.png')} style={styles.buttonIcon} />

                        </TouchableOpacity> 
                    </> 
                ) : (
                    <>
                        <View style={styles.breakContainer}>
                            <Text style={styles.breakText}> It's time for a break!</Text>

                            <Text style={styles.timerText2}>{timerDate.getMinutes().toString().padStart(2, "0")} : {timerDate.getSeconds().toString().padStart(2, "0")}</Text>


                            <TouchableOpacity 
                                style={isTimerStart ? styles.buttonContainer2 : styles.buttonContainer2} 
                                onPress={handleButtonPress}
                                activeOpacity={1}
                            >      
                                <Image
                                    style={styles.buttonIcon}
                                    source={isTimerStart ? require('../assets/stopbutton.png') : require('../assets/playbutton.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity 
                                style={styles.resetButton2} 
                                onPress={resetTimer}
                        >
                            <Image source={require('../assets/resetbutton.png')} style={styles.buttonIcon} />

                        </TouchableOpacity> 
                    </>
                )}
            </View>

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
headerContainer: {
    flexDirection: 'row', 
    bottom: 15,
},
motivationalContainer:{
    width: 263,
    height: 60,
    backgroundColor: colors.ascent,
    marginRight: 15,
    borderRadius: 20,
},
imileyContainer: {
    width: 60,
    height: 60,
    backgroundColor: colors.ascent,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
},
imileyIcon: {
    width: 34,
    height: 11
},
imileyIcon2: {
    width: 110,
    height: 35,
    bottom: -10
},
pomoContainer: {
    width: 338,
    height: 570,
    backgroundColor: colors.primary,
    borderRadius: 10,
    top: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
},
timerContainer: {
    width: 225,
    height: 225,
    backgroundColor: colors.ascent,
    borderRadius: 225,
    justifyContent: 'center',
    alignItems: 'center',
    top: -10
},
timerText: {
    fontSize: 45,  
    color: colors.textPrimary, 
    bottom: -35
},
timerText2: {
    fontSize: 45,  
    color: colors.textPrimary, 
    bottom: 10
},
breakContainer: {
    width: 235,
    height: 385,
    backgroundColor: colors.ascent,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -20,
},
breakText: {
    fontSize: 20,  
    color: colors.textPrimary, 
    top: -40
},
buttonContainer: {
    backgroundColor: colors.primary, 
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    borderRadius: 55,
    bottom: -40
},
buttonContainer2: {
    backgroundColor: colors.ascent, 
    borderColor: colors.alternate,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    borderRadius: 55,
    bottom: -45
},
resetButton: {
    padding: 10,
    alignItems: 'center',
    bottom: -118,
    left: -140
},
resetButton2: {
    padding: 10,
    alignItems: 'center',
    bottom: -65,
    left: -140
},
buttonIcon: {
    width: 30,
    height: 30,
},
addButton: {
    backgroundColor: '#122437', 
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