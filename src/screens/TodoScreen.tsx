import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../components/ColorTemplate';
import MotivationalMessages from '../components/MotivationalMessage';

const TodoScreen = () => {
    const [todoText, setTodoText] = useState<string>('');
    const [todoItems, setTodoItems] = useState<{ id: string; text: string }[]>([]);
    const [editItem, setEditItem] = useState<string | null>(null);
    const [deletedItems, setDeletedItems] = useState<{ id: string; text: string }[]>([]);
    const [showDeletedItems, setShowDeletedItems] = useState(false);

    useEffect(() => {
        const displayTodoItems = async () => {
        try {
            const saveTodoItems = await AsyncStorage.getItem('todoItems');
            const savedDeletedItems = await AsyncStorage.getItem('deletedItems');

            if (saveTodoItems) {
            setTodoItems(JSON.parse(saveTodoItems));
            }

            if (savedDeletedItems) {
            setDeletedItems(JSON.parse(savedDeletedItems));
            }

        } catch (error) {
            console.error('Failed to load todo items,', error);
        }
        };

        displayTodoItems();
    }, []);

   
    useEffect(() => {
        const saveTodoItems = async () => {
        try {
            await AsyncStorage.setItem('todoItems', JSON.stringify(todoItems));
            await AsyncStorage.setItem('deletedItems', JSON.stringify(deletedItems));
        } catch (error) {
            console.error('Failed to save todo items:', error);
        }
        };

        saveTodoItems();
    }, [todoItems, deletedItems]);

    const addTodoItem = () => {
        if (todoText.trim().length > 0) {
        const newTodoItem = {
            id: Date.now().toString(),
            text: todoText,
        };
        setTodoItems((prevTodoItems) => [...prevTodoItems, newTodoItem]);
        setTodoText(''); 
        }
    };

    const removeTodoItem = (id: string) => {
        const todoItemDelete = todoItems.find(todo => todo.id === id);
        if (todoItemDelete) {
        setDeletedItems([...deletedItems, todoItemDelete]); 
        setTodoItems((prevTodoItems) => prevTodoItems.filter((todo) => todo.id !== id));
        }
    };

    const toggleView = () => {
        setShowDeletedItems((prevShowDeletedItems) => !prevShowDeletedItems);
    };

    const handlePress = (id: string) => {
        setEditItem(id); 
    };

    const updateTodoItem = (id: string, newTodoText: string) => {
        setTodoItems((prevTodoItems) =>
        prevTodoItems.map((todo) =>
            todo.id === id ? { ...todo, text: newTodoText } : todo
        )
        );
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
                data={showDeletedItems ? deletedItems : todoItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (        
                showDeletedItems ? (
                    <View style={styles.todoList}>
                    <View style={styles.checkedBox} />
                    <Text style={[styles.todoText, styles.strikeThrough]}>{item.text}</Text>
                    </View>
                ) : ( 
                    <TouchableOpacity onPress={() => handlePress(item.id)}>
                    <View style={styles.todoList}>
                        <TouchableOpacity style={styles.checkBox} onPress={() => removeTodoItem(item.id)} />
                        {editItem === item.id ? (
                        <View style={styles.fixedList}>
                        <TextInput
                            style={styles.todoText}
                            value={item.text}
                            onChangeText={(text) => updateTodoItem(item.id, text)}
                            autoFocus={true}
                            onBlur={() => setEditItem(null)}
                        />
                        </View>
                        ) : (
                        <Text style={styles.todoText}>{item.text}</Text>
                        )} 
                    </View>
                    </TouchableOpacity>
                )
                )} 
            />
            </View>

            <TouchableOpacity style={styles.moreButton} onPress={toggleView}>
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
todoContainer: {
    width: 338,
    height: 580,
    backgroundColor: colors.white,
    borderRadius: 10,
    top: 15,
    padding: 20,
},
todoInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 240,
},
flatList: {
    bottom: -30,
    height: 440,
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
    borderRadius: 3,
    borderWidth: 2,
    borderColor: colors.primary,
},
checkedBox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    backgroundColor: colors.primary,
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
fixedList: {
    height: 50,
},
strikeThrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
},

});

export default TodoScreen;