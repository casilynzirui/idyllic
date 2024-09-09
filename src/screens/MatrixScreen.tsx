import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../components/ColorTemplate';
import MotivationalMessages from '../components/MotivationalMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const MatrixScreen = ({ navigation }: any) => {
    const [displayDoitNotes, setDisplayDoitNotes] = useState<string[]>([]);
    const [displayDecideitNotes, setDisplayDecideitNotes] = useState<string[]>([]);
    const [displayDelegateitNotes, setDisplayDelegateitNotes] = useState<string[]>([]);
    const [displayDeleteitNotes, setDisplayDeleteitNotes] = useState<string[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchNotes = async () => {
                try {
                    const fetchedDoitNotes = await getDisplayDoitNotes();
                    setDisplayDoitNotes(fetchedDoitNotes);

                    const fetchedDecideitNotes = await getDisplayDecideitNotes();
                    setDisplayDecideitNotes(fetchedDecideitNotes);

                    const fetchedDelegateitNotes = await getDisplayDelegateitNotes();
                    setDisplayDelegateitNotes(fetchedDelegateitNotes);

                    const fetchedDeleteitNotes = await getDisplayDeleteitNotes();
                    setDisplayDeleteitNotes(fetchedDeleteitNotes);
                } catch (error) {
                    console.error('Error fetching notes:', error);
                }
            };

            fetchNotes();
        }, []) 
    );

    const getDisplayDoitNotes = async (): Promise<string[]> => {
        try {
            const displayDoitNotes = await AsyncStorage.getItem('doit');
            return displayDoitNotes ? JSON.parse(displayDoitNotes) : [];
        } catch (error) {
            console.error('Error retrieving notes:', error);
            return [];
        }
    };

    const getDisplayDecideitNotes = async (): Promise<string[]> => {
        try {
            const displayDecideitNotes = await AsyncStorage.getItem('decideit');
            return displayDecideitNotes ? JSON.parse(displayDecideitNotes) : [];
        } catch (error) {
            console.error('Error retrieving notes:', error);
            return [];
        }
    };

    const getDisplayDelegateitNotes = async (): Promise<string[]> => {
        try {
            const displayDelegateitNotes = await AsyncStorage.getItem('delegateit');
            return displayDelegateitNotes ? JSON.parse(displayDelegateitNotes) : [];
        } catch (error) {
            console.error('Error retrieving notes:', error);
            return [];
        }
    };

    const getDisplayDeleteitNotes = async (): Promise<string[]> => {
        try {
            const displayDeleteitNotes = await AsyncStorage.getItem('deleteit');
            return displayDeleteitNotes ? JSON.parse(displayDeleteitNotes) : [];
        } catch (error) {
            console.error('Error retrieving notes:', error);
            return [];
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
                
        <View style={styles.matrixContainer}>
        <View style={styles.matrixRow}>
            <TouchableOpacity style={styles.matrixSquare} onPress={() => navigation.navigate('DoIt')}>
            <View style={styles.quadrantHeaderContainer}>
                <View style={styles.quadrantHeader}>
                    <Image source={require('../assets/doit.png')} style={styles.quadrantIcon} />
                    <Text style={styles.quadrantText}>Do It</Text>
                </View>
            </View>
            
            {displayDoitNotes.slice(0, 5).map((note, index) => (
                <View key={index} style={styles.displayNoteContainer}>
                    <View style={styles.displayNoteContainer2}>
                        <View style={styles.checkBox}/>
                        <Text style={styles.displayNoteText}>{note}</Text>
                    </View>
                    
                </View>
                
            ))}
            </TouchableOpacity>

            <TouchableOpacity style={styles.matrixSquare} onPress={() => navigation.navigate('DecideIt')} >
            <View style={styles.quadrantHeaderContainer}>
                <View style={styles.quadrantHeader}>
                    <Image source={require('../assets/decideit.png')} style={styles.quadrantIcon} />
                    <Text style={styles.quadrantText2}>Decide It</Text>
                </View>
                </View>


                {displayDecideitNotes.slice(0, 5).map((note, index) => (
                <View key={index} style={styles.displayNoteContainer}>
                    <View style={styles.displayNoteContainer2}>
                        <View style={styles.checkBox2}/>
                        <Text style={styles.displayNoteText}>{note}</Text>
                    </View>
                    
                </View>   
                ))}
            </TouchableOpacity>

        </View>
        <View style={styles.matrixRow}>
            <TouchableOpacity style={styles.matrixSquare} onPress={() => navigation.navigate('DelegateIt')} >
            <View style={styles.quadrantHeaderContainer}>
                <View style={styles.quadrantHeader}>
                    <Image source={require('../assets/delegateit.png')} style={styles.quadrantIcon} />
                    <Text style={styles.quadrantText2}>Delegate It</Text>
                </View>
            </View>

            {displayDelegateitNotes.slice(0, 5).map((note, index) => (
                <View key={index} style={styles.displayNoteContainer}>
                    <View style={styles.displayNoteContainer2}>
                        <View style={styles.checkBox2}/>
                        <Text style={styles.displayNoteText}>{note}</Text>
                    </View>
                    
                </View>
            ))}
            </TouchableOpacity>

            <TouchableOpacity style={styles.matrixSquare} onPress={() => navigation.navigate('DeleteIt')}>
            <View style={styles.quadrantHeaderContainer}>
                <View style={styles.quadrantHeader}>
                    <Image source={require('../assets/deleteit.png')} style={styles.quadrantIcon} />
                    <Text style={styles.quadrantText2}>Delete It</Text>
                </View>
                </View>

            {displayDeleteitNotes.slice(0, 5).map((note, index) => (
                <View key={index} style={styles.displayNoteContainer}>
                    <View style={styles.displayNoteContainer2}>
                        <View style={styles.checkBox2}/>
                        <Text style={styles.displayNoteText}>{note}</Text>
                    </View>
                    
                </View>
            ))}
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
matrixContainer: {
    width: 338,
    height: 580,
    borderRadius: 10,
    top: 15,
},
matrixRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
},
matrixSquare: {
    width: 159,
    height: 280,
    backgroundColor: colors.white,
    marginRight: 20,
    borderRadius: 10,
    padding: 10
},
displayNoteContainer: {
    height: 45,
    right: -5,
    bottom: -5,
    width: 130
},
displayNoteContainer2: {
    flexDirection: 'row',
    marginBottom: 10,
},
checkBox: {
    width: 16,
    height: 16,
    borderRadius: 2.5,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 10
},
checkBox2: {
    width: 16,
    height: 16,
    borderRadius: 2.5,
    borderWidth: 2,
    borderColor: colors.ascent,
    marginRight: 10
},
displayNoteText: {
    fontSize: 14,
    color: colors.textPrimary,
    flexWrap: 'wrap', 
    flex: 1,
},
quadrantHeaderContainer: {
    height: 35,
    padding: 5
},
quadrantHeader: {
    flexDirection: 'row',
},
quadrantIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
},
quadrantText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
    left: -2
},
quadrantText2: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    left: -2
},
});

export default MatrixScreen;
