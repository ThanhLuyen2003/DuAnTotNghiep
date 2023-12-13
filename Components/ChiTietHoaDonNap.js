import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChiTietHoaDonNap = (props) => {
    console.log(props.route.params);
    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Kết Quả Giao Dịch</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.resultContainer}>
                    <Icons name='check-circle-outline' size={60} color={'green'} style={styles.checkIcon} />
                    <Text style={styles.successText}>Nạp tiền thành công</Text>
                    <Text style={styles.amountText}>{formatCurrency(props.route.params.depositedAmount)}đ</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <Text style={styles.grayText}>Dịch vụ/ Cửa hàng</Text>
                        <Text style={styles.boldText}>Nạp tiền vào Ví</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.grayText}>Thời gian thanh toán</Text>
                        <Text style={styles.boldText}>{props.route.params.currentTime} - {props.route.params.currentDate}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.grayText}>Chi tiết giao dịch</Text>
                        <Text style={styles.boldText}>{props.route.params.billId}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Balance")} style={styles.button}>
                            <Text style={styles.buttonText}>Tạo giao dịch mới</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Home")} style={[styles.button, { borderColor: "#CD853F" }]}>
                            <Text style={[styles.buttonText, { color: "#CD853F" }]}>Màn hình chính</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        width: "100%",
        height: 60,
        backgroundColor: "#CD853F",
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 23,
    },
    content: {
        padding: 16,
        flex: 1,
    },
    resultContainer: {
        width: "100%",
        height: 100,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    checkIcon: {
        borderRadius: 20,
        position: "absolute",
        bottom: 70,
    },
    successText: {
        fontWeight: "bold",
    },
    amountText: {
        fontWeight: "bold",
        fontSize: 20,
    },
    detailsContainer: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 20,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 10,
        padding: 10,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 10,
        padding: 30,
        alignItems: "center",
    },
    button: {
        width: "48%",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
    },
    buttonText: {
        fontWeight: "bold",
    },
    grayText: {
        color: "gray",
    },
    boldText: {
        fontWeight: "bold",
    },
});

export default ChiTietHoaDonNap;
