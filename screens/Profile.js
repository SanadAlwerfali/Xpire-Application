
import { getAuth } from 'firebase/auth';
import React from 'react';
import { render } from 'react-dom';
import {View, SafeAreaView, StyleSheet,TouchableOpacity, Alert } from 'react-native';
import { Avatar, Title, Caption, Text, TouchableRipple} from 'react-native-paper';
import db from '../firebase';
import auth from "../firebaseAuth";
import { Component } from "react";
import Header from '../components/Header';
import bodyStyles from "../styles/bodyStyles";
import { useNavigation } from '@react-navigation/core';
import { Firestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';


export default class Profile extends Component {
   
    constructor(props){
        super (props);
        this.state = {
             displayName: "",
             userImage: "",
             isLoading: true,
         }
    }

    uid = getAuth().currentUser.uid;
    
    getUserInformation = () => {
        db.collection('users')
        .get()
        .then(result => result.docs)
        .then((docs) => {
            docs.forEach((doc) => {
                
                if(doc.id == this.uid){
                    //console.log(doc.data().name);
                    this.setState ({
                        displayName: doc.data().name,
                        userImage: doc.data().image,
                        isLoading: false,
                    }) 
                } 
            })
        })
        .catch(error => {
            console.error('Couldnt get itmes', error)
        })   
    }
    
    deleteAllItems = async (uid) => {
        const accountRef = db.collection('users').doc(uid);
        // Remove the 'items' field from the document
        const res = await accountRef.update({
        items: firebase.firestore.FieldValue.delete()
        }).then(() => {
            console.log('items have been deleted')
            this.props.navigation.navigate('Home');
        })
        .catch((error) => console.log(error));        
    }

    deleteAccount = async (uid) => {
        const res = await db.collection('users').doc(uid).delete();
        this.props.navigation.navigate('Welcome');
    }

    confirmItemsDeletion = (uid) => {
        Alert.alert('Delete My Items', 'You are about to delete all your items, would you like to continue?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
            },
            { text: 'OK', onPress: () => this.deleteAllItems(uid)},
          ]);
    }

    confirmAccountDeletion = (uid) => {
        Alert.alert('Delete Account', 'We are sad to see you go! would you like to continue?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
            },
            { text: 'OK', onPress: () => this.deleteAccount(uid)},
          ]);
    }

    componentDidMount () {
        this.getUserInformation();
        console.log(this.uid);
    }

    render(){
     if(this.state.isLoading){
        return (
            <View><Text>Loading</Text></View>
        )
    }
    return (
    
    <View>
        <Header title="Profile" rightHeader="Logout" leftHeader="Home"/>
        <View style={bodyStyles.body}>
            <View style={styles.userPicStyles}>
                <Avatar.Image 
                source={{
                uri: this.state.userImage,
                }}
                size={90}
                />
            </View>
        </View>
        <View>
        <TouchableOpacity onPress = {() => this.confirmAccountDeletion(this.uid)}>
                    <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => this.confirmItemsDeletion(this.uid)}>
                    <Text style={styles.buttonText}>Delete All Items</Text>
            </TouchableOpacity>
        </View>
    </View>
    
    );
}
}


const styles = StyleSheet.create({
    userPicStyles: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    profileMainBody:{
        backgroundColor: 'red'
    },
})

{/* <Avatar.Image 
                source={{
                uri: this.state.userImage,
                }}
                size={90}
            /> */}