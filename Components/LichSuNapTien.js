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

    console.log(props.route.params);

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
        return (
            <View style={{ flex: 1, padding: 16 }}>

                <View style={{ flexDirection: "row", alignItems: "center", borderBottomColor: "gray", borderBottomWidth: 0.5 }}>
                    <Icons name='cash-fast' size={60} color={'#CD853F'} style={{ borderRadius: 20 }} />
                    <View style={{ marginLeft: 20, width: "80%" }}>
                        <Text style={{ fontWeight: "bold" }}>Nạp tiền vào ví từ BankPoly</Text>
                        <Text style={{ color: "gray" }}>{item.time} - {item.date}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ color: "gray" }}>Số dư ví: {showTongSoDu ? formatCurrency(item.tongSoDu) : '******'}đ</Text>
                            <Text style={{ fontWeight: "bold" }}>+{formatCurrency(item.soDu)}đ</Text>
                        </View>

                    </View>
                </View>

            </View>
        )
    }

    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, height: 80, alignItems: "center", backgroundColor: "#CD853F", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Icons name='magnify' size={25} style={{ position: "absolute", left: 15 }} />
                    <TextInput style={{ width: 320, height: 40, borderWidth: 1, borderColor: "gray", borderRadius: 10, paddingLeft: 40 }} placeholder='tìm kiếm giao dịch' />
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
                            <Icon name='calendar-text' size={100} style={{alignSelf:"center",marginTop:200}}/>
                            <Text style={{ textAlign: 'center', marginTop: 10 }}>Chưa có lịch sử nạp tiền nào</Text>
                        </View>
                    ) : (

                        <FlatList data={billMoneyList} renderItem={renderItem} />
                    )
                )
            }
        </View>
    )
}

export default LichSuNapTien

const styles = StyleSheet.create({})