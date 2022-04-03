import React, {useState, Component} from "react";
import { View, Modal, StyleSheet, Text, Textinput, TouchableOpacity, Button, Image } from 'react-native';
import { Formik } from "formik";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';
import { addItem, getItems } from "../src/api/ItemsApi";
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class AddItemsModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            image: "",
            date: "",
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
            this.setState({ image : result.uri});
        }
        console.log("value of Image is: " + this.state.image);

    }
    deleteImage = () => {
        this.setState({image: ""});
    }
    deleteDate = () => {
        this.setState({date: ""});
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
        console.log(result);

        if (!result.cancelled) {
        setPickedImagePath(result.uri);
        console.log(result.uri);
        }
    }

    hideDatePicker = () => {
        this.setState({
            datePickerModalVisible: false
        });
      };
    
    handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        this.setState ({
            date: date
        });
        this.hideDatePicker();
    };
    
    toggleDateView = () => {
        console.log("date is" + this.state.date);
        this.setState ({
            datePickerModalVisible: true
        });
        console.log("datePickerModalVisible is" + this.state.datePickerModalVisible);
    } 
    render () {
        let requestImgView;
        let dateView;
        if (this.state.image == "") {
            requestImgView = <View style={styles.imagePickerButtons}>
                        <TouchableOpacity style={styles.buttons} onPress={this.pickImageFromGallery}>
                            <Text style={styles.buttonText}>Gallery</Text>  
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons} onPress={this.pickImageFromCamera}>
                            <Text style={styles.buttonText}>Camera Roll</Text>  
                        </TouchableOpacity>
                    </View>
          } else {
            requestImgView = <View style={styles.imagePickerButtons}>
                            <Image style={styles.image} source={{uri: this.state.image}} />
                            <TouchableOpacity style={styles.buttons} onPress={this.pickImageFromGallery}>
                                <Text style={styles.buttonText}>Replace Image</Text>  
                            </TouchableOpacity> 
                            <TouchableOpacity style={styles.buttons} onPress={this.deleteImage}>
                                <Text style={styles.buttonText}>Delete Image</Text>  
                            </TouchableOpacity> 
                         </View>
          }
          if (this.state.date == "") {

            dateView =  <View style={styles.imagePickerButtons}>
                            <TouchableOpacity style={styles.buttons} onPress={this.toggleDateView}>
                                <Text style={styles.buttonText}>Select Date</Text>  
                            </TouchableOpacity>
                        </View>
          } else {
            dateView = <View style={styles.imagePickerButtons}>
                            <Text > Value:{this.state.date.toString()}</Text>
                            <TouchableOpacity style={styles.buttons} onPress={this.toggleDateView}>
                                <Text style={styles.buttonText}>Replace Date</Text>  
                            </TouchableOpacity> 
                            <TouchableOpacity style={styles.buttons} onPress={this.deleteDate}>
                                <Text style={styles.buttonText}>Delete Date</Text>  
                            </TouchableOpacity> 
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
                            <Formik
                                initialValues={{name: '', image:'', remainingDays: ''}}
                                onSubmit={(values) => 
                                    addItem({
                                        name: values.name,
                                        expiryDate: values.expiryDate
                                    })
                                }
                            >
                            {(formikProps) => (
                                <View>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Product Name"
                                        selectionColor="#F2994A"
                                        onChangeText={formikProps.handleChange('name')}
                                        value={formikProps.values.name}
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
                                    
                                    <TouchableOpacity style={styles.buttons} onPress={formikProps.handleSubmit}>
                                        <Text style={styles.buttonText}>Submit</Text>  
                                    </TouchableOpacity>
                                </View>  
                            )}

                            </Formik>
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
    }
}); 
