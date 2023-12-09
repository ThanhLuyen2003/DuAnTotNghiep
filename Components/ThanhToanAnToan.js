import { StyleSheet, Text, View, Modal, TextInput, Alert } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import ip from '../IP';
import { useEffect } from 'react';
import { ActivityIndicator } from "react-native";
const ThanhToanAnToan = (props) => {
    const [isDone, setIsDone] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [totalBalance, setTotalBalance] = useState(0);
    const [isPasswordEntered, setIsPasswordEntered] = useState(false);
    let dichVu = "Nạp tiền vào ví từ PolyBank";
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const handlePasswordChange = (text) => {
        setPassword(text);
        setIsPasswordEntered(!!text.trim());
    };


    useEffect(() => {
        const fetchTotalBalance = async () => {
            try {
                const storedTotalBalance = await AsyncStorage.getItem('totalBalance');
                if (storedTotalBalance !== null) {
                    setTotalBalance(parseFloat(storedTotalBalance));
                }
            } catch (error) {
                console.error('Error fetching total balance:', error.message);
            }
        };

        fetchTotalBalance();
    }, []);


    const depositAmount = parseFloat(props.route.params.depositAmount);
    const checkpass = () => {
        const enteredPassword = password;
        if (enteredPassword.length < 8) {
            Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 8 ký tự');
            return;
        }
        const correctPassword = props.route.params.pass;
        if (enteredPassword === correctPassword) {
            addMoney();
        } else {
            Alert.alert('Lỗi', 'Mật khẩu không đúng');
        }
    };

    const addMoney = async () => {
        setIsDone(true)
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
               
                const currentDate = new Date();
                const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
                const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
                const billMoneyUrl = `http://${ip}:3000/addBillMoney/${props.route.params.userId}`;
                const newTotalBalance = totalBalance + depositAmount;
                setTotalBalance(newTotalBalance);
                const billMoneyResponse = await fetch(billMoneyUrl, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                        soDu: "+" + depositAmount,
                        date: formattedDate,
                        time: formattedTime,
                        tongSoDu: newTotalBalance,
                        dichVu:dichVu
                    }),
                });
                const billMoneyResult = await billMoneyResponse.json();
                const billMoneyId = billMoneyResult._id;
                if (billMoneyResponse.ok) {
                    console.log('BillMoney created:', billMoneyResult);
                    // console.log(billMoneyId);
                } else {
                    console.error('Creating BillMoney failed:', billMoneyResponse.status, billMoneyResponse.statusText);
                }

                await AsyncStorage.setItem('totalBalance', newTotalBalance.toString());
                Alert.alert('Thông báo', 'Nạp tiền thành công');
                setIsDone(false)
                setModalVisible(false);
                props.navigation.navigate('ChiTietHoaDonNap', { currentDate: formattedDate, currentTime: formattedTime, depositedAmount: depositAmount, billId: billMoneyId,dichVu:dichVu });
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
                            <Text style={{ color: "gray" }}>Dịch vụ:</Text>
                            <Text style={{ fontWeight: "bold" }}>Nạp tiền vào Ví Barber</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10, padding: 10 }}>
                            <Text style={{ color: "gray" }}>Nguồn tiền:</Text>
                            <Text style={{ fontWeight: "bold" }}>MBBank</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10, padding: 10 }}>
                            <Text style={{ color: "gray" }}>Số tiền:</Text>
                            <Text style={{ fontWeight: "bold" }}>{formatCurrency(depositAmount)}đ</Text>
                        </View>
                        <View style={{ width: "95%", height: 1, borderWidth: 1, borderColor: "gray", marginLeft: 10, backgroundColor: "gray" }}></View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10, padding: 10 }}>
                            <Text style={{ color: "gray" }}>Phí giao dịch:</Text>
                            <Text style={{ fontWeight: "bold" }}>Miễn phí</Text>
                        </View>

                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                        <Icons name='security' size={50} color={'gray'} />
                        <Text style={{ color: "gray" }}>Bảo mật SSL/TLS, mọi thông tin{"\n"}giao dịch đều được mã hóa an toàn.</Text>
                    </View>
                </View>

            </ScrollView>

            <View style={{ width: "100%", height: 1, borderWidth: 0.5, borderColor: "gray" }}></View>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", height: 50, marginLeft: 16, marginRight: 16 }}>
                <Text>Tổng tiền:</Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>{formatCurrency(depositAmount)}đ</Text>
            </View>
            <Modal
                        animationType='fade'
                        visible={isDone}
                        transparent={true}
                    >
                        <View style={{ padding: 40, backgroundColor: 'black', marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', borderRadius: 20, opacity: 0.7 }}>
                            <ActivityIndicator />
                        </View>
                    </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(!isModalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={toggleModal} style={{ width: "30%", height: 6, backgroundColor: "gray", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>

                    </TouchableOpacity>

                    <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}>Nhập mật khẩu</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={handlePasswordChange}
                        keyboardType='numeric'
                    />
                    <TouchableOpacity
                        style={[styles.opacitybtn, { opacity: isPasswordEntered ? 1 : 0.5 }]}
                        onPress={checkpass}
                        disabled={!isPasswordEntered}
                    >
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>

            </Modal>

            <TouchableOpacity style={styles.opacitybtn} onPress={toggleModal}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Xác nhận</Text>
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
        marginLeft: 16, marginRight: 16,


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
        alignItems: "center"
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