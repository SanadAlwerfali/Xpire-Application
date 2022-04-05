
import { getAuth } from 'firebase/auth';
import React from 'react';
import { render } from 'react-dom';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import { Avatar, Title, Caption, Text, TouchableRipple} from 'react-native-paper';
import db from '../firebase';
import auth from "../firebaseAuth";
import { Component } from "react";
import Header from '../components/Header';
import bodyStyles from "../styles/bodyStyles";


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
            <View style={styles.profileMainBody}>
                <Text>Delete Account</Text>
                <Text>Delete All Items</Text>
            </View>
        </View>
        {/* <Footer  modalVisible={this.state.modalVisible} setModalVisible ={this.setModalVisible}/>       */}
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