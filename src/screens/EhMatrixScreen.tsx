import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../components/ColorTemplate';
import MotivationalMessages from '../components/MotivationalMessage';

const EhMatrixScreen = () => {
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
            
      <View style={styles.matrixContainer}>
      <View style={styles.matrixRow}>
        <View style={styles.matrixSquare} />
        <View style={styles.matrixSquare} />
      </View>
      <View style={styles.matrixRow}>
        <View style={styles.matrixSquare} />
        <View style={styles.matrixSquare} />
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
    width: 33,
    height: 10.85
  },
  matrixContainer: {
    width: 338,
    height: 570,
    borderRadius: 10,
    top: 10,
  },
  matrixRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  matrixSquare: {
    width: 159,
    height: 275,
    backgroundColor: colors.white,
    marginRight: 20,
    borderRadius: 10
  },
  text: {
    fontSize: 20,
  },
});

export default EhMatrixScreen;
