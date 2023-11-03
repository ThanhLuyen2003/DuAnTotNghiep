import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChoLayHang from '../ComponentsDonHang/ChoLayHang';
import ChoGiaoHang from '../ComponentsDonHang/ChoGiaoHang';
import DaGiao from '../ComponentsDonHang/DaGiao';
import DaHuy from '../ComponentsDonHang/DaHuy';
import TraHang from '../ComponentsDonHang/Trahang';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TabDonHang = (props) => {


    const id = props.route.params.id;

    const topTap = createMaterialTopTabNavigator();

    return (
        <View style={{ height: '100%' }}>

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
                        backgroundColor: "#778899",
                        height: 5,
                        borderRadius: 5,
                        width: "16%",
                        marginLeft: 5
                    },
                    tabBarScrollEnabled: true,


                }}>
                <topTap.Screen name="ChoLayHang" component={ChoLayHang} initialParams={{ id }} options={{
                    title: "Chờ lấy hàng",
                }} />

                <topTap.Screen name="ChoGiaoHang" component={ChoGiaoHang} initialParams={{ id }} options={{
                    title: "Chờ giao hàng"
                }} />

                <topTap.Screen name="DaGiao" component={DaGiao} initialParams={{ id }} options={{
                    title: "Đã giao"
                }} />

                <topTap.Screen name="DaHuy" component={DaHuy} initialParams={{ id }} options={{
                    title: "Đã hủy"
                }} />

                <topTap.Screen name="TraHang" component={TraHang} initialParams={{ id }} options={{
                    title: "Trả hàng"
                }} />



            </topTap.Navigator>
        </View>
    )
}

export default TabDonHang

const styles = StyleSheet.create({
    con2: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    }
})