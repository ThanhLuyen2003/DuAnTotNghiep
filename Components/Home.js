import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, ImageBackground, Image, TouchableOpacity } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Onboarding from 'react-native-onboarding-swiper';
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = (props) => {

    const [userInfor, setUserInfor] = useState({});
    const [saveImage, setsaveImage] = useState({});


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




    return (
        <View style={{ height: '90%' }}>

            <View style={{ height: '20%', width: '100%', backgroundColor: "#778899", flexDirection: 'row', alignItems: 'center', padding: 20 }}>

                <Image source={{ uri: userInfor.avatar }} style={{ height: 60, width: 60, borderRadius: 50, marginBottom: '5%' }} />
                <View style={{ alignItems: 'flex-start', marginLeft: 10, marginBottom: '5%' }}>
                    <Text style={{ fontSize: 20, color: 'white' }} >{userInfor.name} </Text>
                    <Text style={{ color: 'white' }} >Muốn ất ơ đến Fpoly Barber</Text>
                </View>

                <TouchableOpacity onPress={() => { props.navigation.navigate('Cart', { id: userInfor._id }) }} style={{ position: 'absolute', right: 20 }} >
                    <Icons name="cart" size={25} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={{ position: 'absolute', right: 60 }}>
                    <Icons name="account" size={25} color="white" />
                </TouchableOpacity>


            </View>

            <ScrollView style={styles.con2}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <View style={styles.but}>
                            <Image source={require('../Images/imgHome/datlich.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <Text>Đặt lịch</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <View style={styles.but}>
                            <Image source={require('../Images/imgHome/lichsucat.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <Text>Lịch sử{"\n"}   cắt</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <View style={styles.but}>
                            <Image source={require('../Images/imgHome/donhang.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <Text>Đơn hàng</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <View style={styles.but}>
                            <Image source={require('../Images/imgHome/hethong.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <Text>Hệ thống{"\n"}   salon</Text>
                    </TouchableOpacity>
                </View>



                <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>

                    <Image source={require('../Images/imgHome/matxa.jpg')} style={styles.img} />
                    <Image source={require('../Images/imgHome/cattoc.jpg')} style={styles.img} />
                    <Image source={require('../Images/imgHome/lotmun.jpg')} style={styles.img} />
                    <Image source={require('../Images/imgHome/nhuomtoc.jpg')} style={styles.img} />
                    <Image source={require('../Images/imgHome/banner1.png')} style={styles.img} />

                </ScrollView>

                <View style={{ position: 'relative', width: '100%', alignItems: 'center', bottom: 40, height: 30 }}>
                    <Text style={{ fontSize: 30, color: 'white' }}>•••</Text>
                </View>

                <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
                    CAM KẾT FPOLY BARBER
                </Text>

                <View style={styles.hot}>
                    <View style={{ flexDirection: 'row-reverse' }}>

                        <View style={{ flexDirection: 'row', padding: 10, flex: 1 }}>
                            <Icons name="comment" size={50} style={{ color: '#778899' }} />
                            <Text style={{ position: 'relative', right: 35, top: 8, color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                                30
                            </Text>
                            <View >
                                <Text style={{ fontWeight: '500', fontSize: 18 }}>30 ngày</Text>
                                <Text>Đổi & trả {'\n'}miễn phí</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', padding: 10, flex: 1 }}>
                            <Icons name="comment" size={50} style={{ color: '#778899' }} />
                            <Text style={{ position: 'relative', right: 30, top: 8, color: 'white', fontSize: 20, fontWeight: 'bold' }}>7</Text>
                            <View >
                                <Text style={{ fontWeight: '500', fontSize: 18 }}>7 ngày</Text>
                                <Text>Chỉnh sửa tóc {'\n'}miễn phí</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row-reverse' }}>

                        <View style={{ flexDirection: 'row', padding: 10, flex: 1 }}>
                            <Icons name="comment" size={50} style={{ color: '#778899' }} />
                            <Text style={{ position: 'relative', right: 40, top: 8, color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                                20%
                            </Text>
                            <View >
                                <Text style={{ fontWeight: '500', fontSize: 18 }}>Giảm 20%</Text>
                                <Text>Nếu chờ đợi {'\n'}quá lâu</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', padding: 10, flex: 1 }}>
                            <Icons name="comment" size={50} style={{ color: '#778899' }} />
                            <Text style={{ position: 'relative', right: 30, top: 8, color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                                7
                            </Text>
                            <View >
                                <Text style={{ fontWeight: '500', fontSize: 18 }}>7 ngày</Text>
                                <Text>Bảo hành Uốn {'\n'}Nhuộm</Text>
                            </View>
                        </View>
                    </View>




                </View>

                <View style={{ height: 100 }}></View>



            </ScrollView>

        </View>

    );
}

export default Home;

const styles = StyleSheet.create({
    con2: {
        height: '83.5%',
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        top: "17%"
    },
    but: {
        backgroundColor: '#778899',
        padding: 10,
        borderRadius: 50,
        width: 50,
        height: 50

    },
    img: {
        width: 392, height: 140, margin: 10,
        borderRadius: 10
    },
    hot: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#EEEEEE',
        borderRadius: 10

    }

});
