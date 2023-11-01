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

const topTap = createMaterialTopTabNavigator();
const TabGroupProduct = (props) => {

  const [userInfo, setUserInfo] = useState({});

  const getLoginInfor = async () => {

    const value = await AsyncStorage.getItem('loginInfo');

    setUserInfo(JSON.parse(value))

  }

  React.useEffect(() => {
    getLoginInfor();

  }, []);


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
        </TouchableOpacity>

        <TouchableOpacity style={{ position: 'absolute', right: 60 }}>
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
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    top: "17%"
  }
})