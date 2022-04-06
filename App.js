import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './views/Welcome';
import Signup from './views/Signup';
import Login from './views/Login';
import Home from './views/Home';
import Profile from './views/Profile';
import { LogBox } from 'react-native';


const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs(true);
  return (
    //using a stack navigator to navigate the user between different views
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
      <Stack.Screen options={{ headerShown: true }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: true }} name="Signup" component={Signup} />
      <Stack.Screen options={{ headerShown: false }} name="Home" component = {Home} />
      <Stack.Screen options={{ headerShown: false }} name="Profile" component = {Profile} />

    </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});