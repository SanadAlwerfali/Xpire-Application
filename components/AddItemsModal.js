import React, {Component} from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from 'firebase/compat/app';
import db from "../firebase";
import { getAuth } from "firebase/auth";

export default class AddItemsModal extends Component{

    //adding a constructor to get props from parent components
    constructor(props){
        super(props);
        this.state = {
            itemName: "", //states to hold data about item being added
            itemImage: "",
            itemexpiryDate: "",
            displayDate: "",
            datePickerModalVisible: false, //state to make sure date picker modal is not displayed unless requested
        }
    }

    //function that allows functionality of adding items from user's gallery
    pickImageFromGallery = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        // Save Image to state
        if (!result.cancelled) {
            this.setState({ itemImage : result.uri});
            return result.uri;
        }
    }

    //function that allows functionality of adding items from user's gallery
    pickImageFromCamera = async () => {

        // Permissions request is necessary for launching the user's camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Save Image to state
        if (!result.cancelled) {
            this.setState({ itemImage : result.uri});
        }
    }

    //function to delete added image by unsetting the state
    deleteImage = () => {
        this.setState({itemImage: ""});
    }

    //function to delete added date by unsetting the state
    deleteDate = () => {
        this.setState({displayDate: "", itemexpiryDate: ""});
    }
    
    //function to hide the date time picker once the user selects a date
    hideDatePicker = () => {
        this.setState({
            datePickerModalVisible: false
        });
      };
    
    //function to handle the confirm of the date picker by saving the date to the state
    handleConfirm = (date) => {
        const dateTimeStamp = firebase.firestore.Timestamp.fromDate(date);
        this.setState ({
            itemexpiryDate: dateTimeStamp,
            displayDate: date
        });
        this.hideDatePicker(); //hiding date time picker once the user selects a date
    };

    //fuction to parse the selected date in order to show the user the date they selected
    getParsedDate(strDate){
        var date = "";
        var dd = strDate.getDate();
        var mm = strDate.getMonth() + 1; 
        var yyyy = strDate.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date =  dd + "-" + mm + "-" + yyyy;
        return date.toString();
    }
    
    //function to show date view once the user wants to enter a date
    toggleDateView = () => {
        this.setState ({
            datePickerModalVisible: true
        });
    } 
    uid = getAuth().currentUser.uid; //getting Unique ID of user to use this to add items to the user's document in Firebase

    //function that takes in all the data that the user inputted and adds it to the database
    addItemsToDb = (itemData) => {
        db.collection('users')
        .doc(this.uid)
        .update({
            items: firebase.firestore.FieldValue.arrayUnion({
                expiryDate: itemData.expiryDate,
                image: itemData.image,
                name: itemData.name
            }),
        })
        this.props.setFilteredItems([...this.props.filteredUserItems, itemData]);
        this.props.setMasterItems([...this.props.masterUserItems, itemData]);
        
    }
    
    //function that handles the submit of the form by setting the user given values to the states
    handleSubmit = () => {
        if (this.state.itemImage!="" && this.state.itemexpiryDate!="" && this.state.itemName!=""){
            this.addItemsToDb({
                expiryDate: this.state.itemexpiryDate,
                image: this.state.itemImage,
                name: this.state.itemName
            })
            this.props.setModalVisible(false);
            this.setState({
                itemName: "",
                itemImage: "",
                itemexpiryDate: ""
            })
        }
        else{
            console.warn('missing data');
        }
    }

    render () {
        let requestImgView;
        let dateView;
        //checking if image has been added or not
        if (this.state.itemImage == "") { //if image has not been added, prompt user with buttons to add image
            requestImgView = <View style={styles.imagePickerContainer}>
                        <Text style={styles.modalSubHeaders}>Add Picture</Text>
                        <View style={styles.imagePickerButtons}>
                            <TouchableOpacity  onPress={this.pickImageFromGallery}>
                                <Text style={styles.selectorButtons} onPress={this.pickImageFromGallery}>Gallery</Text>  
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.pickImageFromCamera}>
                                <Text style={styles.selectorButtons}>Camera Roll</Text>  
                            </TouchableOpacity>
                        </View>
                    </View>
          } else { //if image has been added, prompt user with buttons to delete or replace image
            requestImgView = <View style={styles.imagePickerContainer}>
                                <Text style={styles.modalSubHeaders}>Add Picture</Text>    
                                <View style={styles.imagePickerButtons}>
                                    <Image style={styles.image} source={{uri: this.state.itemImage}} />
                                    <TouchableOpacity onPress={this.pickImageFromGallery}>
                                        <Text style={styles.selectorButtons}>Replace Image</Text>  
                                    </TouchableOpacity> 
                                    <TouchableOpacity onPress={this.deleteImage}>
                                        <Text style={styles.deleteButtons}>Delete Image</Text>  
                                    </TouchableOpacity> 
                                </View>
                            </View>
          }

          //checking if date has been added or not
          if (this.state.itemexpiryDate == "") {//if date has not been added, prompt user with buttons to add date
            dateView =  <View style={styles.imagePickerContainer}>
                            <Text style={styles.modalSubHeaders}>Add Date</Text>
                            <View style={styles.imagePickerButtons}>
                                <TouchableOpacity onPress={this.toggleDateView}>
                                    <Text style={styles.selectorButtons}>Select Date</Text>  
                                </TouchableOpacity>
                            </View>
                        </View>
          } else { //if date has been added, prompt user with buttons to delete or replace date
            dateView = <View style={styles.imagePickerContainer}>
                            <Text style={styles.modalSubHeaders}>Add Date</Text>
                            <View style={styles.imagePickerButtons}>
                                <Text style={styles.displayDateString}> {this.getParsedDate(this.state.displayDate)}</Text>
                                <TouchableOpacity onPress={this.toggleDateView}>
                                    <Text style={styles.selectorButtons}>Replace Date</Text>  
                                </TouchableOpacity> 
                                <TouchableOpacity onPress={this.deleteDate}>
                                    <Text style={styles.deleteButtons}>Delete Date</Text>  
                                </TouchableOpacity> 
                            </View>
                        </View>
          }
          
        return (
            <View style={styles.modal}>
                <Modal visible={this.props.modalVisible} transparent={true}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <View></View>
                            <Text style={styles.modalHeaderText}>Add Item</Text>
                            <TouchableOpacity style={styles.closeIcon}>
                                <View>
                                    <MaterialIcons
                                    name='close'
                                    size={25}
                                    onPress={() => this.props.setModalVisible(false)}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalInputs}>
                            <TextInput
                                style={styles.inputs}
                                placeholder="Product Name"
                                selectionColor="#F2994A"
                                onChangeText={(text)=> {this.setState({ itemName: text})}}
                            />
                            {requestImgView}
                            {dateView}
                            <DateTimePickerModal
                                isVisible={this.state.datePickerModalVisible}
                                mode="date"
                                display='inline'
                                onConfirm={this.handleConfirm}
                                onCancel={this.hideDatePicker}
                                isDarkModeEnabled={true}
                            />
                            <TouchableOpacity style={styles.buttons} onPress={this.handleSubmit} >
                                <Text style={styles.buttonText}>Submit</Text>  
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView:{
        flex: 1,
        marginVertical: '65%',
        marginTop: '65%',
        marginHorizontal: '10%',
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '15%',
        marginBottom: 10
    },
    modalBody:{
        backgroundColor: '#FAA0A0',
        marginVertical: 25,
        marginHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },  
    modalHeaderText:{
        fontWeight: '500',
        fontSize: 24,
        color: '#000000',
        alignSelf: 'center',
        paddingLeft: '5%',
    },
    modalFotter:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    closeIcon:{
        paddingRight: '3%',
    },
    modalInputs:{
        height: '85%',
        width: '100%',  
    },
    inputs:{
        height: 40,
        margin: '5%',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#F6F6F6'
    },
    buttons: {
        width: '35%',
        //height: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2994A',
        borderRadius: 100,
        alignSelf: 'center',
        marginHorizontal: 5
    },
    buttonCancel: {
        width: '35%',
        height: '75%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2994A',
        borderRadius: 100,
        alignSelf: 'flex-end',
        backgroundColor: 'grey',
        marginHorizontal: 5
    },
    buttonDelete: {
        width: '35%',
        height: '85%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2994A',
        borderRadius: 100,
        alignSelf: 'flex-end',
        backgroundColor: 'red',
        marginHorizontal: 5
    },
    buttonText: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    modalSubHeaders: {
        alignSelf: 'center',
        marginBottom: '5%',
        fontWeight: '500',
        fontSize: 19,
        color: '#000000',
    },
    imagePickerContainer: {
        height: '30%'
    },
    imagePickerButtons: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        width: '100%',
        height: '25%',    
    },
    image : {
        width: '40%',
        height: '1%',
        aspectRatio: 1,
        flex: 1,
        alignSelf: 'center'
    },
    datePickerButtons: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        width: '100%',
        height: '25%',
    },
    selectorButtons:{
        fontWeight: '500',
        fontSize: 16,
        color: '#0000EE',
        paddingHorizontal: '3%',
        alignSelf: 'center'
    },
    deleteButtons:{
        fontWeight: '500',
        fontSize: 16,
        color: '#EB5757',
        paddingHorizontal: '3%',
        alignSelf: 'center'
    },
    displayDateString:{
        marginLeft: '3%',
    }
}); 
