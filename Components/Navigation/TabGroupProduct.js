import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import TaoKieuToc from '../Componentss/TaoKieuToc';
import ChamSocDa from '../Componentss/ChamSocDa';
import ChamSocCoThe from './../Componentss/ChamSocCoThe';
import ComboSalon from '../Componentss/ComboSalon';
import NuocHoa from './../Componentss/NuocHoa';
import KemDanhRang from './../Componentss/KemDanhRang';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const topTap = createMaterialTopTabNavigator();
const TabGroupProduct = (props) => {

  const [userInfo, setUserInfo] = useState({});

  const getLoginInfor = async () => {

    const value = await AsyncStorage.getItem('loginInfo');

    setUserInfo(JSON.parse(value))

  }

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // cập nhật giao diện ở đây
      getLoginInfor();


    });

    return unsubscribe;
  }, [props.navigation]);


  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <View style={{ backgroundColor: 'rgba(251, 154, 69, 0.8)', width: "100%", height: 60, flexDirection: "row", alignItems: "center" }}>

        <View >
          <Icons style={{ position: "absolute", left: 25, zIndex: 1, top: 7 }} name="magnify" size={25} color="#363636" />
          <TextInput placeholder="Tìm kiếm sản phẩm" style={{ width: 250, height: 40, backgroundColor: "#F8F8FF", left: 20, borderRadius: 10, paddingLeft: 28 }} />

          <TouchableOpacity style={{ position: "absolute", left: 375, zIndex: 1, top: 7, }} onPress={() => { props.navigation.navigate('Cart', { id: userInfo._id }) }}>

            <Icons name="cart" size={25} color="#363636" />

          </TouchableOpacity>
        </View>

      </View>
      <topTap.Navigator
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
    </SafeAreaView>

  )
}

export default TabGroupProduct

const styles = StyleSheet.create({})