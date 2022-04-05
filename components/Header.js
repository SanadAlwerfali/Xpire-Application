import React, {Component}from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import hyperlinkStyles from '../styles/hyperlinkStyles';
import headerStyles from '../styles/headerStyles';

export default class Header extends Component {
    constructor(props){
        super(props);
    }
    render () {
        return (
        <View style={headerStyles.header}>
            <TouchableOpacity>
                <Text style={hyperlinkStyles.hyperLink}>{this.props.leftHeader}</Text>
            </TouchableOpacity>
            <Text style={headerStyles.headerText}>{this.props.title}</Text>
            <TouchableOpacity>
                <Text style={hyperlinkStyles.hyperLink}>{this.props.rightHeader}</Text>
            </TouchableOpacity>
        </View> 
        );
    }
}
