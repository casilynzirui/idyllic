import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../components/ColorTemplate';
import GreetingMessage from '../components/GreetingMessage';

const DashboardScreen = () => {
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
        

        </View>

        <View style={styles.todoContainer}>
        

        </View>

        <View style={styles.calendarContainer}>
        

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
    bottom: 15,
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
    width: 33,
    height: 10.85
  },
  dashboardContainer: {
    width: 338,
    height: 570,
    borderRadius: 10,
    top: 10,
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
    height: 340,
    backgroundColor: colors.white,
    borderRadius: 10,
    top: 30,
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
});

export default DashboardScreen;