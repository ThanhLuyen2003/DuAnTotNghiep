import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, TouchableHighlight, Pressable, Button } from 'react-native'
import React from 'react'
import { useState } from "react";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = (props) => {

    const editProfile = () => {
        props.navigation.navigate("EditProfile")
    }

    const [userInfor, setUserInfor] = useState({});

    const getLoginInfor = async () => {

        const user = await AsyncStorage.getItem('loginInfo');
        setUserInfor(JSON.parse(user))

    }





    const logout = async () => {

        //console.log(userInfor);

        await AsyncStorage.setItem('loginInfo', JSON.stringify({ name: "", _id: "", email: "", phone: "", address: "", avatar: "", pass: "" }));

        props.navigation.navigate('Login')

    }


    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getLoginInfor();


        });

        return unsubscribe;
    }, [props.navigation]);


    return (
        <ImageBackground blurRadius={2} style={{ flex: 1 }} source={require('../Images/nenbarber.jpg')}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                </View>

                <View style={{ flex: 2, backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ position: "absolute", top: -50, justifyContent: 'center', width: "100%", alignItems: "center" }}>

                        <Image style={{ width: 96, height: 96, borderRadius: 50 }} source={{ uri: userInfor.avatar }} />
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{userInfor.name}</Text>
                        <Text style={{ fontSize: 15 }}>{userInfor.email}</Text>
                        <Text style={{ fontSize: 15 }}>{userInfor.phone}</Text>

                    </View>

                    <ScrollView style={{ marginTop: 120, marginBottom: 60 }}>
                        <View style={{ margin: 5, marginLeft: 10, backgroundColor: '#CD853F', borderRadius: 5 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Tài khoản</Text>
                        </View>
                        <Pressable onPress={editProfile}>
                            <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                                <Icons name='border-color' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Chỉnh sửa tài khoản</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable>
                        <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                            <Icons name='shopping' size={25} color={'#CD853F'} />
                            <Text style={{ marginLeft: 10, width: 200 }}>Đơn hàng</Text>
                            <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                        </View>
                        <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                            <Icons name='sale' size={25} color={'#CD853F'} />
                            <Text style={{ marginLeft: 10, width: 200 }}>Ưu đãi</Text>
                            <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                        </View>
                        <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                            <Icons name='face-agent' size={25} color={'#CD853F'} />
                            <Text style={{ marginLeft: 10, width: 200 }}>Trợ giúp, hỗ trợ yêu cầu</Text>
                            <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                        </View>
                        <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                            <Icons name='map-marker-check' size={25} color={'#CD853F'} />
                            <Text style={{ marginLeft: 10, width: 200 }}>Địa điểm salon</Text>
                            <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                        </View>
                        <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                            <Icons name='bell-badge' size={25} color={'#CD853F'} />
                            <Text style={{ marginLeft: 10, width: 200 }}>Thông báo</Text>
                            <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                        </View>
                        <View style={{ margin: 5, marginLeft: 10, backgroundColor: '#CD853F', borderRadius: 5 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Cài đặt</Text>
                        </View>
                        <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                            <Icons name='information' size={25} color={'#CD853F'} />
                            <Text style={{ marginLeft: 10, width: 200 }}>Điều khoản và dịch vụ</Text>
                            <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                        </View>
                        <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                            <Icons name='logout' size={25} color={'#CD853F'} />

                            <Text style={{ marginLeft: 10, width: 200 }} onPress={logout} >Đăng xuất</Text>
                            {/* <Button title='click' onPress={showToat}/> */}
                            {/* <Toast/> */}
                            <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Profile

const styles = StyleSheet.create({})