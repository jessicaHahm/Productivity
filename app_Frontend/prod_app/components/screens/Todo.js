import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { getUserId, setUserId } from '../SessionState';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TodoScreen({ navigation }) {
  const [userId, setUserId] = useState('');
  const [tasks, setTasks] = useState([]);

  const fetchUserId = async () => {
    try {
      const userId = await getUserId();
      setUserId(userId || '');
      console.log('Task creator user ID:', userId);
  
      if (userId !== null && userId !== 'null') {
        // User is signed in, fetch and display server tasks
        let url = "http://localhost:8080/api/tasks/" + String(userId);
        console.log(url);
        let response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          let data = await response.json();
          const updatedTasks = data.map(task => ({
            id: task.id,
            text: task.title,
          }))
          setTasks(updatedTasks);
  
          console.log('Network response ok');
          console.log('Response: ', data);
        } else {
          throw new Error('Network response not ok');
        }
      } else {
        // User is not signed in, fetch and display local tasks
        fetchLocalTasks();
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  

  const fetchLocalTasks = async () => {
    try {
      const existingTasks = JSON.parse(await AsyncStorage.getItem('localTasks')) || [];
      setTasks(existingTasks);
    } catch (error) {
      console.error('Error fetching local tasks:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserId(); 
    });
  
    return unsubscribe;
  }, [navigation]);
  

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const navigateToAddTodo = () => {
    navigation.navigate('AddTask');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <ScrollView style={{ width: '100%' }}>
        {tasks.map(task => (
          <View key={task.id} style={styles.taskContainer}>
            <Text style={styles.taskText}>{task.text}</Text>
            <TouchableOpacity onPress={() => deleteTask(task.id)}>
              <Text style={styles.buttonText}>🗑</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={navigateToAddTodo}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'royalblue',
    paddingVertical: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  taskText: {
    fontSize: 16,
  },
  buttonText: {
    fontSize: 20,
    color: 'red',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4e72de',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 24,
  },
});
