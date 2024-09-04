import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../components/ColorTemplate';
import GreetingMessage from '../components/GreetingMessage';
import CalendarWidget from '../components/CalendarWidget';
import MoodTrackerWidget from '../components/MoodTrackerWidget';
import { fetchMoodTrackerData } from './MoodTracker';

const trackerMoods = [
  { name: 'Happy', color: colors.pinkMood },
  { name: 'Sad', color: colors.greenMood },
  { name: 'Angry', color: colors.blueMood },
  { name: 'Calm', color: colors.purpleMood },
  { name: 'Anxious', color: colors.yellowMood },
  { name: 'Relax', color: colors.orangeMood },
  { name: 'Remove', color: colors.greyMood },

];

const DashboardScreen = () => {
  const [moodTrackerData, setMoodTrackerData] = useState<{ [date: string]: string }>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const getDisplayMoods = () => {
    const sortedDates = Object.keys(moodTrackerData).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );
    const mostRecentMoods = sortedDates.slice(0, 7).map(date => ({
      date,
      mood: moodTrackerData[date] || null
    }));
    return mostRecentMoods;
  };

  const renderDisplayMoodCircle = (date: string, mood: string | null) => {
    return (
      <TouchableOpacity
        key={date}
        style={styles.dayContainer}
        onPress={() => {
          setSelectedDate(date);
          setSelectedMood(mood);
        }}
      >
        
        <View
          style={[
            styles.moodCircle,
            { backgroundColor: mood ? trackerMoods.find(m => m.name === mood)?.color : colors.greyMood },
          ]}
        >
                    <Image source={require('../assets/imiley_loading.png')} style={styles.imileyIcon2} />

        </View>
      </TouchableOpacity>
    );
  };

const renderDisplayMoods = () => {
    const latestMoods = getDisplayMoods();
    return (
      <View style={styles.displayMoodContainer}>
        {latestMoods.map(item => renderDisplayMoodCircle(item.date, item.mood))}
      </View>
    );};

  useEffect(() => {
    const loadMoodTrackerData = async () => {
        const data = await fetchMoodTrackerData();
        setMoodTrackerData(data);
    };

    loadMoodTrackerData();
}, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.greetingContainer}>
          <GreetingMessage />
        </View>
        <View style={styles.imileyContainer}>
          <Image source={require('../assets/imiley_loading.png')} style={styles.imileyIcon} />
        </View>
      </View>
            
      <View style={styles.dashboardContainer}>
        <View style={styles.moodtrackerContainer}>
          <MoodTrackerWidget />
          {renderDisplayMoods()}
        </View>

        <View style={styles.todoContainer}>
        

        </View>

        <View style={styles.calendarContainer}>
          <CalendarWidget />
        

        </View>

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
  greetingContainer:{
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
  dashboardContainer: {
    width: 338,
    height: 580,
    borderRadius: 10,
    top: 15,
  },
  moodtrackerContainer: {
    width: 338,
    height: 100,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  todoContainer: {
    width: 338,
    height: 100,
    backgroundColor: colors.white,
    borderRadius: 10,
    top: 15,
    padding: 20,
  },
  calendarContainer: {
    width: 338,
    height: 350,
    backgroundColor: colors.white,
    borderRadius: 10,
    top: 30,
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
  displayMoodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    padding: 20,
  },
  dayContainer: {
    alignItems: 'center',
    marginRight: 5,
    right: -2
  },
  moodCircle: {
    width: 38,
    height: 38,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imileyIcon2: {
    width: 34,
    height: 11,
    transform: [{ scale: 0.7 }],
  },
});

export default DashboardScreen;