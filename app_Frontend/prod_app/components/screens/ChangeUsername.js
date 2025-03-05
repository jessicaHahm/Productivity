import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getUserId } from '../SessionState';

export default function ChangeUsernameScreen({ navigation }) {
    const [userId, setUserId] = useState('');
    const [newUsername, setNewUsername] = useState('');

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const userId = await getUserId();
                setUserId(userId);
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };
    fetchUserId();
    }, []);
    
    const handleUpdateUsername = async () => {
        var json_string = JSON.stringify({
            userId: userId,
            newUsername: newUsername
        });
    
        try {
            console.log(json_string);
            let response = await fetch("http://localhost:8080/api/users/update-username", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: json_string,
            });
    
            if (response.ok) {
                let data = await response;
                
                console.log('Network response ok');
                console.log(response);
            }
            else {
                throw new Error('Network response not ok');
            }
        } catch (error) {
            console.error('Error editing username', error);
        }
    };

    return(
        <View style={styles.container}>
            {/* Title */}
            <View style={styles.titleWrapper}>
                <FontAwesome name='cog' style={styles.cogIcon} />
                <Text style={styles.title}>Settings</Text>
            </View>

            {/* Header */}
            <View style={styles.headerWrapper}>
                <Text style={styles.header}>Edit Profile</Text>
            </View>
            <View style={styles.divider} />

            {/* Body */}
            <View style={styles.bodyWrapper}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.body}>New username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="username"
                        placeholderTextColor="#aaa"
                        onChangeText={setNewUsername}
                        value={newUsername}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button} onPress={handleUpdateUsername}>
                        <Text style={styles.buttonText}>Update Profile</Text>
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'center',
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
    inputWrapper: {
        flex: 5,
        justifyContent: 'center',
    },
    body: {
        color: 'black',
        fontSize: 20,
        marginHorizontal: 10,
    },
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    buttonWrapper: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#6475B4',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
    },
      buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center',
    },
});