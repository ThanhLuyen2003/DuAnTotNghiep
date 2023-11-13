import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import TaoKieuToc from '../ComponentsShop/TaoKieuToc';
import ChamSocDa from '../ComponentsShop/ChamSocDa';
import ChamSocCoThe from '../ComponentsShop/ChamSocCoThe';
import ComboSalon from '../ComponentsShop/ComboSalon';
import NuocHoa from '../ComponentsShop/NuocHoa';
import KemDanhRang from '../ComponentsShop/KemDanhRang';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ip from '../../IP';

const topTap = createMaterialTopTabNavigator();
const TabGroupProduct = (props) => {

  const [userInfo, setUserInfo] = useState({});
  const [data, setdata] = useState([]);

  const getLoginInfor = async () => {

    const value = await AsyncStorage.getItem('loginInfo');

    setUserInfo(JSON.parse(value))

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

  return (
    <View style={{ height: '90%' }}>
      <View style={{ height: '20%', width: '100%', backgroundColor: "#778899", flexDirection: 'row', alignItems: 'center', padding: 20 }}>

        <Image source={{ uri: userInfo.avatar }} style={{ height: 60, width: 60, borderRadius: 50, marginBottom: '5%' }} />

        <View style={{ alignItems: 'flex-start', marginLeft: 10, marginBottom: '5%' }}>
          <Text style={{ fontSize: 20, color: 'white' }} >{userInfo.name} </Text>
          <Text style={{ color: 'white' }} >Muốn ất ơ đến Fpoly Barber</Text>
        </View>

        <TouchableOpacity onPress={() => { props.navigation.navigate('Cart', { id: userInfo._id }) }} style={{ position: 'absolute', right: 20 }} >
          <Icons name="cart" size={25} color="white" />
          <View style={{ position: 'absolute', bottom: 15, left: 12, height: 18, backgroundColor: 'red', padding: 3, borderRadius: 10, }}>
            <Text style={{ color: 'white', fontSize: 10, }} > {data.length} </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate('ThongTinTaiKhoan')} style={{ position: 'absolute', right: 60 }}>
          <Icons name="account" size={25} color="white" />
        </TouchableOpacity>


      </View>

      <topTap.Navigator
        style={styles.con2}
        screenOptions={{
          tabBarAndroidRipple: { borderless: false },
          tabBarStyle: {
            borderWidth: 1,
            borderColor: "white",
          },
          tabBarLabelStyle: {
            textTransform: "capitalize",
            fontWeight: "bold"
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#CD853F",
            height: 5,
            borderRadius: 5,
            width: "16%",
            marginLeft: 5
          },
          tabBarScrollEnabled: true,


        }}>
        <topTap.Screen name="TaoKieuToc" component={TaoKieuToc} options={{

          title: "Tạo Kiểu Tóc"

        }} />

        <topTap.Screen name="ChamSocDa" component={ChamSocDa} options={{
          title: "Chăm sóc da"
        }} />

        <topTap.Screen name="ChamSocCoThe" component={ChamSocCoThe} options={{
          title: "Chăm sóc cơ thể"
        }} />

        <topTap.Screen name="ComboSalon" component={ComboSalon} options={{
          title: "Combo"
        }} />

        <topTap.Screen name="NuocHoa" component={NuocHoa} options={{
          title: "Nước hoa"
        }} />

        <topTap.Screen name="KemDanhRang" component={KemDanhRang} options={{
          title: "Kem đánh răng"
        }} />


      </topTap.Navigator>

    </View>

  )
}

export default TabGroupProduct

const styles = StyleSheet.create({

  con2: {
    height: '94%',
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    top: "17%"
  }
})