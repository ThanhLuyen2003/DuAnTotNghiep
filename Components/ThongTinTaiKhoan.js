import { Image, StyleSheet, Text, View, ImageBackground, ScrollView, ActivityIndicator, TouchableOpacity, Alert, Modal } from 'react-native'
import React from 'react'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import ip from '../IP';
import { firebase } from "../Firebase";


const ThongTinTaiKhoan = (props) => {
    const [userInfor, setUserInfor] = useState({});
    const [saveImage, setsaveImage] = useState();
    const [isDone, setIsDone] = useState(false);
    const [totalBalance, settotalBalance] = useState(0)
    const [oldPassword, setoldPassword] = useState("");
    const editProfile = () => {
        props.navigation.navigate("EditProfile")
    }
    const getLoginInfor = async () => {

        const user = await AsyncStorage.getItem('loginInfo');
        const m_saveImage = await AsyncStorage.getItem('savedImage')
        const m_totalBalance = await AsyncStorage.getItem('totalBalance')
        const m_oldPassword = await AsyncStorage.getItem("pass");
        setoldPassword(m_oldPassword);
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
        try {
            setIsDone(true);
            await AsyncStorage.removeItem('loginInfo');
            await AsyncStorage.removeItem('savedImage');
            await AsyncStorage.removeItem('totalBalance');

            
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'GioiThieu' }], 
            });

        } catch (error) {
            console.error('Error logging out:', error.message);
        } finally {
            setIsDone(false);
        }
    }


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
                    <Text style={{ width: "40%", color: "gray" }}> Email</Text>
                    <Text style={{ width: "60%", textAlign: "right" }}>{userInfor.email}</Text>
                </View>
                <Modal
                    animationType='fade'
                    visible={isDone}
                    transparent={true}
                >
                    <View style={{ padding: 40, backgroundColor: 'black', marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', borderRadius: 20, opacity: 0.7 }}>
                        <ActivityIndicator />
                    </View>
                </Modal>
                <View style={{ flexDirection: "row", width: "auto", height: 40, alignItems: "center" }}>
                    <Text style={{ width: "40%", color: "gray" }}>Địa chỉ</Text>
                    <Text style={{ width: "60%", textAlign: "right" }}>{userInfor.address}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                <Text>ĐĂNG XUẤT</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('QuenMatKhau', { userId: userInfor._id, oldPassword: oldPassword });
                }}
                style={styles.changePasswordLink}
            >
                <Text>Đổi mật khẩu?</Text>
            </TouchableOpacity>

            <View style={{ width: "100%", height: 30, justifyContent: 'center', alignItems: "center" }}>
            </View>

        </ScrollView>
    )
}

export default ThongTinTaiKhoan

const styles = StyleSheet.create({
    logoutButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        fontWeight: '500',
    },
    changePasswordLink: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        fontWeight: '500',
    },
})