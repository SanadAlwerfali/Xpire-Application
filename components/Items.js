import React, { Component } from "react";
import { Button, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from "react-native";
import { ProgressBar, Colors } from 'react-native-paper';
import itemsStyles from "../styles/itemsStyles";
import db from "../firebase";
import firebase from 'firebase/compat/app';
import auth from "../firebaseAuth";
import { getAuth } from "firebase/auth";
import { ScrollView } from "react-native";

export default class Items extends Component{
    constructor(props){
        super (props);
        // this.docs = db.collection('users');
        // this.state = {
        //     filteredUserItems: [],
        //     masterUserItems: [],
        //     isLoading: true
        // }
    }
    uid = getAuth().currentUser.uid;

    deleteItem = (item) => {
        db.collection('users')
        .doc(this.uid)
        .update({
            items: firebase.firestore.FieldValue.arrayRemove(item),
        })
        const tempFiltArray = [...this.props.filteredUserItems];
        const tempMastArray = [...this.props.masterUserItems];
        const index1 = tempFiltArray.indexOf(item);
        const index2 = tempMastArray.indexOf(item);
        tempFiltArray.splice(index1, 1);
        tempMastArray.splice(index2, 1);
        this.props.setFilteredItems(tempFiltArray);
        this.props.setMasterItems(tempMastArray);        
    }

    getRemaningDays = (item) => {
        const dataTime = item.expiryDate;
        const dataTimeToDate = dataTime.toDate();
        var timenow = new Date();
        var timeStamp = new Date(dataTimeToDate);
        const remaningDays = Math.abs(timeStamp - timenow) / (1000 * 60 * 60 * 24);
        return Math.round(remaningDays);
    }

    getProgressColor = (item) => {
        const remainingDays = this.getRemaningDays(item);
        var color = "";
        if (remainingDays<3){
            color = "#EB5757";
        }
        else if (3<remainingDays && remainingDays<7){
            color = "#F2994A";
        }
        else if(remainingDays>=7) {
            color = "#219653";
        }
        return color;
    } 

    getProgressNumber = (item) => {
        const remainingDays = this.getRemaningDays(item);
        var progress = "";
        if (remainingDays<3){
            progress = "0.25";
        }
        else if (3<remainingDays && remainingDays<7){
            console.log(remainingDays<7);
            progress = "0.5";
        }
        else if(remainingDays>=7) {
            progress = "1";
        }
        return progress;
    }
    
    render() {
        if(this.props.isLoading){
            return (
                <View><Text>Loading</Text></View>
            )
        }
        return(
            <View style={itemsStyles.itemsContainer}>  
                <Text style={itemsStyles.itemsHeader}>Items</Text>
                
                    <ScrollView style={itemsStyles.itemsBody}>
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
                                        
                                        <TouchableOpacity >
                                            <Text style={itemsStyles.itemDelete} onPress = {() => this.deleteItem(item)}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={itemsStyles.itemDetailsFooter}>
                                        <Text style={itemsStyles.itemDaysLeft}>{this.getRemaningDays(item)} days left</Text>
                                        <ProgressBar style={itemsStyles.itemStatus} progress={this.getProgressNumber(item)} color={this.getProgressColor(item)} />                                
                                    </View>
                                </View>   
                            </View>
                        )}
                    />
                    </ScrollView>
                
                
            </View>
        );
    }
};