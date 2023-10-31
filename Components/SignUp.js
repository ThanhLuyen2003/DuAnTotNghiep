import React from "react";
import { View, Image, StyleSheet, ImageBackground, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'



const SignUp = (props) => {
    const ip = "192.168.0.101";
    const { navigation } = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");
    const [rePass, setrePass] = useState("");
    const [avatar, setAvatar] = useState("");
    const [address, setAddress] = useState("");




    // Hàm kiểm tra định dạng số điện thoại
    const isValidPhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{10,11}$/; // Định dạng: 10 hoặc 11 chữ số

        return phoneRegex.test(phoneNumber);
    };
    // Hàm kiểm tra định dạng email
    const isValidEmail = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;

        return emailRegex.test(email);
    };

    //kiểm tra kí tự 
    const isValidName = (name) => {
        const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

        return nameRegex.test(name);
    };
    const addSignUp = () => {
        if (!name || !email || !phone || !pass || !rePass) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        if (pass != rePass) {
            alert("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
            return;
        }

        if (!isValidPhoneNumber(phone)) {
            alert('Số điện thoại không hợp lệ. Vui lòng kiểm tra lại!');
            return;
        }
        if (!isValidEmail(email)) {
            alert('Email không hợp lệ. Vui lòng kiểm tra lại!');
            return;
        }
        if (pass.length && rePass.length < 8) {
            alert("Mật khẩu trên 8 kí tự!")
            return;
        }
        if (!isValidName(name)) {
            alert('Tên không hợp lệ. Vui lòng kiểm tra lại!');
            return;
        }

        if (name.length < 11) {
            alert("Tên phải nhiều hơn 10 ký tự!");
            return;
        }
        let obj = {
            name: name,
            email: email,
            phone: phone,
            pass: pass,
            avatar: avatar,
            address: address
        };

        const url = "http://192.168.0.101:3000/addUser";

        fetch(url, {
            method: 'POST',
            headers: {


                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
            .then(response => {
                if (response.status === 200) {
                    alert("Thêm thành công");
                    setName('');
                    setEmail('');
                    setPhone('');
                    setPass('');
                    setrePass('');
                    navigation.navigate("Login")
                   
                } else if (response.status === 400) {
                    alert("Số điện thoại đăng kí trùng lặp hoặc email bị trùng ")
                }
                else {
                    alert("Thêm thất bại ");
                    return response.json();
                }
            })
            .catch(error => {
                console.error('Lỗi khi thêm:', error);
                alert('Có lỗi xảy ra trong quá trình thêm: ' + error.massge);
            });
    };


    return (
        <ImageBackground blurRadius={2} style={{ flex: 1 }} source={require('../Images/nenbarber.jpg')}>
            <View style={{ flex: 1 }}>
                <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 20 }}>
                    {/* <View style={{ justifyContent: 'center', width: "100%", alignItems: "center" }}>
                        <Image style={{ width: 200, height: 200, borderRadius: 50 }} source={require('../Images/Barbershop.png')} />
                    </View> */}
                    <View style={{ margin: 5, marginLeft: 10, alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Tạo tài khoản để được nhiều</Text>
                        <Text style={{ fontSize: 15, color: 'white' }}>ưu đãi hơn từ hôm nay</Text>
                    </View>
                    <View style={{ flexDirection: 'column', margin: 10, padding: 5 }}>
                        <Text style={{ color: "white" }}>Họ và tên</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icons name="account" color="#FFF" size={35} style={{ position: "absolute", left: 10 }} />
                            <TextInput onChangeText={(txt) => { setName(txt) }} placeholder="Nhập họ và tên" placeholderTextColor='white' style={{ color: 'white', width: "100%", height: 50, paddingLeft: 50, borderWidth: 1, borderColor: "white", borderRadius: 10 }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', margin: 10, padding: 5, bottom: 25 }}>
                        <Text style={{ color: "white" }}>Email</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icons name="email" color="#FFF" size={35} style={{ position: "absolute", left: 10 }} />
                            <TextInput onChangeText={(txt) => { setEmail(txt) }} placeholder="Nhập email" placeholderTextColor='white' style={{ color: 'white', width: "100%", height: 50, paddingLeft: 50, borderWidth: 1, borderColor: "white", borderRadius: 10 }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', margin: 10, padding: 5, bottom: 50 }}>
                        <Text style={{ color: "white" }}>Số điện thoại</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icons name="phone" color="#FFF" size={35} style={{ position: "absolute", left: 10 }} />
                            <TextInput keyboardType='numeric' maxLength={11} onChangeText={(txt) => { setPhone(txt) }} placeholder="Nhập số điện thoại" placeholderTextColor='white' style={{ color: 'white', width: "100%", height: 50, paddingLeft: 50, borderWidth: 1, borderColor: "white", borderRadius: 10 }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', margin: 10, padding: 5, bottom: 75 }}>
                        <Text style={{ color: "white" }}>Mật khẩu</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image style={{ width: 35, height: 35, position: "absolute", left: 10 }} source={require('../Images/padlock.png')} />

                            <Icons name="lock" color="#FFF" size={35} style={{ position: "absolute", left: 10 }} />
                            <TextInput keyboardType='numeric' maxLength={8} onChangeText={(txt) => { setPass(txt) }} placeholder="Nhập mật khẩu" placeholderTextColor='white' style={{ color: 'white', width: "100%", height: 50, paddingLeft: 50, borderWidth: 1, borderColor: "white", borderRadius: 10 }} />

                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', margin: 10, padding: 5, bottom: 95 }}>
                        <Text style={{ color: "white" }}>Nhập lại mật khẩu</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image style={{ width: 35, height: 35, position: "absolute", left: 10 }} source={require('../Images/padlock.png')} />

                            <Icons name="lock" color="#FFF" size={35} style={{ position: "absolute", left: 10 }} />
                            <TextInput keyboardType='numeric' maxLength={8} onChangeText={(txt) => { setrePass(txt) }} placeholder="Nhập lại mật khẩu" placeholderTextColor='white' style={{ color: 'white', width: "100%", height: 50, paddingLeft: 50, borderWidth: 1, borderColor: "white", borderRadius: 10 }} />

                        </View>
                    </View>
                    <Pressable style={{ justifyContent: "center", bottom: 80 }} onPress={addSignUp}>
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