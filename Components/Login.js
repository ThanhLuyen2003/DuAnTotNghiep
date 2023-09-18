import React from "react";
import { View, Image, StyleSheet, Button, ImageBackground, Text } from "react-native";

const Login = (props) => {
    const hi = () => {
        props.navigation.navigate('HomeTab');
    }
    return (
        <ImageBackground blurRadius={1} style={{ flex: 1 }} source={require('../Images/nenbarber.jpg')}>
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'rgba(46,134,193,0.2' }}>
                </View>
                <View style={{ backgroundColor: "#99FF99", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ position: "absolute", justifyContent: 'center', width: "100%", alignItems: "center" }}>
                        <Image style={{ width: 250, height: 250, borderRadius: 50, marginTop: 30 }} source={require('../Images/Barbershop.png')} />

                        <Button title="hi" onPress={hi} />

                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}
const style = StyleSheet.create({

})
export default Login;