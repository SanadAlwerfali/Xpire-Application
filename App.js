import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <><View style={styles.front}>
      <Image
        style={{ width: 300, height: 300 }}
        resizeMode="contain"
        source={require('./assets/splash.png')} />
    </View>
    <View style={styles.footer}>
      <Text style={styles.footerText}>Welcome</Text>
    </View>
      <View >
      <TouchableOpacity>
        <View style={styles.Rightbutton}>
          <Text style={styles.ButtonText}>Sign Up</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.Leftbutton}>
          <Text style={styles.ButtonText}>Log In</Text>
        </View>
      </TouchableOpacity>
    </View>
  </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  front: {
    flex: 1,
    backgroundColor: '#FFF5EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Rightbutton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    height: 51,
    left: 220,
    right: 15,
    bottom: 65,
    backgroundColor: '#F2994A',
    borderRadius: 100,
  },
  Leftbutton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    height: 51,
    left: 15,
    right: 220,
    bottom: 65,
    backgroundColor: '#F2994A',
    borderRadius: 100,
  },
  ButtonText: {
    
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 45,
    textAlign: 'center',
    color: '#FFFFFF',
    flex: 1,
    
  },
  footer:{
    alignItems: 'center',
    position: 'absolute',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    width: '100%',
    height: 210,
    top: 641,
    backgroundColor: '#FFFFFF',
  },
  footerText:{
    paddingTop: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 29,
    textAlign: 'center',
    color: '#000000',
  }
});
