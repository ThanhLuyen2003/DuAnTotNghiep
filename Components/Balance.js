import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native';
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
            pass:userInfor.pass
        });
    };
    
  
    return (
        <View style={styles.container}>
            
            
            <ScrollView>
              <View style={styles.contai}>
                <Text style={{marginLeft:10,marginBottom:10}}>Nạp tiền vào</Text>
                <Text style={{width: "90%",height: 50,borderColor: '#CD853F', borderWidth: 1,borderRadius: 8,paddingLeft: 10,marginLeft:"5%"}}>hi</Text>

               <Text style={{marginLeft:25}}>Số tiền cần nạp</Text>
            <TextInput
                style={styles.input}
                placeholder='Số tiền nạp'
                value={formatCurrency(amountToDeposit)}
                onChangeText={(txt) => setAmountToDeposit(formatCurrency(txt))}
                keyboardType='numeric'
            />
            </View>  
            </ScrollView>
            
            
            <TouchableOpacity style={styles.opacitybtn} onPress={showDepositConfirmation}>
                <Text>Nạp tiền</Text>
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
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 16,
        marginLeft:"5%"
    },
    contai:{
        width:"100%",
        backgroundColor:"white",
        borderRadius:10
    },
    opacitybtn:{

        width:"100%",
        height:50,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#CD853F",
        borderRadius:10
    }
});

export default Balance;

