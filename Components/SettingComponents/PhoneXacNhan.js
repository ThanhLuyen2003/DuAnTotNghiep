import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneXacNhan = (props) => {
    const [userInfor, setUserInfor] = useState({});
    const [phone, setPhone] = useState("");

    const ip = "192.168.1.117";

    const getLoginInfor = async () => {
        const user = await AsyncStorage.getItem('loginInfo');
        setUserInfor(JSON.parse(user))
    }
    // Hàm kiểm tra định dạng số điện thoại
    const isValidPhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{10,11}$/; // Định dạng: 10 hoặc 11 chữ số

        return phoneRegex.test(phoneNumber);
    };
    const checkPhone = () => {
        if (phone.length === 0) {
            alert("Chưa nhập số điện thoại");
            return;
        }
        if (!isValidPhoneNumber(phone)) {
            alert('Số điện thoại không hợp lệ. Vui lòng kiểm tra lại!');
            return;
        }

        // Thực hiện kiểm tra khi người dùng nhấn nút "Check"
        let url = 'http://' + ip + ':3000/login/' + phone;
        fetch(url)
            .then((res) => res.json())
            .then((res_json) => {
                if (res_json.length !== 1) {
                    alert("Số điện thoại không khớp với tài khoản vui lòng nhập lại!");

                    return;
                } else {

                    props.navigation.navigate('OTPgiaoDich', { id: userInfor._id });
                    setPhone("");
                }


            })
            .catch((error) => {
                console.error("Error:", error);
                Alert.alert("Đã xảy ra lỗi khi kiểm tra số điện thoại");
            });
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getLoginInfor();
        });

        return unsubscribe;
    }, [props.navigation]);

    return (
        <View>
            <TextInput
                keyboardType='numeric' maxLength={11}
                placeholder="Số điện thoại"
                placeholderTextColor='white'
                onChangeText={txt => setPhone(txt)}
            />
            <Button title='Check' onPress={checkPhone} />
        </View>
    );
}

export default PhoneXacNhan;

const styles = StyleSheet.create({});
