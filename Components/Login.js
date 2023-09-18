import React from "react";
import { View, Image, StyleSheet, Button } from "react-native";

const Login = (props) => {

    const hi = () => {

        props.navigation.navigate('HomeTab');

    }

    return (
        <View>

            <Button onPress={hi} title="Hi" />

        </View>
    );
}

export default Login;