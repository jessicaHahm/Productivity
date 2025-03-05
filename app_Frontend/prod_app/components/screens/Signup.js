import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { setUserId, getUserId } from '../SessionState';

export default function Signup({ navigation, setDisplaySignup }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    var json_string = JSON.stringify({
      username: username,
      email: email,
      password: password
    });

    try {
      console.log(json_string);
      let response = await fetch("http://localhost:8080/api/users/signup", {
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

        DeviceEventEmitter.emit('userSignedUp');

        navigation.navigate("Calendar");
      }
      else {
        throw new Error('Network response not ok');
      }
    } catch (error) {
        console.error('Error during sign-up', error);
    }
  };

  return (
    <View style={styles.container}>
     <Text 
        style={styles.title}>Productiv</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="tommy_trojan"
          placeholderTextColor="#aaa"
          onChangeText={setUsername}
          value={username}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="tommytrojan@usc.edu"
          placeholderTextColor="#aaa"
          onChangeText={setEmail}
          value={email}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Create a password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        navigation.navigate('Login');
      }}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.linkText}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  title: {
    fontSize: 40, 
    fontWeight: 'bold',
    color: 'royalblue',
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 30,
    color: 'royalblue',
    fontWeight: 'bold',
    alignSelf: 'flex-start', 
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 5,
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
    backgroundColor: 'royalblue',
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
