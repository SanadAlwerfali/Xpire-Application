import React, {Component}from 'react';
import {View, TouchableOpacity } from 'react-native';
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
                        <View>
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
        else if (this.props.location == "Welcome"){
            return(
                <View style={styles.footer}>
                    <View style={styles.footerTop}>
                        <Text style={styles.footerText}>Welcome</Text>
                    </View>
                    <View style={styles.footerBottom}>
                        <TouchableOpacity style={styles.buttons}>
                            <Text style={styles.buttonText}>Sign Up</Text>  
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons}>
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                    </View> 
                </View> 
            );
        }
    }
}