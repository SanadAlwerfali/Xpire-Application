import React, {useState} from "react";
import { SearchBar } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, Image, Alert} from "react-native";
import { ProgressBar, Colors } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableHighlight, TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native";
import AddItemsModal from "../components/AddItemsModal";

export default function Home() {
    const [openModal, setOpenModal] = useState(false);
    const [product, setProduct] = useState([
        {key: 1, name: 'Bread', image:require('../assets/icon.png'), remainingDays: 2, progress: 0.25, progressColor: '#EB5757'},
        {key: 2, name: 'Milk', image:require('../assets/splash.png'), remainingDays: 4,progress: 0.5, progressColor: '#F2994A'},
        {key: 3, name: 'Yoghurt', image:require('../assets/splash.png'), remainingDays: 7,progress: 0.75, progressColor: '#219653'}
    ]);
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
                <AddItemsModal openModal={openModal} setOpenModal={setOpenModal}/>
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
                    <SafeAreaView style={styles.itemsBody}>
                        <FlatList  
                            data={product}
                            renderItem={({item}) => (
                                <View style={styles.item} key={item.key}>
                                    <View style={styles.itemPicContainer}>
                                        <Image style={styles.image} source={item.image} /> 
                                    </View>
                                    <View style={styles.itemDetailsContainer}>
                                        <View style={styles.itemDetailsHeaders}>
                                            <Text style={styles.itemName}>{item.name}</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.itemDelete}>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.itemDetailsFooter}>
                                            <Text style={styles.itemDaysLeft}>{item.remainingDays} days left</Text>
                                            <ProgressBar style={styles.itemStatus} progress={item.progress} color={item.progressColor} />                                
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    </SafeAreaView>
                </View>
            </View>
            
            <View style={styles.footer}>
                <TouchableOpacity stlye={styles.footerPlus}>
                    <View>
                        <MaterialIcons
                        name='add-circle-outline'
                        size={50}
                        onPress={() => setOpenModal(true)}
                        />
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
        marginTop: '5%',
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
        justifyContent: 'flex-start',
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
    // itemsContainer:{
    //     width: '100%',
    //     height: '100%',
    //     backgroundColor: 'white',
    //     flexDirection: 'column',
    // },
    itemsHeader:{
        fontWeight: '500',
        fontSize: 24,
        color: '#000000',
        marginLeft: '5%',
        marginTop: '5%',
        height: '10%'
    },
    itemsBody:{
        flexDirection: 'column',
        height: '90%',
    },
    item:{
        flexDirection: 'row',
        padding: '1%',
        width: '100%',
        height: '75%'
    },
    itemPicContainer:{
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemDetailsContainer:{
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
        justifyContent: 'space-between',
    },
    itemDetailsFooter:{
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    itemName:{
        fontWeight: '600',
        fontSize: 16,
        color: '#000000'
    },
    itemDaysLeft:{
        fontWeight: '400',
        fontSize: 12,
        color: '#000000'
    },
    itemDelete:{
        fontWeight: 'normal',
        fontSize: 14,
        color: '#EB5757',
    },
    itemStatus:{
        backgroundColor: '#F6F6F6',
        height: '45%',
        borderRadius: 100
    },
    image:{
        width: '10%',
        height: undefined,
        aspectRatio: 1,
        flex: 1,
    },
  });