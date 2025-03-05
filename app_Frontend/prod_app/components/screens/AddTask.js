import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import { getUserId } from '../SessionState';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTask({ navigation}) {
  const [userId, setUserId] = useState('');
  const [eventName, setEventName] = useState('');
  const [endDate, setEndDate] = useState('');
  const [collaborators, setCollaborators] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await getUserId();
        setUserId(userId || '');
        console.log('Task creator user ID:', userId);
      } catch (error) {
        console.error('Error adding new task:', error);
      }
    };
  
  fetchUserId()
  }, []);

  const handleAddTask = async () => {
    if (!userId) {
      // No user signed in, store task locally
      const newTask = {
        id: Date.now(),
        text: eventName,
      };

      try {
        // Fetch existing tasks
        const existingTasks = JSON.parse(await AsyncStorage.getItem('localTasks')) || [];
        // Add the new task
        const updatedTasks = [...existingTasks, newTask];
        // Store updated tasks
        await AsyncStorage.setItem('localTasks', JSON.stringify(updatedTasks));
      } catch (error) {
        console.error('Error storing task locally:', error);
      }
      navigateTodo();
      // You can also add logic to display a message to the user or handle it in a way that makes sense for your app
    } else {
      // User is signed in, send task to server
      const json_string = JSON.stringify({
        userId: userId,
        title: eventName,
        dDate: endDate,
        description: description,
      });

      try {
        console.log(json_string);
        const response = await fetch('http://localhost:8080/api/tasks/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: json_string,
        });

        if (response.ok) {
          console.log('Network response ok');
          console.log('Response: ', response);
          navigateTodo();
        } else {
          throw new Error('Network response not ok');
        }
      } catch (error) {
        console.error('Error during task creation:', error);
      }
    }
  };

  const navigateTodo = () => {
    navigation.navigate('Todo');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Task</Text>

      <View style={styles.textContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Task Name"
          placeholderTextColor="#aaa"
          onChangeText={setEventName}
          value={eventName}
        />
      </View>

      <View style={styles.dateContainer}>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>End Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#aaa"
            onChangeText={setEndDate}
            value={endDate}
          />
        </View>
      </View>


      <View style={styles.textContainer}>
        <Text style={styles.label}>Collaborators</Text>
        <TextInput
          style={styles.input}
          placeholder="Collaborators user name"
          placeholderTextColor="#aaa"
          onChangeText={setCollaborators}
          value={collaborators}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.largeInput}
          placeholder="Event description"
          placeholderTextColor="#aaa"
          onChangeText={setDescription}
          value={description}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add</Text>
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
  inputContainer: {
    width: '50%',
    marginVertical: 5,
  },
  textContainer: {
    width: '100%',
    marginVertical: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  timeInputContainer: {
    width: '50%',
  },
  allDayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 16,
    marginTop: 0,
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  largeInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    height: 100,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4e72de',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
