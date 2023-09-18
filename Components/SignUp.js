import React from "react";
import { View, Image, StyleSheet,ImageBackground,Text, TextInput } from "react-native";

const SignUp = (props) => {
   
    return (
        <ImageBackground blurRadius={1} style={{ flex: 1 }} source={require('../Images/nenbarber.jpg')}>
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'rgba(46,134,193,0.2' }}>
            </View>
            <View style={{ backgroundColor: "#99FF99", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <View style={{ position: "absolute", justifyContent: 'center', width: "100%", alignItems: "center" }}>
                    <Image style={{ width: 250, height: 250, borderRadius: 50, marginTop: 30 }} source={require('../Images/Barbershop.png')} />               
                </View>
            </View>
        </View>
       <View style={{flex:1,alignItems:"center"}}>
            <Text style={{fontSize:20,color:"white" }}>Tạo tài khoản để nhận nhiều </Text>
            <Text style={{fontSize:15,color:"white" }}>ưu đãi hơn ngay từ ngày hôm nay</Text>
            
            <View style={{}}>
              <TextInput style={{}}/>  
            </View>
            
       </View>
    </ImageBackground>
    );
}

export default SignUp;