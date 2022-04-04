import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core'
import { React, useEffect, useState } from 'react'
import {db, auth} from '../firebase';
import * as Google from 'expo-auth-session/providers/google';



export default function Signup () {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation()
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            console.log("User is Signed in! as:", user.email);
          }
        })
    
        return unsubscribe
    })

    const handleSignUp = () => {
    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            const uid = user.uid;
            db.collection('users').doc(uid).set({
                name: name,
                email: email,
            }).then(() => {
                navigation.navigate('Home');
            }).catch(error => alert(error.message))
        }).catch(error => alert(error.message));
    }

    return (

        <KeyboardAvoidingView style={styles.container} behavior="padding">

            <View style={styles.body}>
                <View>
                    <Text style={styles.topText}>Sign Up</Text>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.footerBottom}>
                <TouchableOpacity onPress = {handleSignUp} style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    inputContainer: {
        width: '80%',
        //height: '20%'
    },
    input: {
        backgroundColor: '#F6F6F6',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
        height: 60,
    },
    buttonContainer: {
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2994A',
        borderRadius: 100,
    },
    button: {
        width: '85%',
        height: '15%',
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

    footerBottom: {
        width: '100%',
        height: '50%',
        position: 'relative',
        justifyContent: 'space-evenly',
        paddingTop: '20%',
        alignItems: 'flex-end',
        flexDirection: 'row',

    },
    footerTop: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topText: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 30,
        lineHeight: 36,
        textAlign: 'center',
    },
    body: {
        alignItems: 'center',
        flexDirection: 'row',
    },
})