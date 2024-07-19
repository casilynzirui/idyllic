import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import MoreButtonOverlay from '../components/MoreButtonOverlay';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const [showOptions, setShowOptions] = useState(false);

  const bottomTabIconPaths: { [key: string]: { active: any; inactive: any } } = {
    'To Do List': {
        active: require('../assets/note_active.png'), 
        inactive: require('../assets/note_inactive.png'), 
    },
    'Eisenhower Matrix': {
        active: require('../assets/matrix_active.png'), 
        inactive: require('../assets/matrix_inactive.png'), 
    },
    'Dashboard': {
        active: require('../assets/dashboard_active.png'), 
        inactive: require('../assets/dashboard_inactive.png'), 
    },
    'Pomodoro Timer': {
        active: require('../assets/pomodoro_active.png'), 
        inactive: require('../assets/pomodoro_inactive.png'), 
    },
    'More': {
        active: require('../assets/more_inactive.png'), 
        inactive: require('../assets/more_active.png'), 
    },
  };

  const bottomTabPressed = (routeName: string) => {
    if (routeName !== 'More') {
      navigation.navigate(routeName);
    }
  };

  const renderBottomTabIcon = (routeName: string, isFocused: boolean) => {
    const icons = bottomTabIconPaths[routeName];
    if (!icons) return null;

    const iconPath = isFocused ? icons.active : icons.inactive;

    return <Image source={iconPath} style={styles.tabIcon} />;
  };

  const handleMorePress = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (screen: string) => {
    setShowOptions(false);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => bottomTabPressed(route.name)}
            style={styles.tabItem}
          >
            {renderBottomTabIcon(route.name, isFocused)}
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        onPress={handleMorePress}
        style={styles.moreButton}
      >
        <Image
            source={bottomTabIconPaths['More'].active}
            style={styles.tabIcon}
          />
        </TouchableOpacity>

        <MoreButtonOverlay visible={showOptions} onClose={() => setShowOptions(false)} onSelect={handleOptionSelect} />

      
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 56, // Adjust height as needed
    backgroundColor: '#FAFAFA', // Tab bar background color
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 25, // Adjust icon size as needed
    height: 25,
    resizeMode: 'contain', // Ensure the icon fits within the specified size
  },
  moreButton: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: 15,
    right: 28,
  },

});

export default CustomTabBar;