import React from 'react';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Welcome/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } 
});

