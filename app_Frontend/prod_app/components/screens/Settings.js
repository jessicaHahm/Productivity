import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, DeviceEventEmitter } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { setUserId, getUserId} from '../SessionState'
import RNRestart from 'react-native-restart'; // Import package from node modules

export default function SettingsScreen({ navigation }) {
    const [displayName, setDisplayName] = useState('');
    const [pushNotificationEnabled, setPushNotificationEnabled] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          fetchUserId();
        });
    
        return unsubscribe;
      }, [navigation]);

    const fetchUserId = async () => {
        try {
          const userId = await getUserId();
          setUserId(userId);
    
          try {
            if (userId != null) {
              let url = "http://localhost:8080/api/users/" + String(userId);
              console.log(url);
              let response = await fetch(url, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
    
              if (response.ok) {
                let data = await response.json();
                let username = data['username'];
                setDisplayName(username);

                console.log('Network response ok');
                console.log('Response: ', data);
                console.log(username);
              }
              else {
                throw new Error('Network response not ok');
              } 
            }
          } catch (error) {
              console.error('Error during sign-up', error);
          }
        } catch (error) {
          console.error('Error adding new task:', error);
        }
      }

    const handleLogout = () => {
        setUserId(null);
        console.log("User ID in settings: " + getUserId());
        DeviceEventEmitter.emit('userLoggedOut');
        navigation.navigate('Calendar');
    }

    return(
        <View style={styles.container}>
            {/* Title */}
            <View style={styles.titleWrapper}>
                <FontAwesome name='cog' style={styles.cogIcon} />
                <Text style={styles.title}>Settings</Text>
            </View>

            {/* Header */}
            <View style={styles.headerWrapper}>
                <View style={styles.profileIcon} />
                <Text style={styles.header}>{displayName}</Text>
            </View>
            <View style={styles.divider} />

            {/* Body */}
            <View style={styles.bodyWrapper}>
                <Text style={styles.body}>Account Settings</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChangeUsername')}>
                    <Text style={styles.buttonText}>Change username</Text>
                    <Feather name='chevron-right' size={15}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChangePassword')}>
                    <Text style={styles.buttonText}>Change password</Text>
                    <Feather name='chevron-right' size={15}/>
                </TouchableOpacity>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Push Notifications</Text>
                    <Switch
                        value={pushNotificationEnabled}
                        onValueChange={(value) => setPushNotificationEnabled(value)}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#90a5e5',
    },
    titleWrapper: {
        flex: 1, 
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginRight: 15,
    },
    cogIcon: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        marginRight: 15,
    },
    headerWrapper: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    header: {
        color: 'black',
        fontSize: 20,
        fontWeight: '400',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#ced4da',
        marginRight: 15,
    },
    divider: {
        borderBottomColor: '#dee2e6',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    bodyWrapper: {
        flex: 7,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    body: {
        color: '#adb5bd',
        fontSize: 20,
        fontWeight: '500',
    },
    button: {
        backgroundColor: 'white',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
      buttonText: {
        fontSize: 20,
        color: 'black',
        fontWeight: '400',
    },
});