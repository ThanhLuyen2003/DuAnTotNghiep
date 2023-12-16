import React, { useRef } from "react";
import { View, Image, StyleSheet, Text, ImageBackground, Button, TextInput, TouchableHighlight, TouchableOpacity, SafeAreaView } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import ip from "../IP";
import { firebase } from "../Firebase";
import { Modal } from "react-native";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";

const Login = (props) => {

    const [isDone, setIsDone] = useState(false);
    const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);
    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);



    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const checkLogin = () => {
        if (phone.length == 0) {
            alert("Chưa nhập số điện thoại");
            return;
        }
        if (pass.length == 0) {
            alert("Chưa nhập Password");
            return;
        }
        setIsDone(true)
        let url = 'http://' + ip + ':3000/login/' + phone;
        fetch(url)
            .then((res) => { return res.json(); })
            .then(async (res_json) => {
                if (res_json.length != 1) {
                    alert("Không tồn tại username hoặc bị trùng lặp dữ liệu");
                    setIsDone(false)
                    return;
                }
                // đến đây là tồn tại 1 bản ghi, kiểm tra password
                let objU = res_json[0];
                if (objU.pass != pass) {
                    setPasswordError('Mật khẩu không đúng vui lòng thử lại!');
                    setLoginAttempts(loginAttempts + 1);
                    if (loginAttempts >= 2) {
                        // reset pass
                        setResetPasswordModalVisible(true);
                    }
                    setIsDone(false);
                    return;


                }
                setLoginAttempts(0);
                // đến đây là đúng thông tin, thì lưu vào storage và chuyển màn hình
                try {

                    await AsyncStorage.setItem('loginInfo', JSON.stringify(objU));
                    if (objU.avatar) {
                        await AsyncStorage.setItem('savedImage', objU.avatar); // lưu ảnh khi có người dùng mới
                    }
                    if (objU.balance) {
                        await AsyncStorage.setItem('totalBalance', objU.balance.toString()); // lưu số tiền khi có người dùng với
                    } else {

                        const defaultBalance = 0;
                        await AsyncStorage.setItem('totalBalance', defaultBalance.toString());
                    }
                    if (objU.pass) {
                        await AsyncStorage.setItem('pass', objU.pass);
                    }
                    console.log(objU);
                    props.navigation.navigate('HomeTab', { id: objU._id });
                    setIsDone(false)

                } catch (e) {
                    // saving error
                    console.log(e);
                    setIsDone(false);
                }
            })
    }


    const SignUp = () => {
        props.navigation.navigate('SignUp');
    }

    const quenMatKhau = () => {
        props.navigation.navigate("ResetPass")
        setResetPasswordModalVisible(false);
    }
    return (

        <ImageBackground blurRadius={1} style={{ flex: 1 }} source={require('../Images/nenbarber.jpg')}>
            <SafeAreaView>

                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={isDone}
                >
                    <View style={{ padding: 40, backgroundColor: 'black', marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', borderRadius: 20, opacity: 0.5 }}>

                        <ActivityIndicator />
                    </View>
                </Modal>
                <View style={{ justifyContent: 'center', width: "100%", alignItems: "center", marginTop: 50 }}>
                    <Image style={{ width: 200, height: 200, borderRadius: 50 }} source={require('../Images/Barbershop.png')} />
                </View>

                <View style={style.btn}>
                    <Image source={require('../Images/Vector.png')} style={{ width: 20, height: 20, marginTop: 10, marginLeft: 8 }} />
                    <TextInput keyboardType='numeric' style={style.textinput} placeholder="Số điện thoại" placeholderTextColor='white' onChangeText={txt => { setPhone(txt) }} />
                </View>

                <View style={{ height: 30 }}></View>

                <View style={style.btn}>
                    <Icons name="lock" color="#FFF" size={30} style={{ marginTop: 8 }} />
                    <TextInput
                        style={[style.textinput, { borderColor: passwordError ? 'red' : 'white' }]}
                        placeholder='Password'
                        secureTextEntry={!showPassword}
                        textContentType="password"
                        placeholderTextColor='white'
                        onChangeText={(txt) => {
                            setPass(txt);
                            setPasswordError("");
                        }}
                    />
                    <TouchableOpacity onPress={toggleShowPassword}>
                        <Icons name={showPassword ? "eye-off" : "eye"} color="#FFF" size={30} style={{ marginTop: 8, marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'red', marginLeft: 70 }}>{passwordError}</Text>
                <TouchableOpacity onPress={() => { props.navigation.navigate('ResetPass') }} style={{ width: '88%', marginTop: 20, marginRight: 50, alignItems: 'flex-end', }}>
                    <Text style={{ color: 'white', }}>Quên mật khẩu?</Text>
                </TouchableOpacity>



                <TouchableOpacity onPress={checkLogin} style={{ backgroundColor: '#CD853F', width: '80%', height: 50, marginTop: 90, borderRadius: 50, alignItems: 'center', alignSelf: 'center' }}  >
                    <Text style={{ color: 'white', fontSize: 20, marginTop: 10, }}>Đăng nhập</Text>
                </TouchableOpacity>

                <Text style={{ color: 'white', marginTop: 20, alignSelf: 'center' }} onPress={SignUp} >Bạn chưa có tài khoản?</Text>
                <Modal animationType='fade'
                    transparent={true}
                    visible={resetPasswordModalVisible}>
                    <View style={{ backgroundColor: 'white', marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', borderRadius: 5, width: "90%", height: "35%" }}>
                        <View style={{ width: "100%", height: 55 }}>
                            <Text style={{ color: "red", padding: 16, fontSize: 20 }}>Thông báo</Text>
                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: "gray" }}></View>
                            <Text style={{ padding: 16 }}>Bạn nhập mật khẩu không trùng khớp quá nhiều.</Text>
                            <TouchableOpacity onPress={quenMatKhau} style={{ justifyContent: "center", alignItems: "center", width: "90%", height: 45, backgroundColor: "#CD853F", marginLeft: "5%", borderRadius: 10 }}>
                                <Text style={{ padding: 10, color: "white" }}>
                                    Quên mật khẩu
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setResetPasswordModalVisible(false) }} style={{ justifyContent: "center", alignItems: "center", height: 45, width: "90%", marginLeft: "5%", borderWidth: 0.5, borderColor: "#CD853F", borderRadius: 10, marginTop: 10 }}>
                                <Text style={{ color: "#CD853F" }}>
                                    Thử lại
                                </Text>
                            </TouchableOpacity>
                        </View>




                    </View>
                </Modal>
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