
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import 'firebase/firestore';

const configuration = {
    apiKey: "AIzaSyCMXIew3kJcT1t93aeGA6sLgh0_CUxQ9iE",
    authDomain: "xpire-4520e.firebaseapp.com",
    projectId: "xpire-4520e",
    storageBucket: "xpire-4520e.appspot.com",
    messagingSenderId: "935436787701",
    appId: "1:935436787701:ios:bca0568b9922dc70390abc",
}

firebase.initializeApp(configuration);

var db = firebase.firestore();
var auth = firebase.auth();

export {db, auth};


