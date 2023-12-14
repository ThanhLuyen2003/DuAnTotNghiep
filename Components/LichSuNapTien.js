import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import ip from '../IP';
import { SafeAreaView } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LichSuNapTien = (props) => {
    const [billMoneyList, setBillMoneyList] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [showTongSoDu, setShowTongSoDu] = useState(false);
    const [searchDate, setSearchDate] = useState('');
    const positiveImageSource = require('../Images/imgHome/naptien.jpg'); // Thay đổi đường dẫn tới ảnh dương
    const negativeImageSource = require('../Images/imgHome/thanhtoan.jpg'); // Thay đổi đường dẫn tới ảnh âm
    const getList = async () => {
        const getBillMoneyUrl = `http://${ip}:3000/getBillMoney/${props.route.params.userId}`;

        try {
            const response = await fetch(getBillMoneyUrl);

            if (!response.ok) {
                console.error(`Server responded with an error: ${response.status} ${response.statusText}`);
                throw new Error(`Server responded with an error: ${response.status} ${response.statusText}`);
            }

            const json = await response.json();
            setBillMoneyList(json);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setisLoading(false);
        }
    };

    React.useEffect(() => {
        getList();

    }, []);

    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const renderItem = ({ item }) => {
        if (searchDate && !item.date.includes(searchDate)) {
            return null;
        }
        const amountStyle = item.soDu >= 0 ? styles.positiveAmount : styles.negativeAmount;
        const imageSource = item.soDu >= 0 ? positiveImageSource : negativeImageSource;
        return (
            <View style={{ margin: 5 }}>

                <View style={[{ flexDirection: "row", alignItems: "center", padding: 16 }, amountStyle]}>
                    <Image source={imageSource} style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 0.5 }} />
                    <View style={{ marginLeft: 20, width: "80%" }}>
                        <Text style={{ fontWeight: "bold" }}>{item.dichVu}</Text>
                        <Text style={{ color: "gray" }}>{item.time} - {item.date}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ color: "gray" }}>Số dư ví: {showTongSoDu ? formatCurrency(item.tongSoDu) : '******'}đ</Text>
                            <Text style={{ fontWeight: "bold" }}>{formatCurrency(item.soDu)}đ</Text>
                        </View>

                    </View>
                </View>

            </View>
        )
    }

    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, height: 80, alignItems: "center", backgroundColor: "#778899", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Icons name='magnify' size={25} style={{ position: "absolute", left: 15 }} />
                    <TextInput style={{ width: 320, height: 40, borderWidth: 1, borderColor: "white", borderRadius: 10, paddingLeft: 40, }} placeholderTextColor='white' placeholder='Tìm kiếm giao dịch theo ngày' onChangeText={(text) => setSearchDate(text)} />
                </View>
                <TouchableOpacity onPress={() => setShowTongSoDu(!showTongSoDu)}>
                    <Icons name={showTongSoDu ? 'eye' : 'eye-off'} size={20} color={'black'} />
                </TouchableOpacity>
            </View>
            {
                isLoading ? (
                    <ActivityIndicator style={{ marginTop: 300, alignSelf: 'center' }} />
                ) : (

                    billMoneyList.length === 0 ? (

                        <View >
                            <Icon name='calendar-text' size={100} style={{ alignSelf: "center", marginTop: 200 }} />
                            <Text style={{ textAlign: 'center', marginTop: 10 }}>Chưa có lịch sử nạp tiền nào</Text>
                        </View>
                    ) : (

                        <FlatList style={{ height: '90%' }} data={billMoneyList} renderItem={renderItem} />
                    )
                )
            }
        </View>
    )
}

export default LichSuNapTien

const styles = StyleSheet.create({
    positiveAmount: {
        backgroundColor: 'white',
    },
    negativeAmount: {
        backgroundColor: 'white',
    },


})