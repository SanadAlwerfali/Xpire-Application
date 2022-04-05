// import { fireDB } from '../../firebase';

// export function addItem(item, addComplete){
//     console.log(item);
//     fireDB.collection('items').add({
//         name: item.name,
//         expiryDate: item.expiryDate
//     }).then((data) => addComplete(data))
//     .catch((error) => console.log(error));
// }
// import { initializeApp } from 'firebase/app';
// import { getFirestore, setDoc, doc } from 'firebase/firestore';

// const firebaseConfig = firebase.initializeApp({
//     apiKey: "AIzaSyDyFTATqCbplwQA_H0zNHl8Pn6clO0fQHk",
//     authDomain: "xpire-4520e.firebaseapp.com",
//     projectId: "xpire-4520e",
//     storageBucket: "xpire-4520e.appspot.com",
//     messagingSenderId: "935436787701",
//     appId: "1:935436787701:ios:bca0568b9922dc70390abc",
// });

// initializeApp(firebaseConfig);
// const firestore = getFirestore();

// await setDoc(doc(firestore, "users", "Cs68GbH7j8nm8wyAKeCP"), {
//     items: "plumber",
//   });

// export async function getItems(itemsReceived){
//     var itemList = [];

//     var snapshot = await fireDB.collection('items')
//     .orderBY('expiryDate')
//     .get()

//     snapshot.foreach((doc) => {
//         foodList.push(doc.data());
//     });

//     itemsReceived(itemList);
// }
import React, {useState, useEffect}from 'react';
import db from "../../firebase";

const uid = "sW6JJvJ7Pq7sEnLKaCE1";
const userItems = [];
export function getItems(){
    
    db.collection('users')
    .get()
    .then(result => result.docs)
    .then((docs) => {
        docs.forEach((doc) => {
            if(doc.id == "sW6JJvJ7Pq7sEnLKaCE1"){
                userItems.push(doc.data());
                console.log("data from db is" , userItems);
                return userItems;
            } 
        })
    })
    
        
    
    // .then((screenshot) => {
    //     if (screenshot.empty)
    //     console.log("user doesn't have any items")
    //     else {
    //         screenshot.forEach((doc) => {
    //             console.log("users data:",doc)
    //         })
    //     }
    // })
    .catch(error => {
        console.error('Couldnt get itmes', error)
    })
    
    console.log("userItems array being sent is", userItems);
    
    return userItems;   
}