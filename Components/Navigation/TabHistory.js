import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChoLayHang from '../ComponentsDonHang/ChoLayHang';
import ChoGiaoHang from '../ComponentsDonHang/ChoGiaoHang';
import DaGiao from '../ComponentsDonHang/DaGiao';
import DaHuy from '../ComponentsDonHang/DaHuy';
import TraHang from '../ComponentsDonHang/Trahang';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SapToi from '../ComponentsLich/SapToi';
import DaHoanThanh from '../ComponentsLich/DaHoanThanh';
import DaHuyLich from '../ComponentsLich/DaHuyLich';

const TabHistory = (props) => {


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
                        marginLeft: 5
                    },


                }}>

                <topTap.Screen name="ChoGiaoHang" component={DaHoanThanh} initialParams={{ id }} options={{
                    title: "Đã hoàn thành"
                }} />

                <topTap.Screen name="DaHuyLich" component={DaHuyLich} initialParams={{ id }} options={{
                    title: "Đã Hủy"
                }} />


            </topTap.Navigator>
        </View>
    )
}

export default TabHistory

const styles = StyleSheet.create({
    con2: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    }
})