import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from "react";



const ChiTietLich = (props) => {

    const [content, setContent] = useState(props.route.params.service);

    const renderItem = (item) => {
        return (

            <View key={item.name} style={{ flexDirection: 'row', margin: 5 }}>

                <View style={{ flex: 4, textAlign: 'center' }}>
                    <Text style={{ marginLeft: 10 }}>- {item.name}</Text>
                </View>

                <View style={{ flex: 2, }}>
                    <Text style={{ textAlign: 'center' }} >{item.price}</Text>

                </View>

            </View>
        )
    }

    const fomatPrice = (pay) => {

        if (pay.length == 5) {
            pay = (pay.substring(0, 2) + '.' + pay.substring(2, 5));
        } else
            if (pay.length == 6) {
                pay = (pay.substring(0, 3) + '.' + pay.substring(3, 6));

            } else
                if (pay.length == 7) {
                    pay = (pay.substring(0, 1) + '.' + pay.slice(1, 4) + '.' + pay.slice(4, 7));
                } else
                    if (pay.length == 8) {
                        pay = (pay.substring(0, 2) + '.' + pay.slice(2, 5) + '.' + pay.slice(5, 8));
                    }
        return pay;
    }

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
                        <View style={{ flex: 4 }}>
                            <Text style={{ fontSize: 18, }}>Dịch vụ đã chọn</Text>
                        </View>


                        <View style={{ flex: 2 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center' }}>Giá</Text>
                        </View>
                    </View>

                    <View>
                        {content.map((item) => renderItem(item))}
                    </View>


                </ScrollView>

                <View style={{ borderWidth: 0.5 }}></View>

                <View style={{ padding: 12, flexDirection: 'row' }} >
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Thành tiền:  </Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'red' }}>{fomatPrice(props.route.params.price)} VNĐ</Text>
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