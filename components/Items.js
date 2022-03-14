import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from "react-native";
import { ProgressBar, Colors } from 'react-native-paper';
import itemsStyles from "../styles/itemsStyles";

export default class Items extends Component{
    constructor(props){
        super (props);
        this.state = {
            product: 
            [
                {key: 1, name: 'Bread', image:require('../assets/icon.png'), remainingDays: 2, progress: 0.25, progressColor: '#EB5757'},
                {key: 2, name: 'Milk', image:require('../assets/splash.png'), remainingDays: 4,progress: 0.5, progressColor: '#F2994A'},
                {key: 3, name: 'Yoghurt', image:require('../assets/splash.png'), remainingDays: 7,progress: 0.75, progressColor: '#219653'}
            ],
        }
    }
    render() {
        return(
            <View style={itemsStyles.itemsContainer}>  
                <Text style={itemsStyles.itemsHeader}>Items</Text>
                <SafeAreaView style={itemsStyles.itemsBody}>
                    <FlatList  
                        data={this.state.product}
                        renderItem={({item}) => (
                            <View style={itemsStyles.item} key={item.key}>
                                <View style={itemsStyles.itemPicContainer}>
                                    <Image style={itemsStyles.image} source={item.image} /> 
                                </View>
                                <View style={itemsStyles.itemDetailsContainer}>
                                    <View style={itemsStyles.itemDetailsHeaders}>
                                        <Text style={itemsStyles.itemName}>{item.name}</Text>
                                        <TouchableOpacity>
                                            <Text style={itemsStyles.itemDelete}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={itemsStyles.itemDetailsFooter}>
                                        <Text style={itemsStyles.itemDaysLeft}>{item.remainingDays} days left</Text>
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