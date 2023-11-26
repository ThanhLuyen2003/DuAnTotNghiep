import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';


const ChiTietHoaDonNap = (props) => {
    console.log(props.route.params);
    return (
        <View>
            <Text>Số tiền vừa nạp {props.route.params.amountToDeposit}</Text>
        </View>
    )
}

export default ChiTietHoaDonNap

const styles = StyleSheet.create({})