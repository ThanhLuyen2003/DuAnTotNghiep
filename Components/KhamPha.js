import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, ImageBackground, Image, TouchableOpacity } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Onboarding from 'react-native-onboarding-swiper';
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";


const KhamPha = (props) => {
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
})