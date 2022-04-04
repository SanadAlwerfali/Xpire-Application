import React, { Component } from "react";
import { Button, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from "react-native";
import { ProgressBar, Colors } from 'react-native-paper';
import itemsStyles from "../styles/itemsStyles";
import db from "../firebase";
import firebase from 'firebase/compat/app';


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
    
    deleteItem = (item) => {
        db.collection('users')
        .doc("sW6JJvJ7Pq7sEnLKaCE1")
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
        console.log("dataTime is: ", dataTime);
        var timenow = new Date();
        var timeStamp = new Date(dataTimeToDate);
        const remaningDays = Math.abs(timeStamp - timenow) / (1000 * 60 * 60 * 24);
        return Math.round(remaningDays);
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
                                        
                                        <TouchableOpacity >
                                            <Text style={itemsStyles.itemDelete} onPress = {() => this.deleteItem(item)}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={itemsStyles.itemDetailsFooter}>
                                        {item.expiryDate.seconds!= " " && 
                                        <Text style={itemsStyles.itemDaysLeft}>{this.getRemaningDays(item)} days left</Text>
                                        
                                        }
                                        
                                        <ProgressBar style={itemsStyles.itemStatus} progress={item.progress} color={item.progressColor} />                                
                                    </View>
                                </View>   
                            </View>
                        )}
                    />
                </SafeAreaView>
                
            </View>
        );
    }
};