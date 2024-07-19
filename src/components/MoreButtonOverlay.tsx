import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabParamList } from '../navigation/NavigationTypes';
import { MoreStackParamList } from '../navigation/NavigationTypes';

type CombinedNavigationProp = BottomTabNavigationProp<BottomTabParamList> & NativeStackNavigationProp<MoreStackParamList>;


interface MoreButtonOverlayProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (screen: 'Profile' | 'Settings') => void;
}

const MoreButtonOverlay: React.FC<MoreButtonOverlayProps> = ({ visible, onClose, onSelect }) => {
    const navigation = useNavigation<CombinedNavigationProp>();

    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <View style={styles.menu}>
                <TouchableOpacity onPress={() => { onSelect('Profile'); navigation.navigate('More'); }} style={styles.option}>
                    <Text style={styles.optionText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onSelect('Settings'); navigation.navigate('More'); }} style={styles.option}>
                    <Text style={styles.optionText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

  
  const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      bottom: 50,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderRadius: 10,
      padding: 10,
      width: 150,
    },
    menu: {
      alignItems: 'center',
    },
    option: {
      paddingVertical: 10,
    },
    optionText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  
export default MoreButtonOverlay;