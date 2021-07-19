import React from "react";
import {StyleSheet, Text, View} from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";


const NavBar = () => {
    return (
        <View style={styles.container}>
            <Link style={styles.linkStyle} to="/"><Text style={styles.text}>Todo</Text></Link>
            <Link style={styles.linkStyle} to="/temperature"><Text style={styles.text}>Temperature</Text></Link>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
        paddingTop: 25,
        justifyContent: "space-around",
        backgroundColor: "black"
    },
    linkStyle: {
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 6,
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        paddingTop: 2,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 2,
        marginBottom: 4
},

    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    }
});

export default NavBar