import React from "react";
import { View, Image, StyleSheet } from "react-native";

const ManChao = (props) => {


    React.useEffect(() => {

        setTimeout(() => {
            props.navigation.navigate('Login');
        }, 2000);
    });

    return (
        <View>

            <Image source={require('../Images/homee.png')} style={{ width: "100%", height: 300, marginTop: 300 }} />

        </View>
    )


}

export default ManChao;