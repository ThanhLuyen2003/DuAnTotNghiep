import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import LienHe from '../LienHe';
import TinNhan from '../TinNhan';
const topTap = createMaterialTopTabNavigator();
const TabGroup = (props) => {
  const {navigation}=props
    const profile=()=>{
        navigation.navigate("Profile")
    }
  return (
    <View style={{flex:1,width:"100%"}}>
     <View style={{ backgroundColor: 'rgba(251, 154, 69, 0.8)', width: "100%", height: 80, flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginTop: 20 }}>
                <Icons style={{ position: "absolute", left: 25, zIndex: 1, top: 7 }} name="magnify" size={25} color="#363636" />
                <TextInput placeholder="Tìm kiếm cuộc gọi" style={{ width: 250, height: 40, backgroundColor: "#F8F8FF", left: 20, borderRadius: 10, paddingLeft: 28 }} />

                <Icons style={{ position: "absolute", left: 340, zIndex: 1, top: 7, }} name="bell-badge" size={25} color="#363636" />
                <Icons style={{ position: "absolute", left: 375, zIndex: 1, top: 7, }}onPress={profile}  name="account" size={25} color="#363636" />
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
            width: "47%",
            marginLeft: 5
          },

        }}>
        <topTap.Screen name="LienHe" component={LienHe} options={{

          title: ({ color, focused }) => (
            <View>
              <Icons name='phone' size={25} color={focused ? '#CD853F' : 'gray'} />
            </View>
          ),

        }} />
        <topTap.Screen name="TinNhan" component={TinNhan} options={{
          title: ({ color, focused }) => (
            <View>
              <Icons name='message' size={25} color={focused ? '#CD853F' : 'gray'} />
            </View>
          )
        }} />
      </topTap.Navigator>
    </View>
  )
}

export default TabGroup

const styles = StyleSheet.create({})