import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import colors from '../components/ColorTemplate';
import { useIsFocused } from '@react-navigation/native';
import { getIdyllicUsername } from '../components/GetItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const SettingScreen = () => {
    const isFocused = useIsFocused();
    const [displayUsername, setDisplayUsername] = useState<string | null>(null);
    const [updatedDisplayUsername, setUpdatedDisplayUsername] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    useEffect(() => {
        if (isFocused) {
            const fetchDisplayUsername = async () => {
                try {
                    const idyllicUsername = await getIdyllicUsername(); // Fetch username
                    setDisplayUsername(idyllicUsername); // Set username and update state
                } catch (error) {
                    console.error('Error fetching username:', error);
                }
            };

            fetchDisplayUsername();
        }
    }, [isFocused]); 

    const saveUpdatedUsername = async () => {
        try {
            await AsyncStorage.setItem('IdyllicUsername', updatedDisplayUsername);
            setDisplayUsername(updatedDisplayUsername); 
            setModalVisible(false); 
        } catch (error) {
            console.error('Error saving username:', error);
        }
    };

    const handleClearAllData = async () => {
        try {
        await AsyncStorage.clear();
        console.log('AsyncStorage cleared');
        RNRestart.Restart();


        } catch (error) {
        console.error('Error clearing data:', error);
        }
    };

    const handleClearData = async () => {
        try {
        const idyllicKeys = await AsyncStorage.getAllKeys();
        const usernameKey = 'IdyllicUsername'; 
        const keysToClear = idyllicKeys.filter(idyllicKeys => idyllicKeys !== usernameKey);
    
        // Remove all keys except username
        await AsyncStorage.multiRemove(keysToClear);
        RNRestart.Restart();
    
        console.log('All data cleared except username');
        } catch (error) {
        console.error('Error clearing data:', error);
        }
    };

    return (
        <View style={styles.container}>
        <View style={styles.headerContainer}>
            <View style={styles.imileyContainer}>
            <Image source={require('../assets/imiley_loading.png')} style={styles.imileyIcon} />
            </View>
            <TouchableOpacity style={styles.usernameContainer} onPress={() => setModalVisible(true)}> 
            <Text style={styles.usernameText}>{displayUsername}</Text>

            </TouchableOpacity>


            {/* Modal for editing username */}
            <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            >
            <View style={styles.usernameModalBackground}>
                <View style={styles.usernameModalContainer}>
                    <Text style={styles.usernameModalTitle}>Edit Username</Text>

                    <TextInput
                        placeholder="Enter new username"
                        value={updatedDisplayUsername}
                        onChangeText={setUpdatedDisplayUsername}
                        style={styles.usernameInput}
                    />
                    
                    <View style={styles.usernameButtonContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={saveUpdatedUsername}>
                            <Image source={require('../assets/tick.png')} style={styles.tickIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setDeleteModalVisible(false)}>
                            <Image source={require('../assets/addtask.png')} style={styles.plusIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </Modal>
        </View>
                
        <View style={styles.settingContainer}>
            <View style={styles.settingOne}>
            <TouchableOpacity style={styles.settingOneColumn}>
                <Image source={require('../assets/setting.png')} style={styles.settingIcon} />
                <Text style={styles.settingText}>General</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.settingOneColumn}>
                <Image source={require('../assets/theme.png')} style={styles.settingIcon} />
                <Text style={styles.settingText}>Appearance</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.settingOneColumn}>
                <Image source={require('../assets/sound.png')} style={styles.settingIcon} />
                <Text style={styles.settingText}>Sounds & Notifications</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.settingOneColumn}>
                <Image source={require('../assets/datetime.png')} style={styles.settingIcon} />
                <Text style={styles.settingText}>Date & Time</Text>

            </TouchableOpacity>
            
            
            </View>

            <View style={styles.settingTwo}>
            <TouchableOpacity style={styles.settingOneColumn}>
                <Image source={require('../assets/feedback.png')} style={styles.settingIcon} />
                <Text style={styles.settingText}>Help & Feedback</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.settingOneColumn}>
                <Image source={require('../assets/link.png')} style={styles.settingIcon} />
                <Text style={styles.settingText}>Follow Us</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.settingOneColumn}>
                <Image source={require('../assets/info.png')} style={styles.settingIcon} />
                <Text style={styles.settingText}>About</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.settingOneColumn} onPress={handleClearData}>
                <Image source={require('../assets/bin.png')} style={styles.settingIcon} />
                <Text style={styles.settingText}>Clear Data</Text>

            </TouchableOpacity>
            
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={() => setDeleteModalVisible(true)}>
            <Text style={styles.settingText}>Delete Account</Text>
            </TouchableOpacity>

            <Modal
            transparent={true}
            visible={deleteModalVisible}
            onRequestClose={() => setDeleteModalVisible(false)}
            >
            <View style={styles.deleteModalBackground}>
                <View style={styles.deleteModalContainer}>
                    <Text style={styles.deleteModalTitle}>Delete Account</Text>

                    <Text style={styles.deleteText}>Are you sure you want to delete your account?</Text>
                    <View style={styles.deleteButtonContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={handleClearAllData}>
                            <Image source={require('../assets/tick.png')} style={styles.tickIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setDeleteModalVisible(false)}>
                            <Image source={require('../assets/addtask.png')} style={styles.plusIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </Modal>
            
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
usernameContainer:{
    width: 263,
    height: 60,
    backgroundColor: colors.ascent,
    marginRight: 15,
    borderRadius: 20,
    right: -15,
    padding: 20
},
usernameText: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '500'
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
usernameModalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
},
usernameModalContainer: {
    width: '80%',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,

},
usernameModalTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
},
usernameInput: {
    height: 40,
    borderColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    color: colors.textPrimary
},
usernameButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
closeButtonContainer: {
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
    marginHorizontal: 10, 

},
tickIcon: {
    width: 20,
    height: 20,
},
plusIcon: {
    width: 20,
    height: 20,
    transform: [{ rotate: '45deg' }],
},
settingContainer: {
    width: 338,
    height: 580,
    borderRadius: 10,
    top: 15,
},
settingOne: {
    marginBottom: 20,
    height: 245,
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
},
settingOneColumn: {
    flexDirection: 'row',
    height: 61.25,
    borderRadius: 10,
    padding: 20,
},
settingTwo: {
    marginBottom: 20,
    height: 245,
    backgroundColor: colors.white,
    borderRadius: 10,
},
resetButton: {
    backgroundColor: colors.white,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

},
settingText: {
    color: colors.textPrimary,
    fontSize: 15,
},
settingIcon: {
    width: 18,
    height: 18,
    marginRight: 10
},
deleteModalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
},
deleteModalContainer: {
    width: '80%',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

},
deleteModalTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
},
deleteButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
deleteText: {
    color: colors.textPrimary,
    fontSize: 15,
    marginBottom: 15,

},


});

export default SettingScreen;