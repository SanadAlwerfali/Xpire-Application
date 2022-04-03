import React, {useState, useEffect}from 'react';
import {View, TouchableOpacity, Text } from 'react-native';
import footerStyles from '../styles/footerStyles';
import {MaterialIcons } from '@expo/vector-icons';
import db from "../firebase";

const GetItemsComponent = () => {
    const [users, setUsers] = useState();

    useEffect( () => {
        db.collection('users')
        .get()
        .then(result => result.docs)
        .then(docs => docs.map(doc => ({
            id: doc.id, 
            items: doc.data().items,
            name: doc.data().name  
        })))
        .then (users => setUsers(users))
    }, [])
    console.log("users value is " + JSON.stringify(users));

    return (
        <View >
                <Text>Something</Text>      
        </View>
    );
}

export default GetItemsComponent;