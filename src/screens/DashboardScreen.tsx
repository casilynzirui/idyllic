import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../components/ColorTemplate';
import GreetingMessage from '../components/GreetingMessage';
import CalendarWidget from '../components/CalendarWidget';
import MoodTrackerWidget from '../components/MoodTrackerWidget';
import { fetchMoodTrackerData } from './MoodTracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const trackerMoods = [
  { name: 'Kitty', color: colors.pinkMood, image: require('../assets/kitty_imiley.png') },
  { name: 'Stun', color: colors.greenMood, image: require('../assets/stun_imiley.png')  },
  { name: 'Sad', color: colors.blueMood, image: require('../assets/sad_imiley.png') },
  { name: 'Sleepy', color: colors.purpleMood, image: require('../assets/sleepy_imiley.png') },
  { name: 'Smirk', color: colors.yellowMood, image: require('../assets/smirk_imiley.png')   },
  { name: 'Eyebrow', color: colors.orangeMood, image: require('../assets/eyebrow_imiley.png')  },
  { name: 'Remove', color: colors.greyMood, image: require('../assets/happy_imiley.png')  },
];


const DashboardScreen = ({ navigation }: any) => {
  const [moodTrackerData, setMoodTrackerData] = useState<{ [date: string]: string }>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [displayNotes, setDisplayNotes] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          // Fetch display notes
          const fetchedDisplayNotes = await getDisplayNotes();
          setDisplayNotes(fetchedDisplayNotes);

          // Fetch mood tracker data
          const fetchedMoodTrackerData = await fetchMoodTrackerData();
          setMoodTrackerData(fetchedMoodTrackerData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []) // Empty dependency array ensures this runs every time the screen is focused
  );

  const getDisplayNotes = async (): Promise<string[]> => {
    try {
        const displayNotes = await AsyncStorage.getItem('doit');
        return displayNotes ? JSON.parse(displayNotes) : [];
    } catch (error) {
        console.error('Error retrieving notes:', error);
        return [];
    }
  };

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
                    <Image source={mood ? trackerMoods.find(m => m.name === mood)?.image : require('../assets/happy_imiley.png') } style={styles.imileyIcon2} />

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

        <TouchableOpacity style={styles.todoContainer} onPress={() => navigation.navigate('DoIt')}>
          <View style={styles.quadrantHeaderContainer}>
            <View style={styles.quadrantHeader}>
                <Image source={require('../assets/doit.png')} style={styles.quadrantIcon} />
                <Text style={styles.quadrantText}>Do It</Text>
            </View>
          </View>
        
          {displayNotes.slice(0, 1).map((note, index) => (
            <View key={index} style={styles.displayNoteContainer}>
                <View style={styles.displayNoteContainer2}>
                    <View style={styles.checkBox}/>
                    <Text style={styles.displayNoteText}>{note}</Text>
                </View>
                
            </View>
            
          ))}
        

        </TouchableOpacity>

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
displayNoteContainer: {
  height: 50,
  top: -8,
  right: -1
},
displayNoteContainer2: {
    flexDirection: 'row',
    marginBottom: 10

},
checkBox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 10
},
displayNoteText: {
    fontSize: 15,
    color: colors.textPrimary
},
quadrantHeaderContainer: {
  height: 35,
  top: -5,
},
quadrantHeader: {
  flexDirection: 'row',
},
quadrantIcon: {
  width: 20,
  height: 20,
  marginRight: 10,
},
quadrantText: {
  fontSize: 16,
  fontWeight: '500',
  color: colors.textPrimary,
},
});

export default DashboardScreen;