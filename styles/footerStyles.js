import { StyleSheet } from "react-native";


export default StyleSheet.create({
    footer:{
        height: '17%',
        alignItems: 'center',
        flexDirection: 'column',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        width: '100%',
        backgroundColor: '#FFFFFF',
    },
    footerTop:{
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems:'center',
    },
    footerBottom:{
        width: '100%',
        height: '70%',
        justifyContent: 'space-evenly',
        paddingTop: '5%',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    footerText:{
        paddingTop: '3%',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 24,
        color: '#000000',
    }
});
