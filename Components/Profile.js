import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, TouchableHighlight, Pressable, Button, ActivityIndicator, TouchableOpacity } from 'react-native'
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
                <View style={{ height: '20.5%', alignItems: "center", justifyContent: "center" }}>
                </View>

                <View style={{ height: '80.0%', backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ position: "absolute", top: -70, justifyContent: 'center', width: "100%", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate("ThongTinTaiKhoan") }} style={{ borderColor: "white", borderWidth: 3, borderRadius: 100 }}>
                            {isAvatarValid ? (
                                <ImageBackground style={{ width: 120, height: 120, borderWidth: 0, borderRadius: 100, }} imageStyle={{ borderRadius: 100 }} src={saveImage}>
                                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                        <Icons name='camera' size={30} color={'black'} style={{ opacity: 0.7, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff", borderRadius: 10 }} />
                                    </View>
                                </ImageBackground>

                            ) :
                                (
                                    <ImageBackground style={{ width: 120, height: 120, borderWidth: 0, borderRadius: 100, }} imageStyle={{ borderRadius: 100 }} src={userInfor.avatar}>
                                        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                            <Icons name='camera' size={30} color={'black'} style={{ opacity: 0.7, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff", borderRadius: 10 }} />
                                        </View>
                                    </ImageBackground>
                                )}
                        </TouchableOpacity>

                    </View>
                    <ScrollView style={{ marginTop: 60, }}>
                        <Pressable onPress={tttk}>
                            <View style={styles.accountInfoRow}>
                                <Icons name='border-color' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Thông tin tài khoản</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable>
                        <Pressable onPress={() => { props.navigation.navigate("TabDonHangProfile", { id: userInfor._id }) }}>
                            <View style={styles.accountInfoRow} >
                                <Icons name='shopping' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Đơn hàng</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable>
                        {/* <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F' }}>
                            <Icons name='face-agent' size={25} color={'#CD853F'} />
                            <Text style={{ marginLeft: 10, width: 200 }}>Sở thích phục vụ</Text>
                            <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                        </View> */}
                        {/* <Pressable onPress={() => { props.navigation.navigate("Balance", { id: userInfor._id }) }}>
                            <View style={styles.accountInfoRow}>
                                <Icons name='notebook-edit-outline' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Nạp tiền</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable> */}

                        <Pressable onPress={() => { props.navigation.navigate("TabHistory", { id: userInfor._id }) }}>
                            <View style={styles.accountInfoRow}>
                                <Icons name='rotate-3d-variant' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Lịch sử cắt</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable>
                        {/* 
                        <Pressable onPress={() => { props.navigation.navigate("LichSuNapTien", { avatar: saveImage, name: userInfor.name, userId: userInfor._id }) }}>
                            <View style={styles.accountInfoRow}>
                                <Icons name='security' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Lịch sử giao dịch</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable> */}

                        <Pressable onPress={() => { props.navigation.navigate("CamKetFpoly", { avatar: saveImage, name: userInfor.name }) }}>
                            <View style={styles.accountInfoRow}>
                                <Icons name='shield-sun' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Cam kết về Fpoly Barber Care</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable>

                        <Pressable onPress={() => { props.navigation.navigate("VeChungToi", { avatar: saveImage, name: userInfor.name }) }}>
                            <View style={styles.accountInfoRow}>
                                <Icons name='family-tree' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Về chúng tôi</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable>

                        <Pressable onPress={() => { props.navigation.navigate("DieuKienGiaoDich", { avatar: saveImage, name: userInfor.name }) }}>
                            <View style={styles.accountInfoRow}>
                                <Icons name='account-arrow-right' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Điều kiện giao dịch chung</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable>

                        <Pressable onPress={() => { props.navigation.navigate("BaoMatThongTin", { avatar: saveImage, name: userInfor.name }) }}>
                            <View style={styles.accountInfoRow}>
                                <Icons name='security' size={25} color={'#CD853F'} />
                                <Text style={{ marginLeft: 10, width: 200 }}>Chính sách bảo mật thông tin</Text>
                                <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                            </View>
                        </Pressable>
                    </ScrollView>

                    <View style={{ height: 70 }}>

                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Profile

const styles = StyleSheet.create({
    accountInfoRow: {
        flexDirection: 'row',
        margin: 5,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#CD853F',
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center'
    },

})