import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../components/ColorTemplate';
import MotivationalMessages from '../components/MotivationalMessage';
import { CalendarList } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { DashboardStackNavigationProp } from '../navigation/NavigationTypes';

const trackerMoods = [
    { name: 'Kitty', color: colors.pinkMood, image: require('../assets/kitty_imiley.png') },
    { name: 'Stun', color: colors.greenMood, image: require('../assets/stun_imiley.png')  },
    { name: 'Sad', color: colors.blueMood, image: require('../assets/sad_imiley.png') },
    { name: 'Sleepy', color: colors.purpleMood, image: require('../assets/sleepy_imiley.png') },
    { name: 'Smirk', color: colors.yellowMood, image: require('../assets/smirk_imiley.png')   },
    { name: 'Eyebrow', color: colors.orangeMood, image: require('../assets/eyebrow_imiley.png')  },
    { name: 'Remove', color: colors.greyMood, image: require('../assets/happy_imiley.png')  },
];

    export const fetchMoodTrackerData = async (): Promise<{ [date: string]: string }> => {
    try {
        const data = await AsyncStorage.getItem('moodTrackerData');
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Failed to fetch mood data:', error);
        return {};
    }
    };

    const MoodTrackerScreen = () => {
        const navigation = useNavigation<DashboardStackNavigationProp>();
        const [moodTrackerData, setMoodTrackerData] = useState<{ [key: string]: string }>({});
        const [moodModalVisible, setMoodModalVisible] = useState(false);
        const [selectedDate, setSelectedDate] = useState('');
        const [selectedMood, setSelectedMood] = useState<string | null>(null);
        
        useEffect(() => {
            const loadMoodTrackerData = async () => {
                try {
                    const savedMoodTrackerData = await AsyncStorage.getItem('moodTrackerData');
                    if (savedMoodTrackerData) {
                        setMoodTrackerData(JSON.parse(savedMoodTrackerData));
                    }
                } catch (error) {
                    console.error('Error loading mood data:', error);
                }
            };

            loadMoodTrackerData();
        }, []);

        const toggleMoodModal = () => {
        setMoodModalVisible(!moodModalVisible);
        };
    
        const handleMoodSelect = async (mood: string) => {
            try {
                const updatedMoodTrackerData = {
                    ...moodTrackerData,
                    [selectedDate]: mood,
                };

                setMoodTrackerData(updatedMoodTrackerData);
                setSelectedMood(mood);
                toggleMoodModal();
        
                await AsyncStorage.setItem('moodTrackerData', JSON.stringify(updatedMoodTrackerData));

            } catch (error) {
                console.error('Error saving mood data:', error);
            }
        };
    
        const renderDay = ({ date }) => {
            const dateString = date.toISOString().split('T')[0];
            const mood = moodTrackerData[dateString];
            const dayNumber = date.getDate();

            return (
                <TouchableOpacity style={styles.dayContainer} onPress={() => {
                    setSelectedDate(dateString);
                    setSelectedMood(mood);
                    toggleMoodModal();
                }}>
                    <View style={[styles.moodCircle, { backgroundColor: mood ? trackerMoods.find(m => m.name === mood)?.color : colors.greyMood }, ]}>
                        <Text style={styles.dayNumber}>{dayNumber}</Text> 
                    </View>
                </TouchableOpacity>
            );
        };

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
                
        <View style={styles.moodTrackerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboards')}>
                <Image source={require('../assets/back.png')} style={styles.backIcon} />
            </TouchableOpacity>

            <CalendarList
                calendarWidth={300}
                showScrollIndicator={true} 
                dayComponent={({ date }) => renderDay({
                    date: new Date(date.year, date.month - 1, date.day), 
                })}
                current={new Date().toISOString().split('T')[0]}
                theme={{
                    textSectionTitleColor: colors.ascent,
                    todayTextColor: colors.primary,
                    dayTextColor: colors.textPrimary,
                    textDisabledColor: colors.ascent,
                    monthTextColor: colors.textPrimary,
                    textMonthFontWeight: '500',
                    textDayFontWeight: '400',
                    calendarBackground: colors.transparent,
                }}
                style={styles.calendarList}
            />
            <Modal visible={moodModalVisible} transparent={true} onRequestClose={toggleMoodModal}>
                <View style={styles.moodModalContainer}>
                    <View style={styles.moodModalContent}>
                        <Text style={styles.moodModalTitle}>How are you feeling?</Text>
                        <ScrollView 
                            horizontal={true} 
                            contentContainerStyle={styles.moodPopupContainer} 
                            showsHorizontalScrollIndicator={false}
                        >
                        {trackerMoods.map((mood, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.moodPopupCircle,
                                    { backgroundColor: mood.color },
                                ]}
                                onPress={() => handleMoodSelect(mood.name)}
                            >
                                <Image source={mood.image} style={styles.imileyIcon2} />

                            </TouchableOpacity>
                        ))}
                        </ScrollView>

                        <TouchableOpacity style={styles.closePopupButton} onPress={toggleMoodModal}>
                            <Image source={require('../assets/addtask.png')} style={styles.plusIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
},
headerContainer: {
    flexDirection: 'row', 
    bottom: 5,
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
    width: 34,
    height: 11,
    bottom: -2
},
moodTrackerContainer: {
    width: 338,
    height: 580,
    backgroundColor: colors.white,
    borderRadius: 10,
    top: 15,
    padding: 20,
},
backIcon: {
    width: 30,
    height: 30,
    top: -8
},
calendarList: {
    width: 370,
    height: 500,
},
dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
},
dayNumber: {
    color: colors.textSecondary
},
moodPopupContainer: {
    flexDirection: 'row',    
    width: 480,
},
moodCircle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
},
moodPopupCircle: {
    width: 60,
    height: 60,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
},
moodModalContainer: {
    height: 750,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
},
moodModalContent: {
    width: '100%',
    height: 200,
    bottom: -275,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
},
moodModalTitle: {
    color: colors.textPrimary,
    fontWeight: '400',
    fontSize: 18,
    marginBottom: 15,
    left: -90
},
closePopupButton: {
    width: 45, 
    height: 45,
    borderRadius: 45,
    backgroundColor: colors.lightAscent,
    justifyContent: 'center',
    alignItems: 'center',
},
plusIcon: {
    width: 20,
    height: 20,
    transform: [{ rotate: '45deg' }],
},

});

export default MoodTrackerScreen;