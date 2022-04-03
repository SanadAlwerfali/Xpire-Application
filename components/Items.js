import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from "react-native";
import { ProgressBar, Colors } from 'react-native-paper';
import itemsStyles from "../styles/itemsStyles";
import db from "../firebase";
import { QuerySnapshot } from "firebase/firestore";

export default class Items extends Component{
    constructor(props){
        super (props);
        this.docs = db.collection('users');
        this.state = {
            filteredUserItems: [],
            masterUserItems: [],
            isLoading: true
        }
    }

    // componentDidMount () {
    //     this.unsubscribe = this.docs.onSnapshot(this.getItemsData);
    // }

    // componentWillUnmount () {
    //     this.unsubscribe();
    // }

    // getItemsData = (querySnapshot) => {
    //     const items = [];
    //     querySnapshot.forEach((res) => {
    //         const {name, }
    //     })
    // }
    // updateUserItems = () => {
    //     console.log("Mounted");
    //     db.collection('users')
    //     .get()
    //     .then(result => result.docs)
    //     .then((docs) => {
    //         docs.forEach((doc) => {
    //             if(doc.id == "sW6JJvJ7Pq7sEnLKaCE1"){
    //                 this.setState ({
    //                     filteredUserItems: doc.data()['items'],
    //                     masterUserItems: doc.data()['items'],
    //                     isLoading: false,
    //                 }) 
    //                 console.log("data from db after component mount is: " , this.state.userItems);
    //             } 
    //         })
    //     })
    // // .then((screenshot) => {
    // //     if (screenshot.empty)
    // //     console.log("user doesn't have any items")
    // //     else {
    // //         screenshot.forEach((doc) => {
    // //             console.log("users data:",doc)
    // //         })
    // //     }
    // // })
    // .catch(error => {
    //     console.error('Couldnt get itmes', error)
    // })
    // }

    // componentDidMount () {
    //     this.updateUserItems();
    // }

    render() {
        if(this.props.isLoading){
            return (
                <View><Text>Loading</Text></View>
            )
        }
        return(
            <View style={itemsStyles.itemsContainer}>  
                <Text style={itemsStyles.itemsHeader}>Items</Text>
                <SafeAreaView style={itemsStyles.itemsBody}>
                    <FlatList  
                        data={this.props.filteredUserItems}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                            <View style={itemsStyles.item} key={item.key}>
                                <View style={itemsStyles.itemPicContainer}>
                                    <Image style={itemsStyles.image} source={{uri: item.image}} /> 
                                </View>
                                <View style={itemsStyles.itemDetailsContainer}>
                                    <View style={itemsStyles.itemDetailsHeaders}>
                                        <Text style={itemsStyles.itemName}>{item.name}</Text>
                                        
                                        <TouchableOpacity>
                                            <Text style={itemsStyles.itemDelete}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={itemsStyles.itemDetailsFooter}>
                                        <Text style={itemsStyles.itemDaysLeft}>{item.expiryDate.seconds} days left</Text>
                                        <ProgressBar style={itemsStyles.itemStatus} progress={item.progress} color={item.progressColor} />                                
                                    </View>
                                    <Text>something</Text>
                                </View>   
                            </View>
                        )}
                    />
                </SafeAreaView>
                
            </View>
        );
    }
};