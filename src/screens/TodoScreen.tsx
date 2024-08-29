import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../components/ColorTemplate';
import MotivationalMessages from '../components/MotivationalMessage';

const TodoScreen = () => {
  const [todoText, setTodoText] = useState<string>('');
  const [todoItems, setTodoItems] = useState<{ id: string; text: string }[]>([]);

  // Load and display todo items from storage when app starts
  useEffect(() => {
    const displayTodoItems = async () => {
      try {
        const saveTodoItems = await AsyncStorage.getItem('todoItems');
        if (saveTodoItems) {
          setTodoItems(JSON.parse(saveTodoItems));

        }
      } catch (error) {
        console.error('Failed,', error);
      }
    };

    displayTodoItems();
  }, []);

  // Save todo items when state changes
  useEffect(() => {
    const saveTodoItems = async () => {
      try {
        await AsyncStorage.setItem('todoItems', JSON.stringify(todoItems));
      } catch (error) {
        console.error('Failed to save todos:', error);
      }
    };

    saveTodoItems();
  }, [todoItems]);

  const addTodoItem = () => {
    if (todoText.trim().length > 0) {
      const newTodoItem = {
        id: Date.now().toString(),
        text: todoText,
      };
      setTodoItems((prevTodoItems) => [...prevTodoItems, newTodoItem]);
      setTodoText(''); // Clear the input after adding
    }
  };

  const removeTodoItem = (id: string) => {
    setTodoItems((prevTodoItems) => prevTodoItems.filter((todo) => todo.id !== id));
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
            
      <View style={styles.todoContainer}>
        <View style={styles.todoInput}>
          <TextInput multiline={true} style={styles.textInput} value={todoText} onChangeText={setTodoText} placeholder="What's on your mind?" />
          <TouchableOpacity style={styles.saveButton} onPress={addTodoItem}>
            <Image source={require('../assets/addtask.png')} style={styles.plusIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.flatList}>
          <FlatList
            data={todoItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.todoList}>
                <TouchableOpacity style={styles.checkBox} onPress={() => removeTodoItem(item.id)} />
                <Text style={styles.todoText}>{item.text}</Text>

              </View>
            )}
          />
        </View>

        <TouchableOpacity style={styles.moreButton} onPress={addTodoItem}>
            <Image source={require('../assets/completedtask.png')} style={styles.moreIcon} />
        </TouchableOpacity>
        
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
    bottom: 15,
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
  todoContainer: {
    width: 338,
    height: 570,
    backgroundColor: colors.white,
    borderRadius: 10,
    top: 10,
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
  todoInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 240,
  },
  flatList: {
    bottom: -30,
    height: 430,
    overflow: 'hidden',
    marginHorizontal: 5
  },
  todoList: {
    width: '100%',
    height: 50,
    flexDirection: 'row', 
  },
  todoText: {
    right: -10,
    fontSize: 15,
    color: colors.textPrimary,   
  },
  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.ascent,
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    paddingTop: 15,
    color: colors.textPrimary,
    marginRight: 10
  },
  saveButton: {
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
  moreButton: {
    width: 10, 
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -45,
    right: -10
  },
  moreIcon: {
    width: 30,
    height: 30
  },

});

export default TodoScreen;