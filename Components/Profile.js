import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, TouchableHighlight, Pressable, Button, ActivityIndicator,TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from "react";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Profile = (props) => {


    const tttk = () => {
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
                    <TouchableOpacity onPress={()=>{props.navigation.navigate("ThongTinTaiKhoan")}}>
                     {isAvatarValid ? (
                            <ImageBackground style={{ width: 120, height: 120, borderWidth: 0.5, borderRadius: 100, borderColor: "#CD853F" }} imageStyle={{ borderRadius: 100 }} src={saveImage}>
                                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                    <Icons name='camera' size={30} color={'black'} style={{ opacity: 0.7, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff", borderRadius: 10 }} />
                                </View>
                            </ImageBackground>

                        ) :
                            (
                                <ImageBackground style={{ width: 120, height: 120, borderWidth: 0.5, borderRadius: 100, borderColor: "#CD853F" }} imageStyle={{ borderRadius: 100 }} src={userInfor.avatar}>
                                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                        <Icons name='camera' size={30} color={'black'} style={{ opacity: 0.7, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff", borderRadius: 10 }} />
                                    </View>
                                </ImageBackground>
                            )}
                </TouchableOpacity>
                        


                    </View>
                    <ScrollView style={{ marginTop: 60, marginBottom: 60 }}>
                        <Pressable onPress={tttk}>
                            <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                                <Icons name='border-color' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Thông tin tài khoản</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable>
                        <Pressable onPress={() => { props.navigation.navigate("TabDonHangProfile", { id: userInfor._id }) }}>
                            <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F', }} >
                                <Icons name='shopping' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Đơn hàng</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable>
                        {/* <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                            <Icons name='face-agent' size={25} color={'#CD853F'} />
                            <Text style={{ marginLeft: 10, width: 200 }}>Sở thích phục vụ</Text>
                            <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                        </View>
                        <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                            <Icons name='notebook-edit-outline' size={25} color={'#CD853F'} />
                            <Text style={{ marginLeft: 10, width: 200 }}>Hiểu để phục vụ anh tốt hơn</Text>
                            <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                        </View> */}
                        <Pressable onPress={() => { props.navigation.navigate("TabHistory", { id: userInfor._id }) }}>
                            <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                                <Icons name='rotate-3d-variant' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Lịch sử cắt</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable>

                        <Pressable onPress={() => { props.navigation.navigate("ThongTinHoTroKhachHang", { avatar: saveImage, name: userInfor.name }) }}>
                            <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                                <Icons name='information' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Thông tin hỗ trợ khách hàng</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable>

                        <Pressable onPress={() => { props.navigation.navigate("PhoneXacNhan") }}>
                            <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                                <Icons name='code-brackets' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Lấy OTP xác thực giao dịch</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable>
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Profile

const styles = StyleSheet.create({})