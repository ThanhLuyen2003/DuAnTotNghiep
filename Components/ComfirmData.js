import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from "react";


const ComfirmData = (props) => {

    const [address, setaddress] = useState();
    const [day, setday] = useState();
    const [hour, setHour] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [describe, setDescribe] = useState();

    const getData = async () => {

        const m_address = await AsyncStorage.getItem('address');
        const m_name = await AsyncStorage.getItem('name');
        const m_describe = await AsyncStorage.getItem('describe');
        const m_phone = await AsyncStorage.getItem('phone');
        const m_day = await AsyncStorage.getItem('day');
        const m_hour = await AsyncStorage.getItem('hour');

        setHour(m_hour);
        setday(m_day);
        setaddress(m_address);
        setDescribe(m_describe);
        setPhone(m_phone);
        setName(m_name);
    }


    React.useEffect(() => {
        getData();
    }, [])

    return (
        <View style={{ backgroundColor: 'white', height: '100%', padding: 20, }}>

            <Text style={styles.name} >{name}</Text>

            <Text style={styles.address}>{address}</Text>

            <View style={styles.con}>

                <View style={styles.time}>
                    <Text style={{ fontWeight: 'bold' }}>Thời gian:  {hour}  /  {day} </Text>
                </View>
                <View style={{ borderWidth: 0.5, marginTop: 10 }}></View>

                <ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: 5, padding: 10, }}>
                        <View style={{ flex: 2 }}>
                            <Text style={{ fontSize: 18 }}>Dịch vụ đã chọn</Text>
                        </View>

                        <View style={{ flex: 3 }}>
                            <Text style={{ fontSize: 18 }}>{props.route.params.content}</Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={{ borderWidth: 0.5 }}></View>

                <View style={{ padding: 12, flexDirection: 'row' }} >
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Thành tiền:  </Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'red' }}>{props.route.params.price} VNĐ</Text>
                </View>

            </View>

            <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={{ marginTop: '3%', backgroundColor: '#CD853F', width: '90%', height: 40, borderRadius: 10, alignItems: 'center', alignSelf: 'center', }}  >
                <Text style={{ color: 'white', fontSize: 20, marginTop: 5 }}>Xác nhận</Text>
            </TouchableOpacity>



        </View>
    )
}

export default ComfirmData;

const styles = StyleSheet.create({
    name: {
        fontSize: 30,
        shadowColor: 'black',
        elevation: 5,
        alignSelf: 'center',
        fontWeight: '700',
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