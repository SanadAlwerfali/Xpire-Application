import React from "react";
import { View, Text, StyleSheet } from "react-native";


export default function Home() {
    return(
        <View >
            <View style={styles.header}>
                <Text>Home Page</Text>
            </View>
            <View style={styles.body}>
                <Text>Body</Text>
            </View>
            <View style={styles.footer}>
                <Text>Footer</Text>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'grey',
    },
    body:{
        width: '100%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    footer:{
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
    },
  });