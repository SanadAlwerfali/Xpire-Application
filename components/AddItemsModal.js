import React, {useState, Component} from "react";
import { View, Modal, StyleSheet, Text, Textinput, TouchableOpacity, Button, Image } from 'react-native';
import { Formik } from "formik";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';
import { addItem, getItems } from "../src/api/ItemsApi";
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from 'firebase/compat/app';
import db from "../firebase";
import auth from "../firebaseAuth";
import { getAuth } from "firebase/auth";

export default class AddItemsModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            itemName: "",
            itemImage: "",
            itemexpiryDate: "",
            displayDate: "",
            datePickerModalVisible: false,
        }
    }

    pickImageFromGallery = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled) {
            this.setState({ itemImage : result.uri});
            return result.uri;
        }
    }

    pickImageFromCamera = async () => {
        // No permissions request is necessary for launching the image library
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result

        if (!result.cancelled) {
            this.setState({ itemImage : result.uri});
        }
    }

    deleteImage = () => {
        this.setState({itemImage: ""});
    }
    deleteDate = () => {
        this.setState({displayDate: "", itemexpiryDate: ""});
    }
    
    hideDatePicker = () => {
        this.setState({
            datePickerModalVisible: false
        });
      };
    
    handleConfirm = (date) => {
        const dateTimeStamp = firebase.firestore.Timestamp.fromDate(date);
        this.setState ({
            itemexpiryDate: dateTimeStamp,
            displayDate: date
        });
        this.hideDatePicker();
    };

    getParsedDate(strDate){
        var date = "";
        // alert(date);
        var dd = strDate.getDate();
        var mm = strDate.getMonth() + 1; //January is 0!
    
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
    
    toggleDateView = () => {
        this.setState ({
            datePickerModalVisible: true
        });
    } 
    uid = getAuth().currentUser.uid;

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
        if (this.state.itemImage == "") {
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
          } else {
            requestImgView = <View style={styles.imagePickerContainer}>
                                <Text style={styles.modalSubHeaders}>Add Picture</Text>    
                                <View style={styles.imagePickerButtons}>
                                    <Image style={styles.image} source={{uri: this.state.itemImage}} />
                                    <TouchableOpacity onPress={this.pickImageFromGallery}>
                                        <Text style={styles.selectorButtons}>Replace Image</Text>  
                                    </TouchableOpacity> 
                                    <TouchableOpacity onPress={this.deleteImage}>
                                        <Text style={styles.selectorButtons}>Delete Image</Text>  
                                    </TouchableOpacity> 
                                </View>
                            </View>
          }
          if (this.state.itemexpiryDate == "") {

            dateView =  <View style={styles.imagePickerContainer}>
                            <Text style={styles.modalSubHeaders}>Add Date</Text>
                            <View style={styles.imagePickerButtons}>
                                <TouchableOpacity onPress={this.toggleDateView}>
                                    <Text style={styles.selectorButtons}>Select Date</Text>  
                                </TouchableOpacity>
                            </View>
                        </View>
          } else {
            dateView = <View style={styles.imagePickerContainer}>
                            <Text style={styles.modalSubHeaders}>Add Date</Text>
                            <View style={styles.imagePickerButtons}>
                                <Text style={styles.displayDateString}> {this.getParsedDate(this.state.displayDate)}</Text>
                                <TouchableOpacity onPress={this.toggleDateView}>
                                    <Text style={styles.selectorButtons}>Replace Date</Text>  
                                </TouchableOpacity> 
                                <TouchableOpacity onPress={this.deleteDate}>
                                    <Text style={styles.selectorButtons}>Delete Date</Text>  
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
    displayDateString:{
        marginLeft: '3%',
    }
}); 
