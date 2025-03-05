import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import Signup from './components/Signup';
// import Signin from './components/Signin';
import TabBar from './components/Tabbar';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <TabBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
