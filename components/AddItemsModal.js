import React, {useState, Component} from "react";
import { View, Modal, StyleSheet, Text, Textinput, TouchableOpacity  } from 'react-native';
import { Formik } from "formik";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';
import { addItem, getItems } from "../src/api/ItemsApi";

export default class AddItemsModal extends Component{
    render () {
        return (
            <View style={styles.modal}>
                <Modal visible={this.props.openModal} transparent={true}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <View></View>
                            <Text style={styles.modalHeaderText}>Add Item</Text>
                            <TouchableOpacity style={styles.closeIcon}>
                                <View>
                                    <MaterialIcons
                                    name='close'
                                    size={25}
                                    onPress={() => { props.setOpenModal(false)}}
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
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Product Image"
                                        onChangeText={formikProps.handleChange('image')}
                                        value={formikProps.values.image}
                                    />
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Product Expiry Date"
                                        onChangeText={formikProps.handleChange('remainingDays')}
                                        value={formikProps.values.remainingDays}
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
        height: '10%',
    },  
    modalHeaderText:{
        fontWeight: '500',
        fontSize: 24,
        color: '#000000',
        alignSelf: 'center',
        paddingLeft: '5%',
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
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2994A',
        borderRadius: 100,
        alignSelf: 'center'
    },
    buttonText: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
    },
}); 