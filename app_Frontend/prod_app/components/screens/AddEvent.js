import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import { createCalendarEvent } from './Calendar'; // Adjust the path accordingly

export default function AddEvent({ navigation, route }) {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [collaborators, setCollaborators] = useState('');
  const [categories, setCategories] = useState('');
  const [description, setDescription] = useState('');
  const { accessToken } = route.params;

  const handleAddEvent = async () => {

    const event = {
      summary: eventName,
      start: {
        dateTime: `${startDate}T09:00:00-07:00`,
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: `${endDate}T09:00:00-07:00`,
        timeZone: 'America/Los_Angeles',
      },
      location: 'University Way, Los Angeles, CA 90089',
      description: description,
    };

    await createCalendarEvent(event, accessToken);
    navigateToCalendar();
  };

  const navigateToCalendar = () => {
    navigation.navigate('Calendar');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Event</Text>

      <View style={styles.textContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Event name"
          placeholderTextColor="#aaa"
          onChangeText={setEventName}
          value={eventName}
        />
      </View>

      {/* <View style={styles.timeContainer}>
        <View style={styles.timeInputContainer}>
          <Text style={styles.label}>From</Text>
          <TextInput
            style={styles.input}
            placeholder="12:00 pm"
            placeholderTextColor="#aaa"
            onChangeText={setStartTime}
            value={startTime}
          />
        </View>

        <View style={styles.timeInputContainer}>
          <Text style={styles.label}>To</Text>
          <TextInput
            style={styles.input}
            placeholder="12:00 pm"
            placeholderTextColor="#aaa"
            onChangeText={setEndTime}
            value={endTime}
          />
        </View>
      </View> */}

      <View style={styles.dateContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Start Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#aaa"
            onChangeText={setStartDate}
            value={startDate}
          />
        </View>

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

      <View style={styles.allDayContainer}>
        <Switch value={allDay} onValueChange={setAllDay} />
        <Text style={styles.label}>All day</Text>
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
        <Text style={styles.label}>Categories</Text>
        <TextInput
          style={styles.input}
          placeholder="Categories name"
          placeholderTextColor="#aaa"
          onChangeText={setCategories}
          value={categories}
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

      <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
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
