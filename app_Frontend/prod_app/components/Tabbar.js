import React, { useState, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getUserId } from './SessionState';

// Screens
import AddEventScreen from './screens/AddEvent'; // Adjust the path as needed
import ChatScreen from './screens/Chat';
import CalendarScreen from './screens/Calendar';
import TodoScreen from './screens/Todo';
import SettingsScreen from './screens/Settings';
import ChangeUsernameScreen from './screens/ChangeUsername';
import ChangePasswordScreen from './screens/ChangePassword';
import UserStack from './screens/UserStack';
import AddTask from './screens/AddTask';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ScreenStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name='ChangeUsername' component={ChangeUsernameScreen} options={{ headerShown: false }} />
            <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
            <Stack.Screen name="AddTask" component={AddTask} />
        </Stack.Navigator>
    )
}

const TabBar = () => {
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const sessionUID = await getUserId();

                if (sessionUID != 'null') {
                    console.log("user is signed in")
                    setSignedIn(true);
                    console.log('User ID:', sessionUID);
                }
                else {
                    console.log("user is signed out")
                    setSignedIn(false);
                }
            } catch (error) {
                console.error('Error adding new task:', error);
            }
        };  
        fetchUserId();

        const signupListener = DeviceEventEmitter.addListener('userSignedUp', () => {
            setSignedIn(true);
        });

        const loginListener = DeviceEventEmitter.addListener('userLoggedIn', () => {
            setSignedIn(true);
        });

        const logoutListener = DeviceEventEmitter.addListener('userLoggedOut', () => {
            setSignedIn(false);
        });

        return () => {
            signupListener.remove();
            loginListener.remove();
            logoutListener.remove();
        };

    }, []);
    
    return(
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = null;

                if (route.name === 'Chat') {
                    iconName = 'chatbubble';
                } else if (route.name === 'Calendar') {
                    iconName = 'calendar';
                } else if (route.name === 'Todo') {
                    iconName = 'list';
                } else if (route.name === 'ScreenStack' && signedIn) {
                    iconName = 'settings-sharp';
                } else if ((route.name === 'User' && !signedIn)) {
                    iconName = 'person';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: '#6277B5',
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#90a5e5',
            }
        })}
        >
            {/* <Tab.Screen name='Chat' component={ChatScreen} options={{ headerShown: false }} /> */}
            <Tab.Screen name='Calendar' component={CalendarScreen} options={{ headerShown: false }} />
            <Tab.Screen name='Todo' component={TodoScreen} options={{ headerShown: false }} />
            {/* <Tab.Screen name='AddEvent' component={AddEventScreen} options={{ headerShown: false }} /> */}

            {/* {displaySignup ? (
                <Tab.Screen
                    name='Signup'
                    options={{ headerShown: false }}
                >
                    {() => <Signup setDisplaySignup={setDisplaySignup} />}
                </Tab.Screen>
                ) : (
                <Tab.Screen
                    name='Login'
                    options={{ headerShown: false }}
                >
                    {() => <Login setDisplaySignup={setDisplaySignup} />}
                </Tab.Screen>
            )} */}

            {signedIn ? (
                <Tab.Screen
                    name='ScreenStack'
                    component={ScreenStack}
                    options={{ headerShown: false }}
                />
            ) : (
                <Tab.Screen
                    name='User'
                    options={{
                        tabBarVisible: false,
                        headerShown: false, }}
                    >
                {() => <UserStack setDisplaySignup={setSignedIn} />}
            </Tab.Screen>
            )}
            

            <Tab.Screen 
                name='AddEvent' 
                component={AddEventScreen} 
                options={{ 
                    headerShown: false, 
                    tabBarButton: () => null // This hides the tab button
                }} 
            />
             <Tab.Screen 
                name='AddTask' 
                component={AddTask} 
                options={{ 
                    headerShown: false, 
                    tabBarButton: () => null // This hides the tab button
                }} 
            />
            {/* <Tab.Screen name='ScreenStack' component={ScreenStack} options={{ headerShown: false }} /> */}
        </Tab.Navigator>
    );
}

export default TabBar;
