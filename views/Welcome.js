import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import {React } from 'react'

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.body}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/splash.png')} /> 
            </View>
        </View>
        <View style={styles.footer}>
            <View style={styles.footerTop}>
                <Text style={styles.footerText}>Welcome</Text>
            </View>
            <View style={styles.footerBottom}>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.buttons}>
                    <Text style={styles.buttonText}>Sign Up</Text>  
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.buttons}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View> 
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#FFF5EC', 
    },
    body:{
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF5EC', 
    },
    imageContainer:{
        width: '85%',
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    image:{
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    buttons: {
        width: '35%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2994A',
        borderRadius: 100,
    },
    buttonText: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    footer:{
        height: '20%',
        alignItems: 'center',
        flexDirection: 'column',
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
        backgroundColor: '#FFFFFF',
    },
    footerTop:{
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems:'center',
    },
    footerBottom:{
        width: '100%',
        height: '70%',
        justifyContent: 'space-evenly',
        paddingTop: '5%',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    footerText:{
        paddingTop: '3%',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 24,
        color: '#000000',
    }
});