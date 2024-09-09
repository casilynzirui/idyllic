import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens'; 
import AppStackNav from './src/navigation/AppStackNav';

enableScreens();

const App = () => {
    return (
        <SafeAreaView style={styles.container}>

            <AppStackNav />

        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
