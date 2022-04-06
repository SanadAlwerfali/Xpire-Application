import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import hyperlinkStyles from '../styles/hyperlinkStyles';
import headerStyles from '../styles/headerStyles';
import auth from "../firebaseAuth";
import { useNavigation } from '@react-navigation/core'


export default function Header(props) {
    
    
    const navigate = useNavigation(); //creating a navigate variable that will be used for the logout to to navigate the user to a different screen.

    //logs out the user
    const logout = () => {
        auth.signOut().then(()=>{
            alert("You have been successfully logged out!")
            navigate.navigate('Welcome');
         }).catch(() => {
             alert("OhOh! something went wrong!")
         })
    }

    //return headers with different texts based on which screen is rendering them
    if (props.title == "Home"){ 
        return (
            <View style={headerStyles.header}>
                <TouchableOpacity onPress={() => navigate.navigate(props.leftHeader)}>
                    <Text style={hyperlinkStyles.hyperLink}>{props.leftHeader}</Text>
                </TouchableOpacity>
                <Text style={headerStyles.headerText}>{props.title}</Text>
                <TouchableOpacity onPress = {() => logout()}>
                    <Text style={hyperlinkStyles.hyperLink}>{props.rightHeader}</Text>
                </TouchableOpacity>
            </View> 
            );
    }

    else if (props.title == "Profile"){
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigate.navigate(props.leftHeader)}>
                    <Text style={hyperlinkStyles.hyperLink}>{props.leftHeader}</Text>
                </TouchableOpacity>
                <Text style={headerStyles.headerText}>{props.title}</Text>
                <TouchableOpacity onPress = {() => logout()}>
                    <Text style={hyperlinkStyles.hyperLink}>{props.rightHeader}</Text>
                </TouchableOpacity>
            </View> 
            );
    }

        
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '30%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: '15%',
        backgroundColor: '#EB5757'
    },
    
    
    })
