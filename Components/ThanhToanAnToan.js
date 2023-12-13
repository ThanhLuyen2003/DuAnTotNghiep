import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ip from '../IP';

const ThanhToanAnToan = (props) => {
    const [isDone, setIsDone] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordEntered, setIsPasswordEntered] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);

    const toggleModal = () => setModalVisible(!isModalVisible);

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

    const checkPassword = () => {
        const enteredPassword = password;
        if (enteredPassword.length < 8) {
            alert('Mật khẩu phải có ít nhất 8 ký tự');
        } else if (enteredPassword !== props.route.params.pass) {
            alert('Mật khẩu không đúng');
        } else {
            handleDeposit();
        }
    };

    const handleDeposit = async () => {
        setIsDone(true);

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
                        soDu: `+${depositAmount}`,
                        date: formattedDate,
                        time: formattedTime,
                        tongSoDu: newTotalBalance,
                        dichVu: 'Nạp tiền vào ví từ PolyBank',
                    }),
                });

                if (billMoneyResponse.ok) {
                    const billMoneyResult = await billMoneyResponse.json();
                    const billMoneyId = billMoneyResult._id;

                    await AsyncStorage.setItem('totalBalance', newTotalBalance.toString());

                    setIsDone(false);
                    setModalVisible(false);

                    props.navigation.navigate('ChiTietHoaDonNap', {
                        currentDate: formattedDate,
                        currentTime: formattedTime,
                        depositedAmount: depositAmount,
                        billId: billMoneyId,
                        dichVu: 'Nạp tiền vào ví từ PolyBank',
                    });
                    
                } else {
                    console.error('Creating BillMoney failed:', billMoneyResponse.status, billMoneyResponse.statusText);
                }
            } else {
                console.error('Nạp tiền không thành công', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error', error.message);
            alert(`Nạp tiền không thành công: ${error.message}`);
        }
    };

    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.paymentContainer}>
                    <View style={styles.paymentRow}>
                        <Text style={styles.grayText}>Dịch vụ:</Text>
                        <Text style={styles.boldText}>Nạp tiền vào Ví Barber</Text>
                    </View>
                    <View style={styles.paymentRow}>
                        <Text style={styles.grayText}>Nguồn tiền:</Text>
                        <Text style={styles.boldText}>MBBank</Text>
                    </View>
                    <View style={styles.paymentRow}>
                        <Text style={styles.grayText}>Số tiền:</Text>
                        <Text style={styles.boldText}>{formatCurrency(depositAmount)}đ</Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.paymentRow}>
                        <Text style={styles.grayText}>Phí giao dịch:</Text>
                        <Text style={styles.boldText}>Miễn phí</Text>
                    </View>
                </View>
                <View style={styles.securityContainer}>
                    <Icons name='security' size={50} color={'gray'} />
                    <Text style={styles.grayText}>Bảo mật SSL/TLS, mọi thông tin giao dịch đều được mã hóa an toàn.</Text>
                </View>
            </ScrollView>

            <View style={styles.totalAmountContainer}>
                <Text style={styles.totalAmountText}>Tổng tiền:</Text>
                <Text style={styles.boldText}>{formatCurrency(depositAmount)}đ</Text>
            </View>

            <TouchableOpacity style={styles.opacitybtn} onPress={toggleModal}>
                <Text style={styles.btnText}>Xác nhận</Text>
            </TouchableOpacity>

            <Modal
                animationType='fade'
                visible={isDone}
                transparent={true}
            >
                <View style={styles.loadingContainer}>
                    <ActivityIndicator />
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={toggleModal} style={styles.closeButton}></TouchableOpacity>
                    <Text style={styles.modalHeaderText}>Nhập mật khẩu</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={handlePasswordChange}
                        keyboardType='numeric'
                    />
                    <TouchableOpacity
                        style={[styles.opacitybtn, { opacity: isPasswordEntered ? 1 : 0.5 }]}
                        onPress={checkPassword}
                        disabled={!isPasswordEntered}
                    >
                        <Text style={styles.btnText}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

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
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
    },
    closeButton: {
        width: "30%",
        height: 6,
        backgroundColor: "gray",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    modalHeaderText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
        marginBottom: 20,
    },
    modalView: {
        padding: 20,
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
        alignItems: "center",
    },
    input: {
        width: "90%",
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 16,
        marginLeft: "5%",
    },
    loadingContainer: {
        padding: 40,
        backgroundColor: 'black',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        borderRadius: 20,
        opacity: 0.7,
    },
    paymentContainer: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 10,
    },
    paymentRow: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 10,
        padding: 10,
    },
    separator: {
        width: "95%",
        height: 1,
        borderWidth: 1,
        borderColor: "gray",
        marginLeft: 10,
        backgroundColor: "gray",
    },
    grayText: {
        color: "gray",
    },
    boldText: {
        fontWeight: "bold",
    },
    securityContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
    },
    totalAmountContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        height: 50,
        marginLeft: 16,
        marginRight: 16,
    },
    totalAmountText: {
        fontWeight: "bold",
        fontSize: 18,
    },
    btnText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default ThanhToanAnToan;
