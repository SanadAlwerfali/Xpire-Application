import React, {Component, useEffect} from "react";

import { View, StyleSheet, Text} from "react-native";
import AddItemsModal from "../components/AddItemsModal";
import * as firebase from "firebase/firestore";
import db from "../firebase";
import auth from "../firebaseAuth";
import { doc } from "firebase/firestore";
import Header from "../components/Header"
import GetItemsComponent from "../components/GetItemsComponent"
import Items from "../components/Items";
import Searchbar from "../components/Searchbar";
import Footer from "../components/Footer";
import bodyStyles from "../styles/bodyStyles";
import { getItems } from "../src/api/ItemsApi";
import { getAuth } from "firebase/auth";

export default class Home extends Component {

    constructor(props){
        super (props);
        this.state = {
            modalVisible: false,
            search: '',
            filteredUserItems: [],
            masterUserItems: [],
            isLoading: true,
        }
    }

    uid = getAuth().currentUser.uid;
    
    updateUserItems = () => {
        db.collection('users')
        .get()
        .then(result => result.docs)
        .then((docs) => {
            docs.forEach((doc) => {
                
                if(doc.id == this.uid){
                    this.setState ({
                        filteredUserItems: doc.data()['items'],
                        masterUserItems: doc.data()['items'],
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
        this.updateUserItems();
    }

    setFilteredItems = (filteredItems) => {
        this.setState({filteredUserItems: filteredItems});
    }

    setMasterItems = (masterItems) => {
        this.setState({masterUserItems: masterItems});
    }
    
    setModalVisible = (isModalVisible) => {
        this.setState({modalVisible: isModalVisible});
    }

    searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = this.state.masterUserItems.filter(function (item) {
            const itemData = item.name
              ? item.name
              : '';
            const textData = text;
            return itemData.indexOf(textData) > -1;
          });
          this.setState({ filteredUserItems : newData });
          this.setState({ search : text });

        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          const masterUserItems = this.state.masterUserItems;
          this.setState({ filteredUserItems: masterUserItems });
          this.setState({ search : text });
        }
      };
    render() {
        if(this.state.isLoading){
            return (
                <View><Text>Loading</Text></View>
            )
        }
        return(
            <View>
                <Header title="Home" rightHeader="Logout" leftHeader="Profile"/>       
                <View style={bodyStyles.body}>
                    <AddItemsModal setFilteredItems={this.setFilteredItems} setMasterItems={this.setMasterItems} isLoading={this.state.isLoading} searchFilterFunction= {this.searchFilterFunction} modalVisible={this.state.modalVisible} setModalVisible ={this.setModalVisible} filteredUserItems={this.state.filteredUserItems} masterUserItems={this.state.masterUserItems}/>
                    <Searchbar searchFilterFunction= {this.searchFilterFunction} search={this.state.search}/>
                    <Items filteredUserItems={this.state.filteredUserItems} masterUserItems={this.state.masterUserItems} setFilteredItems={this.setFilteredItems} setMasterItems={this.setMasterItems} isLoading={this.state.isLoading}/>          
                </View>
                {/* <GetItemsComponent/> */}
                <Footer location="Home" modalVisible={this.state.modalVisible} setModalVisible ={this.setModalVisible}/>
            </View>
        
        );
    }
}