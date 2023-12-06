import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import ip from '../IP';
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
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
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
            alert("Số tiền bạn nạp phải trên 10.000đ")
            return
        } else if (depositAmount > 50000000) {
            alert("Số tiền bạn nạp đã quá mức cho phép vui lòng thử lại!!!")
            return
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
                        <View style={{ width: "90%", height: 50, borderColor: '#CD853F', borderWidth: 2, borderRadius: 8, paddingLeft: 10, marginLeft: "5%", flexDirection: "row", alignItems: "center", backgroundColor: "#FFCC66" }}>
                            <Image style={{ width: 40, height: 40, borderRadius: 50 }} source={require('../Images/Barbershop.png')} />
                            <Text>Ví Barber: </Text>
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
                <View style={{ width: "100%", padding: 16, backgroundColor: "#B0E2FF", borderRadius: 10 }}>
                    <View style={{ flexDirection: "row", width: "90%", alignItems: "center" }}>
                        <Image style={{ width: 40, height: 40, borderRadius: 50 }} source={require('../Images/Barbershop.png')} />
                        <Text style={{ marginLeft: 5 }}>Barber cam kết bảo mật thông tin và giao dịch an toàn.</Text>
                    </View>

                </View>
            </ScrollView>
            <TouchableOpacity
                style={[styles.opacitybtn, { opacity: isAmountValid() ? 1 : 0.5 }]}
                onPress={isAmountValid() ? showDepositConfirmation : null}
                disabled={!isAmountValid()}
            >
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>Nạp tiền</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    balanceText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: "90%",
        height: 50,
        borderColor: '#CD853F',
        borderWidth: 2,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 16,
        marginLeft: "5%"
    },
    contai: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10
    },
    opacitybtn: {

        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#CD853F",
        borderRadius: 10
    }
});

export default Balance;

