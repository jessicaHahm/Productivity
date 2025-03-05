import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { setUserId, getUserId } from '../SessionState';

export const emitLogin = {}

export default function Login({ navigation, setDisplaySignup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        var json_string = JSON.stringify({
            username: username,
            password: password
        });
    
        try {
            console.log(json_string);
            let response = await fetch("http://localhost:8080/api/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: json_string,
            });
    
            if (response.ok) {
                let data = await response.json();
                await setUserId(data["userId"]);
                const recalled_id = await getUserId();
                
                console.log('Network response ok');
                console.log('User ID: ', recalled_id);

                DeviceEventEmitter.emit('userLoggedIn');

                navigation.navigate("Calendar");
            }
            else {
                throw new Error('Network response not ok');
            }
        } catch (error) {
            console.error('Error during sign-in', error);
        }
    };

    return(
        <View style={styles.container}>
            <Text 
                style={styles.title}>Productiv</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                style={styles.input}
                placeholder="your username"
                placeholderTextColor="#aaa"
                onChangeText={setUsername}
                value={username}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                style={styles.input}
                placeholder="must be 8 characters"
                placeholderTextColor="#aaa"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.footerText}>
                Don't have an account? <Text style={styles.linkText}>Sign up</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    title: {
        fontSize: 40, 
        fontWeight: 'bold',
        color: 'royalblue',
        paddingVertical: 20, 
    },
    inputContainer: {
        width: '100%',
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#4e72de',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    footerText: {
        marginTop: 20,
        fontSize: 14,
    },
    linkText: {
        color: 'royalblue',
    },
});
