import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from "react";



const ChiTietLich = (props) => {

    const ip = '192.168.88.101';

    const [address, setaddress] = useState();
    const [day, setday] = useState();
    const [hour, setHour] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();

    return (
        <View style={{ backgroundColor: 'white', height: '100%', padding: 20, }}>

            <Text style={styles.name} >{props.route.params.name}</Text>

            <Text style={styles.address}>{props.route.params.address}</Text>

            <View style={styles.con}>

                <View style={styles.time}>
                    <Text style={{ fontWeight: 'bold' }}>Thời gian: {props.route.params.hour}  /  {props.route.params.day} |  SĐT: {props.route.params.phone}</Text>
                </View>

                <View style={{ borderWidth: 0.5, marginTop: 10 }}></View>

                <ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: 5, padding: 10, }}>
                        <View style={{ flex: 2 }}>
                            <Text style={{ fontSize: 18 }}>Dịch vụ đã chọn</Text>
                        </View>

                        <View style={{ borderWidth: 1, }}></View>

                        <View style={{ flex: 5 }}>
                            <Text style={{ fontSize: 18, marginLeft: 5 }}>{props.route.params.service}</Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={{ borderWidth: 0.5 }}></View>

                <View style={{ padding: 12, flexDirection: 'row' }} >
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Thành tiền:  </Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'red' }}>{props.route.params.price} VNĐ</Text>
                </View>

            </View>



        </View>
    )
}





export default ChiTietLich;

const styles = StyleSheet.create({
    name: {
        fontSize: 30,
        shadowColor: 'black',
        elevation: 5,
        alignSelf: 'center',
        fontWeight: '700',
        textAlign: 'center',

    },
    address: {
        alignSelf: 'center',
        width: '80%',
        textAlign: 'center',
        marginTop: 10,

    },
    con: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 15,
        height: '70%'
    },
    time: {
        marginTop: 10,
        marginLeft: 10,
    }

})