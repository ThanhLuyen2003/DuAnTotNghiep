import React from "react";
import { View, Image, StyleSheet,ImageBackground } from "react-native";


const ManChao = (props) => {


    // React.useEffect(() => {

    //     setTimeout(() => {
    //         props.navigation.navigate('Login');
    //     }, 2000);
    // });

    return (
        <ImageBackground blurRadius={1} style={{ flex: 1 }} source={require('../Images/nenbarber.jpg')}>
            <Image  source={require('../Images/Barbershop.png')}  />
        </ImageBackground>

            
            
        
    )


}

export default ManChao;