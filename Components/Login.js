import React from "react";
import { View, Image, StyleSheet, Text, ImageBackground, Button, TextInput, TouchableHighlight } from "react-native";

const Login = (props) => {
    const hi = () => {
        props.navigation.navigate('HomeTab');
    }

    const SignUp = () => {
        props.navigation.navigate('SignUp');
    }
    return (
        <ImageBackground blurRadius={1} style={{ flex: 1 }} source={require('../Images/nenbarber.jpg')}>
            <Image style={{ width: 250, height: 250, borderRadius: 50, marginTop: 30, marginLeft: 80 }} source={require('../Images/Barbershop.png')} />

            <View style={{ height: 30 }}></View>


            <View style={style.btn}>
                <Image source={require('../Images/Vector.png')} style={{ width: 20, height: 20, marginTop: 10, marginLeft: 8 }} />
                <TextInput style={style.textinput} placeholder="Số điện thoại" placeholderTextColor='white' />
            </View>

            <View style={{ height: 30 }}></View>

            <View style={style.btn}>
                <Image source={require('../Images/pass.png')} style={style.img} />
                <TextInput style={style.textinput} placeholder='Password' secureTextEntry={true} textContentType="password" placeholderTextColor='white' onChangeText={(txt) => { }} />
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

            <TouchableHighlight onPress={hi} style={{ backgroundColor: '#CD853F', width: '80%', height: 50, marginTop: 50, borderRadius: 50, alignItems: 'center', alignSelf: 'center' }}  >
                <Text style={{ color: 'white', fontSize: 20, marginTop: 10, }}>Đăng nhập</Text>
            </TouchableHighlight>

            <Text style={{ color: 'white', marginTop: 20, alignSelf: 'center' }} onPress={SignUp} >Bạn chưa có tài khoản?</Text>


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