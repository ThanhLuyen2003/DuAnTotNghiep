import React from "react";
import { View, Image, StyleSheet, ImageBackground, Text, TextInput, Pressable } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'



const SignUp = (props) => {

    return (
        <ImageBackground blurRadius={2} style={{ flex: 1 }} source={require('../Images/nenbarber.jpg')}>
            <View style={{ flex: 1 }}>

                <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 20 }}>
                    <View style={{ justifyContent: 'center', width: "100%", alignItems: "center" }}>
                        <Image style={{ width: 200, height: 200, borderRadius: 50 }} source={require('../Images/Barbershop.png')} />
                    </View>
                    <View style={{ margin: 5, marginLeft: 10, alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Tạo tài khoản để được nhiều</Text>
                        <Text style={{ fontSize: 15, color: 'white' }}>ưu đãi hơn từ hôm nay</Text>
                    </View>
                    <View style={{ flexDirection: 'column', margin: 10, padding: 5 }}>
                        <Text style={{ color: "white" }}>Họ và tên</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icons name="account" color="#FFF" size={35} style={{ position: "absolute", left: 10 }} />
                            <TextInput placeholder="Nhập họ và tên" placeholderTextColor='#C2C2C2' style={{ width: "100%", height: 50, paddingLeft: 50, borderWidth: 1, borderColor: "white", borderRadius: 10 }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', margin: 10, padding: 5, bottom: 25 }}>
                        <Text style={{ color: "white" }}>Email</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icons name="email" color="#FFF" size={35} style={{ position: "absolute", left: 10 }} />
                            <TextInput placeholder="Nhập email" placeholderTextColor='#C2C2C2' style={{ width: "100%", height: 50, paddingLeft: 50, borderWidth: 1, borderColor: "white", borderRadius: 10 }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', margin: 10, padding: 5, bottom: 50 }}>
                        <Text style={{ color: "white" }}>Số điện thoại</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icons name="phone" color="#FFF" size={35} style={{ position: "absolute", left: 10 }} />
                            <TextInput placeholder="Nhập số điện thoại" placeholderTextColor='#C2C2C2' style={{ width: "100%", height: 50, paddingLeft: 50, borderWidth: 1, borderColor: "white", borderRadius: 10 }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', margin: 10, padding: 5, bottom: 75 }}>
                        <Text style={{ color: "white" }}>Mật khẩu</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image style={{ width: 35, height: 35, position: "absolute", left: 10 }} source={require('../Images/padlock.png')} />

                            <Icons name="lock" color="#FFF" size={35} style={{ position: "absolute", left: 10 }} />
                            <TextInput placeholder="Nhập mật khẩu" placeholderTextColor='#C2C2C2' style={{ width: "100%", height: 50, paddingLeft: 50, borderWidth: 1, borderColor: "white", borderRadius: 10 }} />
                        </View>
                    </View>
                    <Pressable style={{ justifyContent: "center", bottom: 80 }}>
                        <Text style={style.press}>Đăng kí</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
}
const style = StyleSheet.create({
    press: {
        backgroundColor: "#CD853F",
        color: "#C2C2C2",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        fontSize: 20,
        textAlign: "center",
        shadowColor: "#000",
        elevation: 5
    }
})
export default SignUp;