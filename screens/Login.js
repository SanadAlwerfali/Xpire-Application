import { React, useEffect, useState } from 'react'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Button } from 'react-native'
import db from '../firebase';
import auth from "../firebaseAuth";
import * as Facebook from 'expo-auth-session/providers/facebook';
import { Platform } from 'react-native';
import { ResponseType } from 'expo-auth-session';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
WebBrowser.maybeCompleteAuthSession();


export default function Login() {
    
const navigation = useNavigation();

  // =============== FACEBOOK ==================
  // setting-up the auth request to the Provider
  const [request, response, facebookLogIn] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: '704461124328856',
  });

  useEffect(() => {
    // checking if the response we recieved is a 'success'
    if (response?.type === 'success') {
      const { access_token } = response.params;
      const auth = getAuth();
      // obtaining user's credentials to log in their account
      const credential = FacebookAuthProvider.credential(access_token);
      
      // then we sign the user in using their credentials obtained from the previous step
      signInWithCredential(auth, credential).then(() => {
          // obtaining the needed data
          const name = auth.currentUser.displayName;
          const picture = auth.currentUser.photoURL;
          const uid = auth.currentUser.uid;
          
          // adding them to the database
          db.collection('users').doc(uid).set({
              name: name,
              image: picture,
              items: []
          }).then(() => {
              navigation.navigate('Home');
          }).catch(error => alert("Please enter a valid email/password"));
      })
      
    }
  }, [response]);
  // =============== END FACEBOOK ==================

  // =============== GOOGLE ========================
  
  // setting-up the auth request to the Provider
  const [request1, response1, googleLogIn] = Google.useIdTokenAuthRequest(
    {
      clientId: '935436787701-1sn4p53voc81o7ensd8fabpt8qti3ho6.apps.googleusercontent.com',
    },
  );

  useEffect(() => {
    // checking if the response we recieved is a 'success'
    if (response1?.type === 'success') {
      const { id_token } = response1.params;
      const authGoogle = getAuth();

      // obtaining user's credentials to log in their account
      const credential = GoogleAuthProvider.credential(id_token);

      // then we sign the user in using their credentials obtained from the previous step
      signInWithCredential(authGoogle, credential).then(() => {
          
          // obtaining the needed data
          const name = authGoogle.currentUser.displayName;
          const picture = authGoogle.currentUser.photoURL;
          const uid = authGoogle.currentUser.uid;

          // adding them to the database
          db.collection('users').doc(uid).set({
              name: name,
              image: picture,
              items: []
          }).then(() => {
              navigation.navigate('Home');
          }).catch(error => alert("Please enter a valid email/password"));
        })
    }
  }, [response1]);
  // =============== END GOOGLE ==================

  // =============== EMAIL/PASS ==================

  // obtaining user's email and password
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    // setting up a firebase auth listener to check if the user is logged in
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log("user is logged in")
        navigation.navigate('Home');
      }
    })
    return unsubscribe
  })

  // function that handles the manual log in
  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        navigation.navigate('Home');
    })    .catch(error => alert("Somethings Wrong"))
  }
  // =============== END EMAIL/PASS ==================


  return (

    <KeyboardAvoidingView style={styles.container} behavior="padding">

        <View style={styles.body}>
            <View>
                <Text style={styles.topText}>Login</Text>
            </View>
        </View>

        <View style={styles.inputContainer}>
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
            <TouchableOpacity onPress = {handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress = {() => {facebookLogIn();}} style={styles.button}>
                <Text style={styles.buttonText}>Facebook</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress = {() => {googleLogIn();}} style={styles.button}>
                <Text style={styles.buttonText}>Google</Text>
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
    flexDirection: 'column',
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