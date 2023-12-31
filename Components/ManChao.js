import React from "react";
import { View, Image, StyleSheet, ImageBackground, Text } from "react-native";
import { useFonts } from 'expo-font';
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ip from "../IP";
import { firebase } from "../Firebase";


const ManChao = (props) => {


    setTimeout(async () => {

        const value = await AsyncStorage.getItem('loginInfo');
        const userData = JSON.parse(value);

        if (value == null) {
            props.navigation.navigate('GioiThieu')

        } else {
            console.log(userData._id);
            props.navigation.navigate('HomeTab', { id: userData._id })

        }

    }, 1000);

    const [loaded] = useFonts({
        "DancingScript-Bold": require('../assets/fonts/DancingScript-Bold.ttf'),
    });
    if (!loaded) {
        return undefined;
    }



    return (
        <ImageBackground blurRadius={5} style={style.container} source={require('../Images/nenbarber.jpg')}>
            <Image blurRadius={0.5} source={require('../Images/Barbershop.png')} style={{ marginTop: 100 }} />
            <Text style={style.txt}>Welcome to our Barber service shop</Text>
        </ImageBackground>
    )


}
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    txt: {
        fontFamily: "DancingScript-Bold",
        fontSize: 35,
        margin: 5,
        padding: 5,
        textAlign: "center",
        color: "white"
    }
})
export default ManChao;