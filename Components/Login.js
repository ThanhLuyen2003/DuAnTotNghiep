import React from "react";
import { View, Image, StyleSheet, Button, ImageBackground } from "react-native";

const Login = (props) => { 
    const hi = () => {
        props.navigation.navigate('HomeTab');
    }

    return (
        <View>
            {/* <Image source={require('../Images/Barbershop.png')}/> */}
            {/* <Button onPress={hi} title="Hi" /> */}
            <ImageBackground  blurRadius={2} style={{flex:1,height:690}} source={require('../Images/image.png')}>

            </ImageBackground>

        </View>
    );
}
const style=StyleSheet.create({

})
export default Login;