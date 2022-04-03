import React, {Component}from 'react';
import {View, TouchableOpacity } from 'react-native';
import footerStyles from '../styles/footerStyles';
import {MaterialIcons } from '@expo/vector-icons';


export default class Footer extends Component {
    constructor(props){
        super(props);
    }
    render () {
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
}