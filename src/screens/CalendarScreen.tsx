import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../components/ColorTemplate';
import MotivationalMessages from '../components/MotivationalMessage';
import { CalendarList } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { DashboardStackNavigationProp } from '../navigation/NavigationTypes';

const CalendarScreen = () => {
    const navigation = useNavigation<DashboardStackNavigationProp>();

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
                
        <View style={styles.calendarContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboards')}>
                <Image source={require('../assets/back.png')} style={styles.backIcon} />
            </TouchableOpacity>

            <CalendarList
                current={new Date().toISOString().split('T')[0]}
                scrollEnabled={true}   
                showScrollIndicator={true} 
                style={styles.calendarList}
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
                calendarWidth={300}
                onDayPress={(day) => {
                    navigation.navigate('Agenda');
                }}
            />
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
calendarContainer: {
    width: 338,
    height: 580,
    backgroundColor: colors.white,
    borderRadius: 10,
    top: 15,
    padding: 20,
},
text: {
    fontSize: 20,
},
calendarList: {
    width: 370,
    height: 500,
    bottom: -5,
},
backIcon: {
    width: 30,
    height: 30,
    top: -8
}
  

});

export default CalendarScreen;