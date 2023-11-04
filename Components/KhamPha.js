import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, ImageBackground, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Onboarding from 'react-native-onboarding-swiper';
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const KhamPha = (props) => {
    const [userInfor, setUserInfor] = useState({});
    const [saveImage, setsaveImage] = useState({});
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

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

    const yeuThich =()=>{
            if(isLiked){
                setLikeCount(likeCount -1)
            }else{
                setLikeCount(likeCount +1)
            }
            setIsLiked(!isLiked);
            setIsPressed(!isPressed)
    }
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
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text>CÙNG 30SHINE KHÁM PHÁ</Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>XU HƯỚNG TÓC HOT NHẤT</Text>
                    <View style={{ width: "100%", height: 45, backgroundColor: "#C0C0C0", padding: 10, borderRadius: 10, flexDirection: "row", alignItems: "center" }}>
                        <Icon name="robot-love" size={20} />
                        <Text style={{ marginLeft: 10 }}>Đã thích</Text>
                        <Text style={{ marginLeft: "auto", backgroundColor: "yellow", width: 20, height: 20, paddingLeft: 6, borderRadius: 50 }}>{likeCount}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", top: 10 }}>

                    <Image style={{ width: "48%", height: 200, right: 5, borderRadius: 10, opacity: 0.8 }} source={{ uri: "https://classic.vn/wp-content/uploads/2022/09/classicvn-kieu-toc-side-part-vuot-ru-dep-d.png" }} />
                    <Text style={{ position: "absolute", left: 25, top: 160, color: "white" }}>Phá cách với kiểu tóc...</Text>
                    <TouchableHighlight onPress={yeuThich}>
                        <Icons name="robot-love-outline" size={25} style={{ position: "absolute", right:20, top: 10, width: 40, height: 40,  backgroundColor: isPressed ? 'yellow' : '#CCCCCC', paddingLeft: 7, paddingTop: 6, borderRadius: 50 }} color={"white"} />
                    </TouchableHighlight>

                    <Image style={{ width: "48%", height: 200, left: 5, borderRadius: 10, opacity: 0.8 }} source={{ uri: "https://dungtranacademy.vn/wp-content/uploads/2021/09/cham-soc-toc-hay-cho-nam-gioi.jpg" }} />
                    <Text style={{ position: "absolute", right: 25, top: 160, color: "white" }}>4 Mẹo Giữ Form Tóc...</Text>
                    <TouchableHighlight onPress={yeuThich}>
                        <Icons name="robot-love-outline" size={25} style={{ position: "absolute", right:20, top: 10, width: 40, height: 40,  backgroundColor: isPressed ? 'yellow' : '#CCCCCC', paddingLeft: 7, paddingTop: 6, borderRadius: 50 }} color={"white"} />
                    </TouchableHighlight>
                </View>
            </ScrollView>

        </View>
    )
}

export default KhamPha

const styles = StyleSheet.create({
    con2: {
        height: '83.5%',
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        top: "17%",
        padding: 10
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
})