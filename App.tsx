import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import NavBar from "./components/NavBar";
import Main from "./components/Main";



class App extends React.Component<any, any>{
    render() {
        return (
            <NativeRouter>
            <View>
                <NavBar />
               <Main />
            </View>
            </NativeRouter>
        );
    }
}




export default App