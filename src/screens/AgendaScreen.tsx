import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../components/ColorTemplate';
import MotivationalMessages from '../components/MotivationalMessage';
import { CalendarList, Agenda } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { DashboardStackNavigationProp } from '../navigation/NavigationTypes';

const AgendaScreen = () => {
  const navigation = useNavigation<DashboardStackNavigationProp>();
  const [agendaItems, setAgendaItems] = useState<{ [key: string]: { title: string; description: string }[] }>({});
  const [newAgendaItem, setNewAgendaItem] = useState('');
  const [newAgendaTitle, setNewAgendaTitle] = useState('');
  const [newAgendaDescription, setNewAgendaDescription] = useState('');
  const [editAgendaItems, setEditAgendaItems] = useState<{ day: string; index: number } | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [agendaModalVisible, setAgendaModalVisible] = useState(false);
  

  useEffect(() => {
    loadAgendaItems();
    // To initialize today's date in the items
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    if (!agendaItems[today]) {
      setAgendaItems((prevAgendaItems) => ({
        ...prevAgendaItems,
        [today]: [],
      }));
    }
  }, []);

  const loadAgendaItems = async () => {
    try {
      const savedAgendaItems = await AsyncStorage.getItem('agendaItems');
      if (savedAgendaItems) {
        setAgendaItems(JSON.parse(savedAgendaItems));
      }
    } catch (error) {
      console.error('Failed to load items:', error);
    }
  };

  const saveAgendaItems = async (updatedAgendaItems: { [key: string]: any[] }) => {
    try {
      await AsyncStorage.setItem('agendaItems', JSON.stringify(updatedAgendaItems));
    } catch (error) {
      console.error('Failed to save items:', error);
    }
  };

  const addAgendaItem = () => {
    if (selectedDate && newAgendaTitle.trim().length > 0 && newAgendaDescription.trim().length > 0) {
      const updatedAgendaItems = { ...agendaItems };
      if (!updatedAgendaItems[selectedDate]) {
        updatedAgendaItems[selectedDate] = [];
      }
      updatedAgendaItems[selectedDate].push({ 
        title: newAgendaTitle, 
        description: newAgendaDescription 
      });
      setAgendaItems(updatedAgendaItems);
      saveAgendaItems(updatedAgendaItems);
      setNewAgendaTitle('');
      setNewAgendaDescription('');
      handleAgendaModalVisible(!agendaModalVisible);
    }
  };

  const deleteAgendaItem = (date: string) => {
    const updatedAgendaItems = { ...agendaItems };

    if (updatedAgendaItems[date]) {
        delete updatedAgendaItems[date]; // To remove the item for the given date

        setAgendaItems(updatedAgendaItems);
        saveAgendaItems(updatedAgendaItems);
    } else {
        console.error('No item found for this date');
    }
};

  const renderItem = (agendaItem: { title: string; description: string }, index: number) => {
    console.log('Rendering agenda item:', agendaItem); 
    return (
        <View style={styles.agendaItem}>
            <Text style={styles.agendaTitle}>{agendaItem.title}</Text>   
            <Text style={styles.agendaDescription}>{agendaItem.description}</Text>   
            <View style={styles.agendaItem2}>
              <TouchableOpacity style={styles.deleteAgendaButton} onPress={() => deleteAgendaItem(selectedDate, index)} >
                    <Image source={require('../assets/edit.png')} style={styles.editIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteAgendaButton} onPress={() => deleteAgendaItem(selectedDate, index)} >
                    <Image source={require('../assets/delete.png')} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
        </View>
    );
  };


  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const handleAgendaModalVisible = (day: any) => {
    setAgendaModalVisible(!agendaModalVisible);
  }

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
            
      <View style={styles.agendaContainer}>
        <View style={styles.agendaHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboards')}>
            <Image source={require('../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAgendaModalVisible}>
                    <Image source={require('../assets/addtask.png')} style={styles.plusIcon} />
        </TouchableOpacity>
        </View>

        <Agenda
            style={styles.agenda}
            items={agendaItems}
            selected={selectedDate || undefined}
            renderItem={renderItem}
            rowHasChanged={(row1, row2) => row1.title !== row2.title || row1.description !== row2.description}
            onDayPress={onDayPress}
            renderEmptyData={() => (
                <View style={styles.emptyAgendaContainer}>
                  <Text style={styles.agendaText2}>No agenda items for this date</Text>
                </View>
              )}
            theme={{
                textSectionTitleColor: colors.ascent,
                todayTextColor: colors.primary,
                dayTextColor: colors.textPrimary,
                textDisabledColor: colors.ascent,
                arrowColor: colors.primary,
                monthTextColor: colors.textPrimary,
                textMonthFontWeight: '500',
                selectedDayBackgroundColor: colors.ascent,
                selectedDayTextColor: colors.textPrimary,
                agendaKnobColor: colors.ascent,
                agendaTodayColor: colors.primary,
                agendaDayTextColor: colors.ascent,     
                agendaDayNumColor: colors.ascent,  
                dotColor: colors.ascent,
                selectedDotColor: colors.ascent,
            }}
        />
   
      {/* Modal for for adding new agenda items */}
      <Modal
        transparent={true}
        visible={agendaModalVisible}
        onRequestClose={handleAgendaModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.agendaInputContainer}>
              <TextInput
                style={styles.agendaInput}
                placeholder="Enter agenda title"
                value={newAgendaTitle}
                onChangeText={setNewAgendaTitle}
              />
            </View>
            <View style={styles.agendaInputContainer2}>
            <TextInput
                style={styles.agendaInput2}
                placeholder="Enter agenda description"
                value={newAgendaDescription}
                multiline={true}
                onChangeText={setNewAgendaDescription}
              />
            </View>
            <TouchableOpacity style={styles.addAgendaButton} onPress={addAgendaItem}>
                <Text style={styles.addAgendaText}>Add Agenda</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAgendaModalVisible}>
              <Image source={require('../assets/addtask.png')} style={styles.plusIcon2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeAgendaButton} onPress={handleAgendaModalVisible}>
              <Image source={require('../assets/addtask.png')} style={styles.plusIcon3} />
          </TouchableOpacity>
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
  agendaContainer: {
    width: 338,
    height: 580,
    backgroundColor: colors.white,
    borderRadius: 10,
    top: 15,
    padding: 20,
  },
  agendaHeader: {
    flexDirection: 'row'
  },
  agenda: {
    bottom: -3,
    borderRadius: 10
  },
  text: {
    fontSize: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    top: -8,
    left: -5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    height: 500,
    bottom: -53,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.ascent,
    padding: 20,
    alignItems: 'center',
  },
  agendaInputContainer: {
    width: '100%',
    backgroundColor: colors.lightAscent, 
    alignItems: 'center',
    borderRadius: 10,
    bottom: -20,
  },
  agendaInput: {
    width: '90%',
    padding: 10,
    margin: 5,
    backgroundColor: colors.lightAscent,
    color: colors.textPrimary,
  },
  agendaInputContainer2: {
    width: '100%',
    height: 230,
    backgroundColor: colors.lightAscent, 
    alignItems: 'center',
    borderRadius: 10,
    bottom: -30

  },
  agendaInput2: {
    width: '90%',
    padding: 10,
    margin: 5,
    backgroundColor: colors.lightAscent,
    color: colors.textPrimary,
  },
  plusIcon: {
    width: 16,
    height: 16,
    right: -245
  },
  plusIcon2: {
    width: 16,
    height: 16,
    right: -134,
    top: -382
  },
  agendaItem: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 5,
    paddingTop: 10,
    paddingLeft: 5,
    marginRight: 10,
    marginTop: 25,
    fontWeight: '500'
  },
  agendaItem2: {
    flexDirection: 'row'
  },
  agendaTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    backgroundColor: colors.white,
    flex: 1,
    paddingLeft: 8,
    paddingBottom: 10,
    fontWeight: '500'
  },
  agendaDescription: {
    color: colors.textPrimary,
    fontSize: 15,
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 5,
    paddingTop: 10,
    paddingLeft: 8,
    marginRight: 10,
    top: -10
  },
  deleteAgendaButton: {
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingLeft: 10,
    marginRight: 10,
    top: -10
  },
  deleteAgendaButton2: {
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingBottom: 10,
    left: -10
  },

  emptyAgendaContainer: {
    backgroundColor: colors.white,
    height: '100%',
  },
  agendaText2: {
    color: colors.textPrimary,
    fontSize: 15,
    bottom: -15,
    right: -20
  },
  addAgendaButton: {
    width: '60%',
    height: 40,
    backgroundColor: colors.white, 
    alignItems: 'center',
    borderRadius: 5,
    bottom: -45,
    borderWidth: 2,
    borderColor: colors.lightAscent,
    justifyContent: 'center',
  },
  addAgendaText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '500'
  },
  closeAgendaButton: {
    width: 45, 
    height: 45,
    borderRadius: 45,
    backgroundColor: colors.lightAscent,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -65
  },
  plusIcon3: {
    width: 20,
    height: 20,
    transform: [{ rotate: '45deg' }],
  },
  editIcon: {
    width: 18,
    height: 18,
    right: -155,
    bottom: -2
  },
  deleteIcon: {
    width: 20,
    height: 20,
    right: -140,
  },
  

});

export default AgendaScreen;