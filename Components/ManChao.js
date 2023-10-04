import React from "react";
import { View, Image, StyleSheet, ImageBackground, Text } from "react-native";
import { useFonts } from 'expo-font';

const ManChao = (props) => {
    const [loaded] = useFonts({
        "DancingScript-Bold": require('../assets/fonts/DancingScript-Bold.ttf'),
    });
    if (!loaded) {
        return undefined;
    }
    setTimeout(() => {
        props.navigation.navigate('GioiThieu')
    }, 1000);


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