import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import ip from '../IP';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

const Balance = (props) => {
    const [amountToDeposit, setAmountToDeposit] = useState('');
    const [balance, setBalance] = useState(0);
    const [userInfor, setUserInfor] = useState({});
    const [saveImage, setsaveImage] = useState({});
    const [totalBalance, settotalBalance] = useState(0)

    const getLoginInfor = async () => {
        const user = await AsyncStorage.getItem('loginInfo');
        const m_saveImage = await AsyncStorage.getItem('savedImage')
        const m_totalBalance = await AsyncStorage.getItem('totalBalance')

        setUserInfor(JSON.parse(user))
        settotalBalance(parseFloat(m_totalBalance));
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getLoginInfor();


        });

        return unsubscribe;
    }, [props.navigation]);

    const formatCurrency = (value) => {
        return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const showConfirmationDialog = () => {
        Alert.alert('Xác nhận nạp tiền',
            `Bạn có chắc chắn muốn nạp ${formatCurrency(amountToDeposit)} VNĐ không?`,
            [
                {
                    text: 'Cancle',
                    style: 'cancel',

                }, {
                    text: 'Ok',
                    onPress: () => addMoney(),


                },
                {
                    cancelable: false
                }
            ]
        )
    };

    const showDepositConfirmation = () => {
        Alert.alert(
            'Nạp tiền thành công',
            `Nạp tiền ${formatCurrency(amountToDeposit)} VNĐ thành công!`,
            [
                {
                    text: 'Cancle',
                    style: 'cancel',

                },
                {
                    text: 'Xem chi tiết hóa đơn',
                    onPress: () => { props.navigation.navigate("ChiTietHoaDonNap", { id: userInfor._id, name: userInfor.name, phone: userInfor.phone, email: userInfor.email, amountToDeposit: amountToDeposit }) },
                },

            ]

        )
    };

    const addMoney = async () => {
        try {
            const userId = props.route.params.id;
            const depositAmount = parseFloat(amountToDeposit.replace(/,/g, ''));
            if (isNaN(depositAmount)) {
                console.error('Số tiền gửi đi không hợp lệ');
                return setAmountToDeposit("");
            } else if (depositAmount > 1) {
                alert("Số tiền bạn nạp phải trên 100.000đ")
                return
            } else if (depositAmount < 50000000) {
                alert("Số tiền bạn nạp đã quá mức cho phép vui lòng thử lại!!!")
                return
            }
            const url_api = `http://${ip}:3000/apiuser/depositMoney/${userId}`;
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
                const newBalance = result.user.balance;

                //Lưu trữ trước khi xóa 
                const storedDepositAmount = depositAmount;

                //Cập nhật trạng thái và lưu tổng số dư vào bộ nhớ mới
                setBalance(newBalance);
                setAmountToDeposit('');
                showDepositConfirmation();
                //lấy tổng số dư từ bộ nhớ lưu trữ
                const storedTotalBalance = await AsyncStorage.getItem('totalBalance');

                // Tính tổng số dư mới để lưu
                const newTotalBalance = storedTotalBalance
                    ? parseFloat(storedTotalBalance) + storedDepositAmount
                    : storedDepositAmount;
                //Lưu tổng số dư mới vào bộ nhớ

                await AsyncStorage.setItem('totalBalance', newTotalBalance.toString());


            } else {
                console.error('Nạp tiền không thành công', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error', error);
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Số tiền nạp'
                value={formatCurrency(amountToDeposit)}
                onChangeText={(txt) => setAmountToDeposit(formatCurrency(txt))}
                keyboardType='numeric'
            />
            <Button title="Add Money" onPress={showConfirmationDialog} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    balanceText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: "50%",
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 16,
    },
});

export default Balance;

