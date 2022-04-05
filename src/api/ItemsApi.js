
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
                return userItems;
            } 
        })
    })
    .catch(error => {
        console.error('Couldnt get itmes', error)
    })
    
    
    return userItems;   
}