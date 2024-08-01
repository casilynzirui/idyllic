import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../components/Colors';
import MotivationalMessages from '../components/MotivationalMessage';

const TodoScreen = () => {
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
            
      <View style={styles.todoContainer}>
        <Text style={styles.text}>To do list</Text>

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
    width: 31,
    height: 10.85
  },
  todoContainer: {
    width: 338,
    height: 570,
    backgroundColor: colors.white,
    borderRadius: 10,
    top: 10,
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
});

export default TodoScreen;