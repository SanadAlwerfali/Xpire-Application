import React, {Component}from 'react';
import {View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import footerStyles from '../styles/footerStyles';
import {MaterialIcons } from '@expo/vector-icons';


export default class Footer extends Component {
    constructor(props){
        super(props);
    }
    render () {
        if (this.props.location == "Home"){
            return (
                <View style={footerStyles.footer}>
                    <TouchableOpacity>
                        <View >
                            <MaterialIcons
                            name='add-circle-outline'
                            size={50}
                            onPress={() => this.props.setModalVisible(true)}
                            />
                        </View>
                    </TouchableOpacity>        
                </View>
            );
        }
        else if (this.props.location == "Profile"){
            return(
                <View style={footerStyles.footer}>
                    <TouchableOpacity>
                        <View style={styles.mainBody}>
                        <TouchableOpacity style={styles.buttons} onPress = {() => this.confirmAccountDeletion(this.uid)}>
                                <Text style={styles.buttonText}>Delete Account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons} onPress = {() => this.confirmItemsDeletion(this.uid)}>
                                <Text style={styles.buttonText}>Delete All Items</Text>
                        </TouchableOpacity>
                        </View>
                    </TouchableOpacity>        
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    userPicStyles: {
        borderColor: 'white',
        // backgroundColor: 'black',
        // alignItems: 'center',
        // justifyContent: 'flex-start'
        marginTop: '-30%',
    },
    picStyles:{
        borderColor: 'white',
        borderWidth: 2
    },
    profileMainBody:{
        backgroundColor: 'red'
    },
    displayNameStyle:{
        fontWeight: '500',
        fontSize: 24,
        color: '#000000',
        marginTop: '3%'
    },
    body:{
        width: '100%',
        height: '55%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // marginTop: -16,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    mainBody:{
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    buttons:{
        marginTop: '7%',
        marginHorizontal: '5%',
        backgroundColor: '#EB5757',
        justifyContent: 'center',
        width: '40%',
        height: '50%',
        borderRadius: 100
    },
    buttonText:{
        color: '#FFFFFF',
        alignSelf: 'center'
    }
})