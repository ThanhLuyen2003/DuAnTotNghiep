import React from "react";
import { View, Image, StyleSheet, Button, ImageBackground } from "react-native";

const Login = (props) => { 
    const hi = () => {
        props.navigation.navigate('HomeTab');
    }

    return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            {/* <Image source={require('../Images/Barbershop.png')}/> */}
            {/* <Button onPress={hi} title="Hi" /> */}
            <ImageBackground  blurRadius={2}  source={require('../Images/bannerLog.png')}>
            <View style={{flex:1}}>
            <Image style={{width:300,height:300,borderRadius:50}} source={require('../Images/Barbershop.png')}/>
            </View>
            </ImageBackground>

        </View>
    );
}
const style=StyleSheet.create({

})
export default Login;