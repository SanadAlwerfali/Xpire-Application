import React from "react";
import { SearchBar } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { ProgressBar, Colors } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { TouchableHighlight, TouchableOpacity } from "react-native";

export default function Home() {
    return(
        <View >
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.hyperLink}>Profile</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Home</Text>
                <TouchableOpacity>
                    <Text style={styles.hyperLink}>Filter</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={styles.searchBarContainter}>
                    <SearchBar
                        containerStyle={styles.searchBar}
                        inputContainerStyle={styles.searchBarInput}
                        searchIcon={false}
                        placeholder="Search"
                    />
                </View>
                <View style={styles.itemsContainer}>
                    <Text style={styles.itemsHeader}>Items</Text>
                    <ScrollView style={styles.itemsBody}>
                        <View style={styles.item}>
                            <View style={styles.itemsPicContainer}>
                                <Image style={styles.image} source={require('../assets/icon.png')} /> 
                            </View>
                            <View style={styles.itemsDetailsContainer}>
                                <View style={styles.itemDetailsHeaders}>
                                    <Text style={styles.itemName}>Bread</Text>
                                    <TouchableOpacity>
                                        <Text style={styles.itemDelete}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                                <ProgressBar style={styles.itemStatus} progress={0.25} color='#EB5757' />                                
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View style={styles.itemsPicContainer}>
                                <Image style={styles.image} source={require('../assets/splash.png')} /> 
                            </View>
                            <View style={styles.itemsDetailsContainer}>
                                <View style={styles.itemDetailsHeaders}>
                                    <Text style={styles.itemName}>Milk</Text>
                                    <TouchableOpacity>
                                        <Text style={styles.itemDelete}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                                <ProgressBar style={styles.itemStatus} progress={0.5} color='#F2994A'/>                                
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View style={styles.itemsPicContainer}>
                                <Image style={styles.image} source={require('../assets/splash.png')} /> 
                            </View>
                            <View style={styles.itemsDetailsContainer}>
                                <View style={styles.itemDetailsHeaders}>
                                    <Text style={styles.itemName}>Yoghurt</Text>
                                    <TouchableOpacity>
                                        <Text style={styles.itemDelete}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                                <ProgressBar style={styles.itemStatus} progress={0.7} color='#219653'/>                                
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={console.log('buttonWorks')}>
                    <View>
                        <AntDesign name="pluscircleo" stlye={styles.footerPlus} size={50}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: '5%',
    },
    headerText:{
        fontWeight: '600',
        fontSize: 30,
        color: '#000000'
    },
    hyperLink:{
        fontWeight: '500',
        fontSize: 16,
        color: '#219653',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    body:{
        width: '100%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    footer:{
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
    },
    searchBarContainter:{
        width: '100%',
        height: '10%',
    },
    searchBar:{
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'
    },
    searchBarInput:{
        borderRadius: 100,
        backgroundColor: '#F6F6F6'
    },
    itemsContainer:{
        width: '100%',
        height: '90%',
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    itemsHeader:{
        fontWeight: '500',
        fontSize: 24,
        color: '#000000',
        paddingLeft: '5%',
        paddingTop: '5%',
        paddingBottom: '5%',
        height: '10%'
    },
    itemsBody:{
        flexDirection: 'column',
        height: '90%',
        paddingTop: '5%',
        flex: 1,
    },
    item:{
        flexDirection: 'row',
        height: '100%',
        width: '100%',
    },
    itemsPicContainer:{
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemsDetailsContainer:{
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: '1%',
        paddingRight: '1%',
        borderBottomColor: '#F6F6F6',
        borderBottomWidth: 2
    },
    itemDetailsHeaders:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemName:{
        fontWeight: '600',
        fontSize: 16,
        color: '#000000'
    },
    itemDelete:{
        fontWeight: 'normal',
        fontSize: 14,
        color: '#EB5757',
    },
    itemStatus:{
        backgroundColor: '#F6F6F6',
        height: '30%',
        borderRadius: 100
    },
    image:{
        width: '40%',
        height: undefined,
        aspectRatio: 1,
        flex: 1,
    },
  });