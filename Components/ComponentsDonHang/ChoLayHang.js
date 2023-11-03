import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChoLayHang = (props) => {

    const [donhang, setDonhang] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const ip = "192.168.0.103";

    const id = props.route.params.id;


    const getList = async () => {


        let api = 'http://' + ip + ':3000/getOrder/' + id + '/Chờ lấy hàng';


        try {
            const response = await fetch(api);
            const json = await response.json(); //chuyen du lieu thanh json

            setDonhang(json);// do du lieu vao state
        } catch (err) {
            console.error(err);
        } finally {
            setisLoading(false); // khong con load nua
        }
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getList();
        });

        return unsubscribe;
    }, [props.navigation]);

    console.log(donhang);

    return (
        <View>



        </View>
    )
}

export default ChoLayHang

const styles = StyleSheet.create({})