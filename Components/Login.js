import React from "react";
import { View, Image, StyleSheet, Text, ImageBackground, Button, TextInput, TouchableHighlight, TouchableOpacity, SafeAreaView } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'


const Login = (props) => {

    const ip = "192.168.0.101";

    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");

    const checkLogin = () => {

        if (phone.length == 0) {
            alert("Chưa nhập số điện thoại");
            return;
        }
        if (pass.length == 0) {
            alert("Chưa nhập Password");
            return;

        }

        let url = 'http://' + ip + ':3000/login/' + phone;

        fetch(url)
            .then((res) => { return res.json(); })
            .then(async (res_json) => {
                if (res_json.length != 1) {
                    alert("Không tồn tại username hoặc bị trùng lặp dữ liệu");
                    return;
                }
                // đến đây là tồn tại 1 bản ghi, kiểm tra password
                let objU = res_json[0];
                if (objU.pass != pass) {
                    alert("Sai password"); return;
                }

                // đến đây là đúng thông tin, thì lưu vào storage và chuyển màn hình
                try {

                    await AsyncStorage.setItem('loginInfo', JSON.stringify(objU));

                    // chuyển màn hình
                    props.navigation.navigate('HomeTab');
                } catch (e) {
                    // saving error
                    console.log(e);
                }


            })


    }



    const SignUp = () => {
        props.navigation.navigate('SignUp');
    }
    return (

        <ImageBackground blurRadius={1} style={{ flex: 1 }} source={require('../Images/nenbarber.jpg')}>
            <SafeAreaView>

                <View style={{ justifyContent: 'center', width: "100%", alignItems: "center", marginTop: 50 }}>
                    <Image style={{ width: 200, height: 200, borderRadius: 50 }} source={require('../Images/Barbershop.png')} />
                </View>


                <View style={style.btn}>
                    <Image source={require('../Images/Vector.png')} style={{ width: 20, height: 20, marginTop: 10, marginLeft: 8 }} />
                    <TextInput style={style.textinput} placeholder="Số điện thoại" placeholderTextColor='white' onChangeText={txt => { setPhone(txt) }} />
                </View>

                <View style={{ height: 30 }}></View>

                <View style={style.btn}>
                    <Icons name="lock" color="#FFF" size={30} style={{ marginTop: 8 }} />
                    <TextInput style={style.textinput} placeholder='Password' secureTextEntry={true} textContentType="password" placeholderTextColor='white' onChangeText={(txt) => { setPass(txt) }} />
                </View>

                <View style={{ width: '88%', marginTop: 20, marginRight: 50, alignItems: 'flex-end', }}>
                    <Text style={{ color: 'white', }}>Quên mật khẩu?</Text>
                </View>

                <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../Images/gg.png')} style={{ borderRadius: 150, width: 50, height: 50 }} />
                        <Text style={{ color: 'white', margin: 20 }}>OR</Text>
                        <Image source={require('../Images/fb.png')} style={{ borderRadius: 150, width: 50, height: 50 }} />

                    </View>
                </View>

                <TouchableOpacity onPress={checkLogin} style={{ backgroundColor: '#CD853F', width: '80%', height: 50, marginTop: 50, borderRadius: 50, alignItems: 'center', alignSelf: 'center' }}  >
                    <Text style={{ color: 'white', fontSize: 20, marginTop: 10, }}>Đăng nhập</Text>
                </TouchableOpacity>

                <Text style={{ color: 'white', marginTop: 20, alignSelf: 'center' }} onPress={SignUp} >Bạn chưa có tài khoản?</Text>

            </SafeAreaView>

        </ImageBackground>
    );
}
const style = StyleSheet.create({

    img: {
        width: 30,
        height: 30,
        marginTop: 5
    },
    btn: {
        width: 300,
        borderColor: 'white',
        borderWidth: 2,
        alignContent: 'center',
        alignSelf: 'center',
        height: 50,
        borderRadius: 5,
        flexDirection: 'row',
    },
    textinput: {
        width: 200,
        color: 'white',
        marginLeft: 10,

    }

})
export default Login;