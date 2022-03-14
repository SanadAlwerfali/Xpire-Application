import { StyleSheet } from "react-native";


export default StyleSheet.create({
    itemsHeader:{
        fontWeight: '500',
        fontSize: 24,
        color: '#000000',
        marginLeft: '5%',
        marginTop: '5%',
        height: '10%'
    },
    itemsBody:{
        flexDirection: 'column',
        height: '90%',
    },
    item:{
        flexDirection: 'row',
        padding: '1%',
        width: '100%',
        height: '75%'
    },
    itemPicContainer:{
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemDetailsContainer:{
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: '1%',
        paddingRight: '1%',
        borderBottomColor: '#F6F6F6',
        borderBottomWidth: 2
    },
    itemDetailsHeaders:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemDetailsFooter:{
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    itemName:{
        fontWeight: '600',
        fontSize: 16,
        color: '#000000'
    },
    itemDaysLeft:{
        fontWeight: '400',
        fontSize: 12,
        color: '#000000'
    },
    itemDelete:{
        fontWeight: 'normal',
        fontSize: 14,
        color: '#EB5757',
    },
    itemStatus:{
        backgroundColor: '#F6F6F6',
        height: '45%',
        borderRadius: 100
    },
    image:{
        width: '10%',
        height: undefined,
        aspectRatio: 1,
        flex: 1,
    },
});