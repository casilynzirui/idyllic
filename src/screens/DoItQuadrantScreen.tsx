import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../components/ColorTemplate';
import MotivationalMessages from '../components/MotivationalMessage';
import { useFocusEffect } from '@react-navigation/native';


const DoItQuadrant = ({ navigation }: any) => {
    const [displayNotes, setDisplayNotes] = useState<string[]>([]);

    useFocusEffect(() => {
        const fetchDisplayNotes = async () => {
            const fetchedDisplayNotes = await getDisplayNotes();
            setDisplayNotes(fetchedDisplayNotes);
        };

        fetchDisplayNotes();
    });

    const getDisplayNotes = async (): Promise<string[]> => {
        try {
            const displayNotes = await AsyncStorage.getItem('doit');
            return displayNotes ? JSON.parse(displayNotes) : [];
        } catch (error) {
            console.error('Error retrieving notes:', error);
            return [];
        }
    };

    const handleEditNote = (note: string, index: number) => {
        navigation.navigate('EditDoIt', { note, index });
    };

    const deleteNoteEntry = async (note: string, index: number) => {
        try {
            const existingNoteEntries = await AsyncStorage.getItem('doit');
            let noteEntriesArray: string[] = [];

            if (existingNoteEntries) {
                noteEntriesArray = JSON.parse(existingNoteEntries);
            }

            noteEntriesArray.splice(index, 1);

            await AsyncStorage.setItem('doit', JSON.stringify(noteEntriesArray));

        } catch (error) {
            console.error('Error deleting note:', error);
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
                <View style={styles.quadrantHeaderContainer}>
                    <TouchableOpacity style={styles.quadrantHeader} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/doit.png')} style={styles.quadrantIcon} />
                        <Text style={styles.quadrantText}>Do It</Text>
                    </TouchableOpacity>
                </View>
               

     
                <ScrollView>
                    <View style={styles.noteContainer}>
                        {displayNotes.map((note, index) => (
                            <TouchableOpacity key={index} style={styles.displayNoteContainer} onPress={() => handleEditNote(note, index)}>
                                <View style={styles.displayNoteContainer2}>
                                    <TouchableOpacity style={styles.checkBox} onPress={deleteNoteEntry} />
                                    <Text style={styles.displayNoteText}>{note}</Text>
                                </View>
                                
                                <View style={styles.separatorLine} />

                            </TouchableOpacity>
                            
                        ))}
                    </View>

                </ScrollView> 
                        
                <View style={styles.addButtonContainer}>
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddDoIt')} >
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
    quadrantHeaderContainer: {
        height: 35
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
    textInput: {
        backgroundColor: colors.lightAscent,
        fontSize: 16,
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 20,
        height: 200,
    },
    addButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        width: 50, 
        height: 50,
        borderRadius: 50,
        backgroundColor: colors.ascent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        width: 20,
        height: 20
    },
    noteContainer: {
        paddingTop: 10,

    },
    displayNoteContainer: {
        height: 50,
        marginBottom: 20,

    },
    displayNoteContainer2: {
        flexDirection: 'row',
        marginBottom: 10

    },
    checkBox: {
        width: 18,
        height: 18,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: colors.ascent,
        marginRight: 10
    },
    displayNoteText: {
        fontSize: 15,
        color: colors.textPrimary
    },
    separatorLine: {
        width: '100%', 
        height: 1, 
        backgroundColor: colors.lightAscent,
        marginVertical: 10,
      },
});

export default DoItQuadrant;
