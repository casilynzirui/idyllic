import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../components/ColorTemplate';
import MotivationalMessages from '../components/MotivationalMessage';

const DoItQuadrant = ({ navigation }: any) => {

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
            
            <View style={styles.quadrantContainer}>
                <TouchableOpacity style={styles.quadrantHeader} onPress={() => navigation.navigate('Matrix')}>
                    <Image source={require('../assets/doit.png')} style={styles.quadrantIcon} />
                    <Text style={styles.quadrantText}>Do It</Text>
                </TouchableOpacity>




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
        width: 34,
        height: 11
    },
    quadrantContainer: {
        width: 338,
        height: 570,
        backgroundColor: colors.white,
        borderRadius: 10,
        top: 10,
        padding: 20,
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
        fontSize: 18,
        fontWeight: '500',
        color: colors.textPrimary,
    },
    text: {
        fontSize: 20,
    },
});

export default DoItQuadrant;
