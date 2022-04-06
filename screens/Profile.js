
import { getAuth } from 'firebase/auth';
import React from 'react';
import { render } from 'react-dom';
import {View, SafeAreaView, StyleSheet,TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Avatar, Title, Caption, Text, TouchableRipple} from 'react-native-paper';
import db from '../firebase';
import auth from "../firebaseAuth";
import { Component } from "react";
import Header from '../components/Header';
import bodyStyles from "../styles/bodyStyles";
import { useNavigation } from '@react-navigation/core';
import { Firestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import Footer from '../components/Footer';
import footerStyles from '../styles/footerStyles';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

export default class Profile extends Component {
   
    constructor(props){
        super (props);
        this.state = {
             displayName: "",
             userImage: "",
             expiredItems: "",
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
                else{
                    this.setState ({
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
        <View style={styles.body}>
            <View style={styles.userPicStyles}>
                <Avatar.Image 
                source={{
                uri: this.state.userImage,
                }}
                size={170}
                style={styles.picStyles}
                />
            </View>
            <Text style={styles.displayNameStyle}>{this.state.displayName}</Text>
            <View style={styles.mainBody}>
                <Text>Number of Expired Items</Text>
            </View>
            <LineChart
                data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                    data: [
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10
                    ]
                    }
                ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}
                bezier
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />
        </View>
        <View style={footerStyles.footer}>
            <TouchableOpacity>
                <View style={styles.mainBody}>
                <TouchableOpacity style={styles.buttons} onPress = {() => this.confirmAccountDeletion(this.uid)}>
                        <Text style={styles.buttonText}>Delete Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress = {() => this.confirmItemsDeletion(this.uid)}>
                        <Text style={styles.buttonText}>Delete All Items</Text>
                </TouchableOpacity>
                </View>
            </TouchableOpacity>        
        </View>
        
    </View>
    
    );
}
}


const styles = StyleSheet.create({
    userPicStyles: {
        borderColor: 'white',
        // backgroundColor: 'black',
        // alignItems: 'center',
        // justifyContent: 'flex-start'
        marginTop: '-30%',
    },
    picStyles:{
        borderColor: 'white',
        borderWidth: 2
    },
    profileMainBody:{
        backgroundColor: 'red'
    },
    displayNameStyle:{
        fontWeight: '500',
        fontSize: 24,
        color: '#000000',
        marginTop: '3%'
    },
    body:{
        width: '100%',
        height: '55%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // marginTop: -16,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    mainBody:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: '3%'
    },
    buttons:{
        marginTop: '5%',
        marginHorizontal: '5%',
        backgroundColor: '#EB5757',
        justifyContent: 'center',
        width: '40%',
        height: '70%',
        borderRadius: 100
    },
    buttonText:{
        color: '#FFFFFF',
        alignSelf: 'center'
    }
})

{/* <Avatar.Image 
                source={{
                uri: this.state.userImage,
                }}
                size={90}
            /> */}