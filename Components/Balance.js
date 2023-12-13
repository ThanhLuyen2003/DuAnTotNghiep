import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

const Balance = (props) => {
    const [amountToDeposit, setAmountToDeposit] = useState('');
    const [userInfor, setUserInfor] = useState({});
    const [saveImage, setsaveImage] = useState({});
    const [totalBalance, setTotalBalance] = useState(0);

    const getLoginInfor = async () => {
        const user = await AsyncStorage.getItem('loginInfo');
        const m_saveImage = await AsyncStorage.getItem('savedImage')
        const m_totalBalance = await AsyncStorage.getItem('totalBalance')
        setUserInfor(JSON.parse(user))
        setTotalBalance(parseFloat(m_totalBalance) || 0);
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getLoginInfor();
        });
        return unsubscribe;
    }, [props.navigation]);

    const formatCurrency = (value) => {
        return value.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const isAmountValid = () => {
        const depositAmount = parseFloat(amountToDeposit.replace(/,/g, ''));
        return !isNaN(depositAmount) && depositAmount >= 10000 && depositAmount <= 50000000;
    };

    const showDepositConfirmation = () => {
        const depositAmount = parseFloat(amountToDeposit.replace(/,/g, ''));
        if (isNaN(depositAmount)) {
            console.error('Số tiền gửi đi không hợp lệ');
            return setAmountToDeposit("");
        } else if (depositAmount < 10000) {
            Alert.alert("Lỗi", "Số tiền bạn nạp phải trên 10.000đ");
            return;
        } else if (depositAmount > 50000000) {
            Alert.alert("Lỗi", "Số tiền bạn nạp đã quá mức cho phép. Vui lòng thử lại!!!");
            return;
        }
        props.navigation.navigate("ThanhToanAnToan", {
            userId: userInfor._id,
            name: userInfor.name,
            phone: userInfor.phone,
            email: userInfor.email,
            depositAmount: depositAmount,
            pass: userInfor.pass
        });
        setAmountToDeposit("");
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.contai}>
                    <Text style={{ marginLeft: 10, marginBottom: 10 }}>Nạp tiền vào</Text>
                    <TouchableOpacity>
                        <View style={styles.balanceContainer}>
                            <Image style={styles.balanceImage} source={require('../Images/Barbershop.png')} />
                            <Text>Ví BarberPay: </Text>
                            <Text style={{ fontWeight: "bold" }}>{formatCurrency(totalBalance)}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 25, marginTop: 5 }}>Số tiền cần nạp</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Số tiền nạp'
                        value={formatCurrency(amountToDeposit)}
                        onChangeText={(txt) => setAmountToDeposit(formatCurrency(txt))}
                        keyboardType='numeric'
                    />
                </View>

                <Text style={{ padding: 16, fontWeight: "bold", fontSize: 20 }}>Tiện ích</Text>
                <View style={styles.utilityContainer}>
                    <View style={styles.utilityText}>
                        <Image style={styles.balanceImage} source={require('../Images/Barbershop.png')} />
                        <Text style={{ marginLeft: 5 }}>Barber cam kết bảo mật thông tin và giao dịch an toàn.</Text>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={[styles.opacitybtn, { opacity: isAmountValid() ? 1 : 0.5 }]}
                onPress={isAmountValid() ? showDepositConfirmation : null}
                disabled={!isAmountValid()}
            >
                <Text style={styles.btnText}>Nạp tiền</Text>
            </TouchableOpacity>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    contai: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
    },
    balanceContainer: {
        width: "90%",
        height: 50,
        borderColor: '#CD853F',
        borderWidth: 2,
        borderRadius: 8,
        paddingLeft: 10,
        marginLeft: "5%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFCC66",
    },
    balanceImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    input: {
        width: "90%",
        height: 50,
        borderColor: '#CD853F',
        borderWidth: 2,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 16,
        marginLeft: "5%",
    },
    utilityContainer: {
        width: "100%",
        padding: 16,
        backgroundColor: "#B0E2FF",
        borderRadius: 10,
        marginBottom: 16,
    },
    utilityText: {
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
    },
    opacitybtn: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#CD853F",
        borderRadius: 10,
    },
    btnText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
});


export default Balance;

