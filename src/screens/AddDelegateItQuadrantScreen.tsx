import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../components/ColorTemplate';
import MotivationalMessages from '../components/MotivationalMessage';

const AddDelegateItQuadrant = ({ navigation }: any) => {
    const [entryText, setEntryText] = useState<string>('');

    const saveDelegateNoteEntry = async (text: string) => {
        try {
            const existingNoteEntries = await AsyncStorage.getItem('delegateit');
            let noteEntriesArray: string[] = [];
    
            if (existingNoteEntries) {
                try {
                    noteEntriesArray = JSON.parse(existingNoteEntries);
                } catch (error) {
                    console.error('Error parsing existing notes:', error);

                    await AsyncStorage.removeItem('delegateit'); // Remove if there's corrupted data
                    noteEntriesArray = [];
                }
            }
    
            noteEntriesArray.push(text); // Add new note to the array
    
            await AsyncStorage.setItem('delegateit', JSON.stringify(noteEntriesArray));
    
            navigation.navigate('DelegateIt');
        } catch (error) {
            console.error('Error saving note:', error);
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
                        value={entryText} 
                        onChangeText={setEntryText}
                        autoFocus={true}
                        placeholder="What's on your mind?"
                    />
                </View>
       
                <View style={styles.saveButtonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={() => saveDelegateNoteEntry(entryText)}>
                    <Text style={styles.saveButtonText}>Save Note</Text>
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

export default AddDelegateItQuadrant;
