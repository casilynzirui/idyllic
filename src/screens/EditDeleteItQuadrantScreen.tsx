import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../components/ColorTemplate';
import MotivationalMessages from '../components/MotivationalMessage';
import { useRoute } from '@react-navigation/native';


const EditDeleteItQuadrant = ({ navigation }: any) => {
    const route = useRoute();
    const { note, index } = route.params;
    const [editText, setEditText] = useState(note);

    const editDeleteNoteEntry = async () => {
        try {
            const existingNoteEntries = await AsyncStorage.getItem('deleteit');
            let noteEntriesArray: string[] = [];

            if (existingNoteEntries) {
                noteEntriesArray = JSON.parse(existingNoteEntries);
            }

            noteEntriesArray[index] = editText;
            await AsyncStorage.setItem('deleteit', JSON.stringify(noteEntriesArray));
            navigation.navigate('DeleteIt');
            
        } catch (error) {
            console.error('Error saving edited note:', error);
        }
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
            
            <View style={styles.quadrantContainer}>
                <View style={styles.textInputContainer}>
                    <TextInput 
                        multiline={true} 
                        style={styles.textInput} 
                        value={editText} 
                        onChangeText={setEditText}
                        autoFocus={true}
                        placeholder="What's on your mind?"
                    />
                </View>
               

                <View style={styles.saveButtonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={editDeleteNoteEntry}>
                    <Text style={styles.saveButtonText}>Update Note</Text>
                </TouchableOpacity>
                </View>
            

                <View style={styles.closeButtonContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/addtask.png')} style={styles.plusIcon} />
                    </TouchableOpacity>
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
        height: 580,
        backgroundColor: colors.white,
        borderRadius: 10,
        top: 15,
        padding: 20,
    },
    textInputContainer: {
        paddingTop: 10
    },
    textInput: {
        backgroundColor: colors.lightAscent,
        fontSize: 16,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        height: 350,
        borderRadius: 10,
        color: colors.textPrimary,

    },
    saveButtonContainer: {
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.ascent
    },
    saveButtonText: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.textSecondary
    },
    closeButtonContainer: {
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        width: 50, 
        height: 50,
        borderRadius: 50,
        backgroundColor: colors.ascent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        width: 20,
        height: 20,
        transform: [{ rotate: '45deg' }],
    },
  
});

export default EditDeleteItQuadrant;
