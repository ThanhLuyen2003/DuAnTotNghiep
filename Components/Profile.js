import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, TouchableHighlight, Pressable, Button, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState } from "react";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Profile = (props) => {

    const editProfile = () => {
        props.navigation.navigate("EditProfile")
    }
    const tttk=()=>{
        props.navigation.navigate("ThongTinTaiKhoan")
    }

    const [userInfor, setUserInfor] = useState({});
    const [saveImage, setsaveImage] = useState();
    const [isLoading, setisLoading] = useState(false);


    const getLoginInfor = async () => {

        const user = await AsyncStorage.getItem('loginInfo');
        const m_saveImage = await AsyncStorage.getItem('savedImage')

        setUserInfor(JSON.parse(user))
        setsaveImage(m_saveImage);

    }





    const logout = async () => {
        setisLoading(true)
        //console.log(userInfor);
        await new Promise(resolve => setTimeout(resolve, 3000));

        await AsyncStorage.setItem('loginInfo', JSON.stringify({ name: "", _id: "", email: "", phone: "", address: "", avatar: "", pass: "" }));
        await AsyncStorage.removeItem("savedImage")
        setUserInfor({}); // Reset user information state
        setsaveImage({}); // Reset image state
        setisLoading(false)
        props.navigation.navigate('Login')

    }


    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getLoginInfor();


        });

        return unsubscribe;
    }, [props.navigation]);


    const isAvatarValid = saveImage && typeof saveImage === 'string' && saveImage.trim() !== '';

    return (
        <ImageBackground blurRadius={2} style={{ flex: 1 }} source={require('../Images/nenbarber.jpg')}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                </View>

                <View style={{ flex: 2, backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ position: "absolute", top: -70, justifyContent: 'center', width: "100%", alignItems: "center" }}>

                        {isAvatarValid ? (
                            <Image style={{ width: 120, height: 120, borderRadius: 100 }} source={{ uri: saveImage }} />
                        ) :
                            (
                                <ImageBackground style={{ width: 120, height: 120, borderWidth: 0.5, borderRadius: 100, borderColor: "#CD853F" }} imageStyle={{ borderRadius: 100 }} src='https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg'>
                                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                        <Icons name='camera' size={30} color={'black'} style={{ opacity: 0.7, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff", borderRadius: 10 }} />
                                    </View>
                                </ImageBackground>
                            )}
                        {/* <Text style={{ fontWeight: "bold", fontSize: 20 }}>{userInfor.name}</Text>
                        <Text style={{ fontSize: 15 }}>{userInfor.email}</Text>
                        <Text style={{ fontSize: 15 }}>{userInfor.phone}</Text> */}

                    </View>

                    <ScrollView style={{ marginTop: 60, marginBottom: 60 }}>
                        <View style={{ margin: 5, marginLeft: 10, backgroundColor: '#CD853F', borderRadius: 5 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Tài khoản</Text>
                        </View>
                        <Pressable onPress={tttk}>
                            <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                                <Icons name='border-color' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Thông tin tài khoản</Text>
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
                        <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F', position: 'relative' }}>
                            <Icons name='logout' size={25} color={'#CD853F'} />


                            {isLoading ? (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '40%', transform: [{ translateX: -15 }, { translateY: -250 }] }}>
                                    <ActivityIndicator size="large" color="#CD853F" style={{ backgroundColor: "#C0C0C0", width: 125, height: 125, borderRadius: 10, opacity: 0.5 }} />
                                </View>
                            ) : (
                                <Text style={{ marginLeft: 10, width: 200 }} onPress={logout}>Đăng xuất</Text>
                            )}

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