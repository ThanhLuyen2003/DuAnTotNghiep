import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from "react";



const ComfirmData = (props) => {

    const ip = '192.168.88.104';

    const [address, setaddress] = useState();
    const [day, setday] = useState();
    const [hour, setHour] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [image, setImage] = useState();
    const [userInfo, setuserInfo] = useState({});
    const [idSalon, setIdSalon] = useState();

    const getData = async () => {

        const m_address = await AsyncStorage.getItem('address');
        const m_name = await AsyncStorage.getItem('name');
        const m_image = await AsyncStorage.getItem('image');
        const m_phone = await AsyncStorage.getItem('phone');
        const m_day = await AsyncStorage.getItem('day');
        const m_hour = await AsyncStorage.getItem('hour');
        const m_idSalon = await AsyncStorage.getItem('idSalon');
        const value = await AsyncStorage.getItem('loginInfo');

        setuserInfo(JSON.parse(value))
        setHour(m_hour);
        setday(m_day);
        setaddress(m_address);
        setImage(m_image);
        setPhone(m_phone);
        setName(m_name);
        setIdSalon(m_idSalon);

    }

    const addBill = () => {

        let obj = {
            nameSalon: name,
            addressSalon: address,
            hour: hour,
            day: day,
            phone: phone,
            imageSalon: image,
            services: props.route.params.content,
            price: props.route.params.price,
            status: "Đang chờ",
            idUser: userInfo._id
        }

        let obj2 = {
            idSalon: idSalon,
            hour: hour,
            day: day,
            idServices: props.route.params.idService,
            idUser: userInfo._id
        }

        let url = 'http://' + ip + ':3000/addBill';
        let url2 = 'http://' + ip + ':3000/addBillDetail';


        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        }).catch((ex) => {
            console.log(ex);

        })
            .then(res => {
                if (res.status == 200) {

                    fetch(url2, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(obj2)
                    }).catch((ex) => {
                        console.log(ex);
                    }).then(res => {
                        if (res.status == 200) {
                            alert("Đặt lịch thành công")
                            props.navigation.navigate('Home');
                        }
                    });

                }
            });
    }


    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getData();
        });

        return unsubscribe;
    }, [props.navigation]);

    return (
        <View style={{ backgroundColor: 'white', height: '100%', padding: 20, }}>

            <Text style={styles.name} >{name}</Text>

            <Text style={styles.address}>{address}</Text>

            <View style={styles.con}>

                <View style={styles.time}>
                    <Text style={{ fontWeight: 'bold' }}>Thời gian:  {hour}  /  {day} |   SĐT: {phone}</Text>
                </View>

                <View style={{ borderWidth: 0.5, marginTop: 10 }}></View>

                <ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: 5, padding: 10, }}>
                        <View style={{ flex: 2 }}>
                            <Text style={{ fontSize: 18 }}>Dịch vụ đã chọn</Text>
                        </View>

                        <View style={{ borderWidth: 1, }}></View>

                        <View style={{ flex: 5 }}>
                            <Text style={{ fontSize: 18, marginLeft: 5 }}>{props.route.params.content}</Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={{ borderWidth: 0.5 }}></View>

                <View style={{ padding: 12, flexDirection: 'row' }} >
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Thành tiền:  </Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'red' }}>{props.route.params.price} VNĐ</Text>
                </View>

            </View>

            <TouchableOpacity onPress={addBill} style={{ marginTop: '3%', backgroundColor: '#CD853F', width: '90%', height: 40, borderRadius: 10, alignItems: 'center', alignSelf: 'center', }}  >
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