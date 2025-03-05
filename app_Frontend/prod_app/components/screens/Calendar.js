import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';

const API_KEY = 'AIzaSyAs6kUo_RuSjXjBAr8O5rGWENkmYFL8F9I'; // Replace with your Google API Key
WebBrowser.maybeCompleteAuthSession();

export const createCalendarEvent = async (event, accessToken) => {
    if (!accessToken) {
        console.error('Access Token is not available');
        return;
    }

    try {
        const response = await axios.post(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            event,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Event Created:', response.data);
    } catch (error) {
        console.error('Error occurred while creating event:', error);
    }
};

// export const getCalendarEvents = async (accessToken, setEvents, setMarkedDates) => {
//     if (!accessToken) {
//         console.error('Access Token is not available');
//         return;
//     }

//     try {
//         const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
//             headers: { Authorization: `Bearer ${accessToken}` },
//         });

//         const newEvents = response.data.items.map(item => {
//             const { summary: name, start, end, description } = item;
//             const startDate = start.date || start.dateTime.split('T')[0]; // Convert to 'YYYY-MM-DD' format
//             return { name, start: startDate, end, description };
//         });

//         setEvents(newEvents);

//         const newMarkedDates = newEvents.reduce((acc, curr) => {
//             const date = curr.start;
//             if (date) {
//                 acc[date] = { marked: true, dotColor: 'blue' }; // Customize the dot color and marked status
//             }
//             return acc;
//         }, {});

//         setMarkedDates(newMarkedDates);
//     } catch (error) {
//         console.error('Error occurred while getting events: ' + error.message);
//         if (error.response && error.response.status === 401) {
//             // If the token is expired, refresh it
//             await refreshAccessToken();
//         }
//     }
// };

export default function CalendarScreen({ navigation }) {
    const [userInfo, setUserInfo] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [accessToken, setAccessToken] = useState(null);
    const [markedDates, setMarkedDates] = useState({});

    const [request, response, promptAsync] = useAuthRequest(
        {
            expoClientId: '274230327328-40agv1unjlkjv0h531nociog7me093hb.apps.googleusercontent.com',
            webClientId: '274230327328-40agv1unjlkjv0h531nociog7me093hb.apps.googleusercontent.com',
            iosClientId: '274230327328-qg3nqte4qi6cgo6e445s3ar70hv2tp3h.apps.googleusercontent.com',
            androidClientId: '274230327328-d85927mq61t0kuieis557ug4s15f5g58.apps.googleusercontent.com',
            scopes: ['https://www.googleapis.com/auth/calendar'],
            accessType: 'offline',
            //   redirectUri: makeRedirectUri({ useProxy: false }),
        },
        {},
        handleAuthCallback
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { accessToken } = response.authentication;
            if (accessToken) {
                // Save the access token if it's available
                saveAccessToken(accessToken);
                // Since we have a token, we can also fetch calendar events
                getCalendarEvents(accessToken, setEvents, setMarkedDates, refreshAccessToken);
            }
        }
    }, [response]);

    useEffect(() => {
        retrieveAccessToken();
    }, []);

    const navigateToAddEvent = () => {
        navigation.navigate('AddEvent', { accessToken });
    };

    const saveAccessToken = async (token) => {
        if (!token) {
            console.error('Token is undefined or null, cannot save.');
            return;
        }
        try {
            await AsyncStorage.setItem('@accessToken', token);
        } catch (error) {
            console.error('Failed to save access token', error);
        }
    };

    const retrieveAccessToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('@accessToken');
            if (storedToken) {
                setAccessToken(storedToken);
            }
        } catch (error) {
            console.error('Failed to retrieve access token', error);
        }
    };

    const getCalendarEvents = async () => {
        if (!accessToken) {
            console.error('Access Token is not available');
            return;
        }
    
        try {
            const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
    
            const newEvents = response.data.items.map(item => {
                const { summary: name, start, end, description } = item;
                const startDate = start.date || start.dateTime.split('T')[0]; // Convert to 'YYYY-MM-DD' format
                return { name, start: startDate, end, description };
            });
    
            setEvents(newEvents);
    
            const newMarkedDates = newEvents.reduce((acc, curr) => {
                const date = curr.start;
                if (date) {
                    acc[date] = { marked: true, dotColor: 'blue' }; // Customize the dot color and marked status
                }
                return acc;
            }, {});
    
            setMarkedDates(newMarkedDates);
        } catch (error) {
            console.error('Error occurred while getting events: ' + error.message);
            if (error.response && error.response.status === 401) {
                // If the token is expired, refresh it
                await refreshAccessToken();
            }
        }
    };

    async function refreshAccessToken() {
        try {
            const refreshToken = await AsyncStorage.getItem('@refreshToken');
            if (!refreshToken) {
                console.error('No refresh token available');
                return;
            }

            const response = await axios.post('https://oauth2.googleapis.com/token', {
                client_id: '274230327328-40agv1unjlkjv0h531nociog7me093hb.apps.googleusercontent.com',
                // client_secret: 'YOUR_CLIENT_SECRET', // Replace with your actual client secret
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
            });

            const { access_token: newAccessToken, expires_in: expiresIn } = response.data;
            await AsyncStorage.setItem('@accessToken', newAccessToken);
            // Optionally, store the expiration time as well
            const expirationTime = new Date().getTime() + expiresIn * 1000;
            await AsyncStorage.setItem('@accessTokenExpirationTime', expirationTime.toString());

            setAccessToken(newAccessToken);
        } catch (error) {
            console.error('Failed to refresh access token', error);
            // Additional error handling can be implemented here
        }
    }

    const handleSignOut = async () => {
        try {
            await AsyncStorage.removeItem('@accessToken');
            await AsyncStorage.removeItem('@refreshToken');
            await AsyncStorage.removeItem('@user');
            setAccessToken(null);
            setUserInfo(null);
            // Any additional logic you need to fully sign out the user goes here.
        } catch (error) {
            console.error('Error signing out', error);
        }
    };

    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const user = await response.json();
            await AsyncStorage.setItem('@user', JSON.stringify(user));
            setUserInfo(user);
        } catch (error) {
            console.error('Failed to fetch user info', error);
        }
    };

    const handleAuthCallback = async (authResult) => {
        if (authResult.type === 'success') {
            const { authentication } = authResult;
            if (authentication.accessToken) {
                setAccessToken(authentication.accessToken);
                await saveAccessToken(authentication.accessToken);
                if (authentication.refreshToken) {
                    await AsyncStorage.setItem('@refreshToken', authentication.refreshToken);
                }
                // Fetch calendar events right after getting the access token
                getCalendarEvents(authentication.accessToken, setEvents, setMarkedDates, refreshAccessToken);
            } else {
                console.error('Authentication succeeded but no access token received');
            }
        }
    };

    async function handleSignInWithGoogle() {
        if (response?.type === 'success') {
            const { authentication } = response;
            setAccessToken(authentication.accessToken);
            console.log('Access Token:', authentication.accessToken);
            await AsyncStorage.setItem('@accessToken', authentication.accessToken);

            if (authentication.refreshToken) {
                await AsyncStorage.setItem('@refreshToken', authentication.refreshToken);
            }
            await getUserInfo(authentication.accessToken);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.calendarWrapper}>
                <Calendar
                    style={styles.calendar}
                    theme={{
                        calendarBackground: '#90a5e5',
                        dayTextColor: 'black',
                        todayTextColor: 'white',
                        textDisabledColor: 'black',
                        arrowColor: 'black',
                    }}
                    markedDates={markedDates}
                    onDayPress={(day) => {
                        console.log('selected day', day);
                        setSelectedDate(day.dateString);
                    }}
                />
            </View>
            <Button title="Sign in with Google " onPress={() => promptAsync()} />

            <View style={styles.eventsContainer}>
                <Text style={styles.eventsTitle}>Events</Text>
                <ScrollView style={styles.eventsList}>
                    {events.map((event, index) => (
                        <View key={index} style={styles.eventItem}>
                            {/* Display the event name and start date */}
                            <Text>{event.name} - {event.start}</Text>
                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity
                    style={styles.addEventButton}
                    onPress={navigateToAddEvent}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
                <Button title="Refresh" onPress={getCalendarEvents} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarWrapper: {
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 20,
    },
    calendar: {
        padding: 5,
    },
    eventsContainer: {
        flex: 1,
        width: '80%',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        margin: 20,
    },
    eventsTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'royalblue',
        marginBottom: 20,
    },
    eventsList: {
        width: '100%',
    },
    eventItem: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    signOutButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#4e72de',
        borderRadius: 10,
        padding: 10,
    },
    signOutButtonText: {
        color: 'white',
        fontSize: 18,
    },
    addEventButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#4e72de',
        borderRadius: 50,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 24,
        paddingHorizontal: 10, // Add padding for touch area
    },
    addButtonText: {
        color: 'white',
        fontSize: 24,
        marginBottom: 5,
    },
});
