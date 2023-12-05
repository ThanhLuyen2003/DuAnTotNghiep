import { StyleSheet, Text, View, Modal, TextInput, Alert } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import ip from '../IP';
const ThanhToanAnToan = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const depositAmount = parseFloat(props.route.params.depositAmount);
    const checkpass = () => {
        const enteredPassword = password;
        const correctPassword = props.route.params.pass;
        if (enteredPassword === correctPassword) {
            addMoney();
        } else {
            Alert.alert('Lỗi', 'Mật khẩu không đúng');
        }
    };
    const addMoney = async () => {
        try {
            const url_api = `http://${ip}:3000/apiuser/depositMoney/${props.route.params.userId}`;
            const response = await fetch(url_api, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: depositAmount }),
            });
            if (response.ok) {
                const result = await response.json();
                Alert.alert('Thông báo', 'Nạp tiền thành công');
                const currentDate = new Date();


                const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
                const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
                
                props.navigation.navigate('ChiTietHoaDonNap',{currentDate: formattedDate,currentTime: formattedTime,depositedAmount: depositAmount,});
            } else {
                console.error('Nạp tiền không thành công', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error', error.message);
            Alert.alert('Lỗi', `Nạp tiền không thành công: ${error.message}`);
        }
    };



    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <View style={{ width: "100%", height: "98%" }}>
            <ScrollView style={{ width: "100%", height: "90%", }}>
                <View style={{ flex: 1, padding: 16, }}>
                    <View style={{ width: "100%", backgroundColor: "white", borderRadius: 10, borderColor: "gray", borderWidth: 1 }}>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10, padding: 10 }}>
                            <Text>Dịch vụ:</Text>
                            <Text >Nạp tiền vào Ví Barber</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10, padding: 10 }}>
                            <Text>Nguồn tiền:</Text>
                            <Text >MBBank</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10, padding: 10 }}>
                            <Text>Số tiền:</Text>
                            <Text >{formatCurrency(depositAmount)}</Text>
                        </View>
                        <View style={{ width: "95%", height: 1, borderWidth: 1, borderColor: "gray", marginLeft: 10 }}></View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10, padding: 10 }}>
                            <Text>Phí giao dịch:</Text>
                            <Text >Miễn phí</Text>
                        </View>

                    </View>
                </View>

            </ScrollView>

            <View style={{ width: "100%", height: 1, borderWidth: 1, borderColor: "gray" }}></View>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", height: 50, marginLeft: 16, marginRight: 16 }}>
                <Text>Tổng tiền:</Text>
                <Text style={{ fontWeight: "bold", fontSize: 25 }}>{formatCurrency(depositAmount)}</Text>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(!isModalVisible);
                }}
            >


                <View style={styles.modalView}>
                    <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}>Nhập mật khẩu</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity onPress={toggleModal}>
                        <Text>Hide Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.opacitybtn} onPress={checkpass}>
                        <Text>Xác nhận</Text>
                    </TouchableOpacity>
                </View>

            </Modal>

            <TouchableOpacity style={styles.opacitybtn} onPress={toggleModal}>
                <Text>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ThanhToanAnToan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    opacitybtn: {


        width: "90%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#CD853F",
        borderRadius: 10,
        marginLeft: 16, marginRight: 16
    },
    centeredView: {
        flex: 1,
    },
    modalView: {

        padding: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: "auto",
        flex: 0.7,
    },
    input: {
        width: "90%",
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 16,
        marginLeft: "5%"
    },
})