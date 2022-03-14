import React, {Component} from "react";

import { View, StyleSheet} from "react-native";
import AddItemsModal from "../components/AddItemsModal";

import db from "../firebase";
import { doc } from "firebase/firestore";
import Header from "../components/Header"
import Items from "../components/Items";
import Searchbar from "../components/Searchbar";
import Footer from "../components/Footer";
import bodyStyles from "../styles/bodyStyles";

export default class Home extends Component {

    // const [users, setUsers] = useState();

    // useEffect( () => {
    //     db.collection('users')
    //     .get()
    //     .then(result => result.docs)
    //     .then(docs => docs.map(doc => ({
    //         id: doc.id, 
    //         items: doc.data().items,
    //         name: doc.data().name  
    //     })))
    //     .then (users => setUsers(users))
    // }, [])
    // console.log("users value is " + JSON.stringify(users));
    // const [openModal, setOpenModal] = useState(false);
    // const [product, setProduct] = useState([
    //     {key: 1, name: 'Bread', image:require('../assets/icon.png'), remainingDays: 2, progress: 0.25, progressColor: '#EB5757'},
    //     {key: 2, name: 'Milk', image:require('../assets/splash.png'), remainingDays: 4,progress: 0.5, progressColor: '#F2994A'},
    //     {key: 3, name: 'Yoghurt', image:require('../assets/splash.png'), remainingDays: 7,progress: 0.75, progressColor: '#219653'}
    // ]);
    constructor(props){
        super (props);
        this.state = {
            openModal: false,
            product: [
                    {key: 1, name: 'Bread', image:require('../assets/icon.png'), remainingDays: 2, progress: 0.25, progressColor: '#EB5757'},
                    {key: 2, name: 'Milk', image:require('../assets/splash.png'), remainingDays: 4,progress: 0.5, progressColor: '#F2994A'},
                    {key: 3, name: 'Yoghurt', image:require('../assets/splash.png'), remainingDays: 7,progress: 0.75, progressColor: '#219653'}
                ],
        }
    }
    render() {
        return(
            <View >
                <Header title="Home" rightHeader="Filter" leftHeader="Profile"/>       
                <View style={bodyStyles.body}>
                    <AddItemsModal openModal="false"/>
                    <Searchbar />
                    <Items />
                </View>
                
                <Footer/>
            </View>
        
        );
    }
}