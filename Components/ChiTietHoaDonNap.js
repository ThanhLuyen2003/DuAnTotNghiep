import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';


const ChiTietHoaDonNap = (props) => {
    console.log(props.route.params);
    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <View style={{ width: "100%", height: "100%" }}>
            <View style={{ flexDirection: "row", width: "100%", height: 60, backgroundColor: "#CD853F", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 23 }}>Kết Quả Giao Dịch</Text>
            </View>
            <View style={{ padding: 16 }}>
                <View style={{ width: "100%", height: 100, backgroundColor: "white", alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>Nạp tiền thành công</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>{formatCurrency(props.route.params.depositedAmount)}đ</Text>
                    <View><Text style={{ color: "gray" }}>------------------------------------------------------------------------------------------</Text></View>
                </View>
                <View style={{ width: "100%", backgroundColor: "white", borderRadius: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10, padding: 10 }}>
                        <Text style={{ color: "gray" }}>Dịch vụ/ Cửa hàng</Text>
                        <Text style={{ fontWeight: "bold" }}>Nạp tiền vào Ví </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10, padding: 10 }}>
                        <Text style={{ color: "gray" }}>Thời gian thanh toán</Text>
                        <Text style={{ fontWeight: "bold" }}>{props.route.params.currentTime} - {props.route.params.currentDate}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10, padding: 30, alignItems: "center" }}>
                        <TouchableOpacity onPress={()=>{props.navigation.navigate("Balance")}} style={{ width: "50%", alignItems: "center", justifyContent: "center", height: 50, borderRadius: 10, borderColor: "gray", borderWidth: 1, marginRight: 5 }}>
                            <View >
                                <Text style={{ fontWeight: "bold" }}>Tạo giao dịch mới</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{props.navigation.navigate("Home")}} style={{ width: "50%", alignItems: "center", justifyContent: "center", height: 50, borderRadius: 10, borderColor: "gray", borderWidth: 1, marginRight: 5 }}>
                        <View>
                            <Text style={{ color: "#CD853F", fontWeight: "bold" }}>Màn hình chính</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>




        </View>
    )
}

export default ChiTietHoaDonNap

const styles = StyleSheet.create({})