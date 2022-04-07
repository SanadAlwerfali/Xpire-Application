import React, {Component} from "react";
import { View, StyleSheet} from "react-native";
import AddItemsModal from "../components/AddItemsModal";
import db from "../firebase";
import Header from "../components/Header"
import Items from "../components/Items";
import Searchbar from "../components/Searchbar";
import Footer from "../components/Footer";
import bodyStyles from "../styles/bodyStyles";
import { getAuth } from "firebase/auth";
import { MaterialIcons } from '@expo/vector-icons';

export default class Home extends Component {
    //adding a constructor to get props from parent components
    constructor(props){
        super (props);
        //creating states to store data
        this.state = {
            modalVisible: false,
            search: '', //value given to the search bar, empty at the beginning but gets updates as the user types something in the search bar. 
            filteredUserItems: [], //creating two seperate array for the purpose of searching. 
            masterUserItems: [],
            isLoading: true,
        }
    }

    uid = getAuth().currentUser.uid; //getting Unique ID of user to use this to get items of that specific user
    
    //funciton that gets the logged in user's items
    getUserItems = () => {
        //quering the firebase database with the Unique ID of the user.
        db.collection('users')
        .get()
        .then(result => result.docs)
        .then((docs) => {
            docs.forEach((doc) => { //looping through each document until we find the document that has the Unique ID of the logged in user
                if(doc.id == this.uid){
                    this.setState ({ //setting the states with the data of the user
                        filteredUserItems: doc.data()['items'],
                        masterUserItems: doc.data()['items'],
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

    //getting User Items as soon as the component mounts
    componentDidMount () {
        this.getUserItems();
    }

    //function to get passed to add Items Modal to update the main Filterd User Items Array State
    setFilteredItems = (filteredItems) => {
        this.setState({filteredUserItems: filteredItems});
    }

    //function to get passed to add Items Modal to update the main Master User Items Array State
    setMasterItems = (masterItems) => {
        this.setState({masterUserItems: masterItems});
    }
    
    //function to get passed to add Items Modal to update the main Master User Items Array State
    setModalVisible = (isModalVisible) => {
        this.setState({modalVisible: isModalVisible});
    }

    //function to enable search functionality
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
        //check if data has been successfully fetched from database before returning the main View.
        if(this.state.isLoading){
            return (
                <View style={styles.loadingStyle}>
                    <MaterialIcons
                    name='refresh'
                    size={50}
                    onPress={() => this.props.setModalVisible(false)}
                    />
                </View>
            )
        }
        //returning main view once all states have values(i.e all Data has been fetched from the database)
        return(
            <View>
                <Header title="Home" rightHeader="Logout" leftHeader="Profile"/>       
                <View style={bodyStyles.body}>
                    <AddItemsModal setFilteredItems={this.setFilteredItems} setMasterItems={this.setMasterItems} isLoading={this.state.isLoading} searchFilterFunction= {this.searchFilterFunction} modalVisible={this.state.modalVisible} setModalVisible ={this.setModalVisible} filteredUserItems={this.state.filteredUserItems} masterUserItems={this.state.masterUserItems}/>
                    <Searchbar searchFilterFunction= {this.searchFilterFunction} search={this.state.search}/>
                    <Items filteredUserItems={this.state.filteredUserItems} masterUserItems={this.state.masterUserItems} setFilteredItems={this.setFilteredItems} setMasterItems={this.setMasterItems} isLoading={this.state.isLoading}/>          
                </View>
                <Footer location="Home" modalVisible={this.state.modalVisible} setModalVisible ={this.setModalVisible}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingStyle: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    }) 