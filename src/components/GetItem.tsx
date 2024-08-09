import AsyncStorage from '@react-native-async-storage/async-storage';

export const getIdyllicUsername = async (): Promise<string | null> => {
    try {
        const storedIdyllicUsername = await AsyncStorage.getItem('IdyllicUsername');
        return storedIdyllicUsername; // Return username or null
    } catch (error) {
        console.error('Error fetching username:', error);
        return null; // Return null if error
    }
};