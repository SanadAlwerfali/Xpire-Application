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
import itemsStyles from '../styles/itemsStyles';
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

    // setting up a firebase auth listener to check if the user is logged in
    const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          console.log("user is logged in")
          navigation.navigate('Home');
        }
        else{
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
                    db.collection('users').doc(uid).get()
                    .then(user => {
                        if (user.exists){
                            navigation.navigate('Home');
                            console.log('user exists')
                        }
                        else{
                            db.collection('users').doc(uid).update({
                                name: name,
                                image: picture,
                                items: [],
                            }).then(()=> {
                                navigation.navigate('Home');
                            }).catch(() => {
                                alert("Please enter a valid email/password")
                            })
                        }
                    })
                })
            }
        }

      })
      return unsubscribe
    // // checking if the response we recieved is a 'success'
    // if (response1?.type === 'success') {
    //   const { id_token } = response1.params;
    //   const authGoogle = getAuth();

    //   // obtaining user's credentials to log in their account
    //   const credential = GoogleAuthProvider.credential(id_token);

    //   // then we sign the user in using their credentials obtained from the previous step
    //   signInWithCredential(authGoogle, credential).then(() => {
          
    //       // obtaining the needed data
    //       const name = authGoogle.currentUser.displayName;
    //       const picture = authGoogle.currentUser.photoURL;
    //       const uid = authGoogle.currentUser.uid;

    //       // adding them to the database
    //       db.collection('users').doc(uid).set({
    //           name: name,
    //           image: picture,
    //       }).then(() => {
    //           navigation.navigate('Home');
    //       }).catch(error => alert("Please enter a valid email/password"));
    //     })
    // }
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
    })    .catch(error => alert("Inavlid email or password"))
  }
  // =============== END EMAIL/PASS ==================


  return (
    <View style={styles.container}>
    <KeyboardAvoidingView style={styles.keyAvoidingViewContainer} behavior="padding">

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
            <TouchableOpacity onPress = {handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>

        
    </KeyboardAvoidingView>
    <View style={styles.footerBottom}>
            
            <TouchableOpacity onPress = {() => {googleLogIn();}} style={styles.authButtons}>
                <Image style ={styles.image} source={require("../assets/googleSignIn.png")}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButtons}>
                <Image style ={styles.image} source={require("../assets/appleSignIn.png")}/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => {facebookLogIn();}} style={styles.authButtons}>
                <Image style ={styles.image} source={require("../assets/facebookSignIn.png")}/>
            </TouchableOpacity>
            
        </View>
    </View>
)
}



const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'white',
},
keyAvoidingViewContainer:{
    height: '40%',
    //justifyContent: 'center',
    marginTop: '10%',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column'
},
body: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '10%'
},
topText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 30,
    textAlign: 'center',
},
inputContainer: {
    width: '80%',
    height: '30%'
},
input: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
    height: 60,
},
button: {
    width: '100%',
    height: '55%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2994A',
    borderRadius: 100,
    marginVertical: "5%",
},
authButtons: {
    width: '85%',
    height: '13%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: "5%",
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.00,
    //elevation: 0,
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
    // position: 'relative',
    //justifyContent: 'space-around',
    // paddingTop: '20%',
    alignItems: 'center',
    flexDirection: 'column',

},
image:{
    width: '100%',
    height: '100%',
    borderRadius: 10,
    flex: 1,
},

})