import React, {Component}from 'react';
import { SearchBar } from 'react-native-elements';
import searchBarStyles from '../styles/searchBarStyles';
import { View } from "react-native";


export default class Searchbar extends Component {
    constructor(props){
        super(props);
    }
    render () {
        return (
            <View style={searchBarStyles.searchBarContainter}>
                <SearchBar
                    containerStyle={searchBarStyles.searchBar}
                    inputContainerStyle={searchBarStyles.searchBarInput}
                    searchIcon={false}
                    placeholder="Search"
                />
            </View>
        );
    }
}
