import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import {Route} from "react-router-native";
import Todo from "./Todo";
import Temp from "./Temp";

const Main: React.FC = ():JSX.Element => {
    return (
        <ScrollView style={styles.container}>
            <Route exact path="/" component={Todo}/>
            <Route path="/temperature" component={Temp}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        width: 360,
        height: 600
    },
});



export default Main