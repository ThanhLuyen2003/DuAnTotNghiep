import { Image, StyleSheet, Text, View, ImageBackground, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import ip from '../../IP';

const ThongTinTaiKhoan = (props) => {
    const [userInfor, setUserInfor] = useState({});
    const [saveImage, setsaveImage] = useState();
    const [isLoading, setisLoading] = useState(false);
    const [totalBalance, settotalBalance] = useState(0)
    const editProfile = () => {
        props.navigation.navigate("EditProfile")
    }
    const getLoginInfor = async () => {

        const user = await AsyncStorage.getItem('loginInfo');
        const m_saveImage = await AsyncStorage.getItem('savedImage')
        const m_totalBalance = await AsyncStorage.getItem('totalBalance')
        setUserInfor(JSON.parse(user))
        setsaveImage(m_saveImage);
        settotalBalance(parseFloat(m_totalBalance));
    }
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getLoginInfor();


        });

        return unsubscribe;
    }, [props.navigation]);
    const isAvatarValid = saveImage && typeof saveImage === 'string' && saveImage.trim() !== '';

    const logout = async () => {
        setisLoading(true)
        //console.log(userInfor);
        await new Promise(resolve => setTimeout(resolve, 3000));

        await AsyncStorage.setItem('loginInfo', JSON.stringify({ name: "", _id: "", email: "", phone: "", address: "", avatar: "", pass: "",totalBalance:"" }));
        await AsyncStorage.removeItem("savedImage")
        
        setUserInfor({}); // Reset user information state
        setsaveImage({}); // Reset image state
      
        setisLoading(false)
        props.navigation.navigate('Login')

    }

    const deleteUser = async () => {
        try {
            const userId = userInfor._id;
            const response = await fetch('http://' + ip + ':3000/apiuser/deleteUser/' + userId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Thành công', 'Xóa người dùng thành công');
                props.navigation.navigate('Login');
            } else {
                Alert.alert('Lỗi', data.message || 'Lỗi xóa người dùng');
            }
        } catch (error) {
            console.error('Error :', error);
            Alert.alert('Error', 'An unexpected error occurred.');
        }
    };
    return (
        <ScrollView>

            <View style={{ backgroundColor: "#666b7b", width: "auto", height: 100, marginTop: 10, alignItems: "center" }}>
                {isAvatarValid ? (
                    <ImageBackground style={{ width: 120, height: 120, borderWidth: 0.5, borderRadius: 100, marginTop: 20 }} imageStyle={{ borderRadius: 100 }} source={{ uri: saveImage }}>
                        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                            <Icons name='camera' size={30} color={'black'} style={{ opacity: 0.8, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff", borderRadius: 10 }} />
                        </View>
                    </ImageBackground>

                ) :
                    (
                        <ImageBackground style={{ width: 120, height: 120, borderWidth: 0.5, borderRadius: 100, marginTop: 20 }} imageStyle={{ borderRadius: 100 }} src={userInfor.avatar}>
                            <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                <Icons name='camera' size={30} color={'black'} style={{ opacity: 0.7, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff", borderRadius: 10 }} />
                            </View>
                        </ImageBackground>
                    )}

            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold", padding: 8, marginTop: 40, width: "50%" }}>THÔNG TIN CÁ NHÂN</Text>

                <Text onPress={editProfile} style={{ color: "#FF9900", padding: 8, marginTop: 40, width: "50%", textAlign: "right" }}>Chỉnh sửa</Text>
            </View>


            <View style={{ backgroundColor: "white", width: "100%", height: 170, padding: 10 }}>
                <View style={{ flexDirection: "row", width: "auto", height: 40, alignItems: "center", borderBottomColor: "gray", borderBottomWidth: 0.5 }}>
                    <Text style={{ width: "60%", color: "gray" }}>Họ và tên</Text>
                    <Text style={{ width: "40%", textAlign: "right" }}>{userInfor.name}</Text>
                </View>

                <View style={{ flexDirection: "row", width: "auto", height: 40, alignItems: "center", borderBottomColor: "gray", borderBottomWidth: 0.5 }}>
                    <Text style={{ width: "60%", color: "gray" }}>Số điện thoại</Text>
                    <Text style={{ width: "40%", textAlign: "right" }}>{userInfor.phone}</Text>
                </View>

                <View style={{ flexDirection: "row", width: "auto", height: 40, alignItems: "center", borderBottomColor: "gray", borderBottomWidth: 0.5 }}>
                    <Text style={{ width: "60%", color: "gray" }}> Email</Text>
                    <Text style={{ width: "40%", textAlign: "right" }}>{userInfor.email}</Text>
                </View>

                <View style={{ flexDirection: "row", width: "auto", height: 40, alignItems: "center" }}>
                    <Text style={{ width: "40%", color: "gray" }}>Địa chỉ</Text>
                    <Text style={{ width: "60%", textAlign: "right" }}>{userInfor.address}</Text>
                </View>
            </View>

            <View style={{ width: "100%", height: 100, justifyContent: 'center', alignItems: "center" }}>

                {isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#CD853F" style={{ backgroundColor: "#C0C0C0", width: 125, height: 125, borderRadius: 10, opacity: 0.5 }} />
                    </View>
                ) : (
                    <Text style={{ borderBottomWidth: 1, fontWeight: "500" }} onPress={logout}>ĐĂNG XUẤT</Text>
                )}
            </View>
            <View style={{ width: "100%", height: 30, justifyContent: 'center', alignItems: "center" }}>
                <TouchableOpacity onPress={deleteUser}>
                    <Text style={{ borderBottomWidth: 1, color: "red", fontWeight: "500", borderBottomColor: "red" }}>Xóa tài khoản</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    )
}

export default ThongTinTaiKhoan

const styles = StyleSheet.create({})