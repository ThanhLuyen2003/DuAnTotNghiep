import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, ImageBackground, Image, TouchableOpacity, Linking } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Onboarding from 'react-native-onboarding-swiper';
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ip from "../IP";

const Home = (props) => {

    const [userInfor, setUserInfor] = useState({});
    const [saveImage, setsaveImage] = useState({});
    const [data, setdata] = useState([]);
    const [totalBalance, settotalBalance] = useState(0)
    const [showTongSoDu, setShowTongSoDu] = useState(false);
    const getLoginInfor = async () => {
        const user = await AsyncStorage.getItem('loginInfo');
        const m_saveImage = await AsyncStorage.getItem('savedImage')
        const m_totalBalance = await AsyncStorage.getItem('totalBalance')

        setUserInfor(JSON.parse(user))
        settotalBalance(parseFloat(m_totalBalance));
        setsaveImage(m_saveImage)
    }


    const getList = async () => {


        let api = 'http://' + ip + ':3000/getCart/' + props.route.params.id;

        try {
            const response = await fetch(api);
            const json = await response.json(); //chuyen du lieu thanh json

            setdata(json);// do du lieu vao state
        } catch (err) {
            console.error(err);
        }

    }
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getLoginInfor();
            getList();

        });

        return unsubscribe;
    }, [props.navigation]);

    const isAvatarValid = saveImage && typeof saveImage === 'string' && saveImage.trim() !== '';

    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const phone = () => {
        let phoneNumber = '0963424881';
        Linking.openURL(`tel:${phoneNumber}`)
    }

    return (
        <View style={{ height: '90%' }}>

            <View style={{ height: '20%', width: '100%', backgroundColor: "#778899", flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("ThongTinTaiKhoan") }}>
                    {isAvatarValid ? (
                        <Image source={{ uri: saveImage }} style={{ height: 60, width: 60, borderRadius: 50, marginBottom: '5%' }} />

                        ) :
                          (
                            <Image source={{ uri: userInfor.avatar }} style={{ height: 60, width: 60, borderRadius: 50, marginBottom: '5%' }} />
                          )}
                </TouchableOpacity>

                <View style={{ alignItems: 'flex-start', marginLeft: 10, marginBottom: '5%' }}>
                    <Text style={{ fontSize: 20, color: 'white' }} >{userInfor.name} </Text>
                    <Text style={{ color: 'white' }} >Đẹp như trong mơ đến Fpoly Barber</Text>
                    <View style={{ height: 30, borderWidth: 1, borderColor: "white", justifyContent: "center", alignItems: "center", borderRadius: 20, padding: 6,flexDirection:"row" }}>
                    <Text style={{ color: "white" }}>Số dư ví: {showTongSoDu ? formatCurrency(totalBalance) : '******'}đ</Text>
                        <TouchableOpacity onPress={() => setShowTongSoDu(!showTongSoDu)}>
                    <Icons name={showTongSoDu ? 'eye' : 'eye-off'} size={20} color={'black'}  style={{marginLeft:10}}/>
                </TouchableOpacity>
                    </View>
                    

                </View>

                <TouchableOpacity onPress={() => { props.navigation.navigate('Cart', { id: userInfor._id }) }} style={{ position: 'absolute', right: 20, flexDirection: 'row' }} >
                    <Icons name="cart" size={25} color="white" />

                    {data.length != 0
                        ? <View style={{ position: 'absolute', bottom: 15, left: 12, height: 18, backgroundColor: 'red', padding: 3, borderRadius: 10, }}>
                            <Text style={{ color: 'white', fontSize: 10, }} > {data.length} </Text>
                        </View>
                        : <View></View>
                    }

                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate('ThongTinTaiKhoan')} style={{ position: 'absolute', right: 60 }}>
                    <Icons name="account" size={25} color="white" />
                </TouchableOpacity>


            </View>

            <View >

            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.con2} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('LichDaDat', { id: userInfor._id })}
                        style={{ alignItems: 'center' }}>
                        <View style={styles.but}>
                            <Image source={require('../Images/imgHome/datlich.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <Text>Lịch đã đặt</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('TabHistory', { id: userInfor._id })}
                        style={{ alignItems: 'center' }}>
                        <View style={styles.but}>
                            <Image source={require('../Images/imgHome/lichsucat.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <Text>Lịch sử{"\n"}   cắt</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('TabDonHang', { id: userInfor._id })} style={{ alignItems: 'center' }}
                    >
                        <View style={styles.but}>
                            <Image source={require('../Images/imgHome/donhang.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <Text>Đơn hàng</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('HeThongSalon')} style={{ alignItems: 'center' }}>
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
                    <Text style={{ fontSize: 30, color: 'white' }}>•••••</Text>
                </View>

                <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
                    Trải nghiệm dịch vụ
                </Text>

                <View style={styles.hot}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('DatLich')} style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                        <Image source={{ uri: 'https://mcdn.coolmate.me/image/October2021/barber.jpg' }} style={{ width: 70, height: 70, borderRadius: 10 }} />
                        <View style={{ marginLeft: 20, width: '70%' }}>
                            <Text style={{ fontWeight: '500', fontSize: 18 }}>Cắt, xả, tạo kiểu</Text>
                            <Text style={{ marginTop: 10, }}>Chỉ từ: 90.000đ</Text>
                        </View>


                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('DatLich')} style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                        <Image source={{ uri: 'https://media.hasaki.vn/wysiwyg/quynhnhu/Cong-dung-cua-massage-da-nong-3.jpg' }} style={{ width: 70, height: 70, borderRadius: 10 }} />
                        <View style={{ marginLeft: 20, width: '70%' }}>
                            <Text style={{ fontWeight: '500', fontSize: 18 }}>Gội Massage dưỡng sinh đá nóng Paradise</Text>
                            <Text style={{ marginTop: 10, }}>Chỉ từ: 250.000đ</Text>
                        </View>


                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('DatLich')} style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                        <Image source={{ uri: 'https://storage.beautyfulls.com/uploads-1/thanhtruc/2022/29-06-2022/tay-te-bao-chet-arrahan-nhan-sam-hanbang-soo-peeling-gel-180ml.png' }} style={{ width: 70, height: 70, borderRadius: 10 }} />
                        <View style={{ marginLeft: 20, width: '70%' }}>
                            <Text style={{ fontWeight: '500', fontSize: 18 }}>Tẩy da chết nhân sâm trắng da</Text>
                            <Text style={{ marginTop: 10, }}>Chỉ từ: 60.000đ</Text>
                        </View>


                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('DatLich')} style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                        <Image source={{ uri: 'https://kenh14cdn.com/2018/5/26/img1220-15273241867941585041203.jpg' }} style={{ width: 70, height: 70, borderRadius: 10 }} />
                        <View style={{ marginLeft: 20, width: '70%' }}>
                            <Text style={{ fontWeight: '500', fontSize: 18 }}>Đánh bay mụn cám lột mụn full face</Text>
                            <Text style={{ marginTop: 10, }}>Chỉ từ: 45.000đ</Text>
                        </View>


                    </TouchableOpacity>

                </View>



                <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                    CAM KẾT FPOLY BARBER
                </Text>

                <TouchableOpacity onPress={() => props.navigation.navigate('CamKetFpoly')} style={styles.hot}>
                    <View style={{ flexDirection: 'row-reverse' }}>

                        <View style={{ flexDirection: 'row', padding: 10, flex: 1 }}>
                            <Icons name="comment" size={50} style={{ color: '#778899' }} />

                            <View style={{ marginLeft: 10 }} >
                                <Text style={{ fontWeight: '500', fontSize: 18 }}>30 ngày</Text>
                                <Text>Đổi & trả {'\n'}miễn phí</Text>
                            </View>

                            <Text style={{ position: 'relative', right: 115, top: 8, color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                                30
                            </Text>
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

                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontWeight: '500', fontSize: 18 }}>Giảm 20%</Text>
                                <Text>Nếu chờ đợi {'\n'}quá lâu</Text>
                            </View>
                            <Text style={{ position: 'relative', right: 133, top: 10, color: 'white', fontSize: 15, fontWeight: 'bold' }}>
                                20%
                            </Text>
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




                </TouchableOpacity>

                <View style={{ height: 100 }}></View>



            </ScrollView>

            <TouchableOpacity style={styles.hi} onPress={phone}>
                <View style={styles.hi1}>
                    <Text style={{ marginTop: 7, marginLeft: 15 }}>Hotline</Text>
                </View>

                <View style={styles.hi2}>
                    <Icons name="phone" size={25} style={{ alignSelf: 'center', marginTop: 8 }} />
                </View>
            </TouchableOpacity>

        </View>

    );
}

export default Home;

const styles = StyleSheet.create({
    con2: {
        height: '84%',
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
        borderRadius: 10,


    },
    hi: {
        flexDirection: 'row',
        width: 120,
        height: 30,
        position: 'absolute',
        right: 20,
        bottom: 20
    },
    hi1: {
        backgroundColor: 'orange',
        width: '100%',
        height: '100%',
        borderRadius: 30,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 5,
            width: -5
        },

    },
    hi2: {
        width: 45,
        height: 45,
        position: 'absolute',
        right: 0,
        backgroundColor: 'orange',
        alignSelf: 'center',
        borderRadius: 30,
        borderColor: 'yellow',
        borderWidth: 2,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 3,
            width: -3
        },

    }
});
