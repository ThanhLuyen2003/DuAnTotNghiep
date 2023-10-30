import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Order = (props) => {

    const [userInfor, setUserInfor] = useState({});
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState();

    const getLoginInfor = async () => {

        const user = await AsyncStorage.getItem('loginInfo');
        setUserInfor(JSON.parse(user))

    }


    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getLoginInfor();
            setProducts(props.route.params.products);
            setPrice(props.route.params.price);
        });

        return unsubscribe;
    }, [props.navigation]);



    return (
        <View>
            <ScrollView>
                <View style={styles.address}>
                    <View style={{ flexDirection: 'row' }}>

                        <Text style={{ fontSize: 20, fontWeight: '500', width: '65%' }} >Thông tin nhận hàng</Text>

                        <TouchableOpacity style={{ alignSelf: 'center', borderWidth: 1, padding: 3 }}>
                            <Text>Thay đổi địa chỉ</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '30%' }}>
                            <Text style={{ padding: 5 }}>Họ tên</Text>
                            <Text style={{ padding: 5 }}>Số điện thoại</Text>
                            <Text style={{ padding: 5 }}>Email</Text>
                            <Text style={{ padding: 5 }}>Địa chỉ</Text>
                        </View>

                        <View>
                            <Text style={{ padding: 5 }}>{userInfor.name} </Text>
                            <Text style={{ padding: 5 }}>{userInfor.phone} </Text>
                            <Text style={{ padding: 5 }}>{userInfor.email} </Text>
                            <Text style={{ padding: 5, width: '90%' }}>{userInfor.address} </Text>

                        </View>

                    </View>


                </View>

                <View style={styles.note}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Ghi chú đơn hàng</Text>
                    <TextInput style={styles.input} placeholder='...' placeholderTextColor='black' />
                </View>


                <View style={styles.product}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Sản phẩm </Text>

                </View>


            </ScrollView>

        </View>
    )
}

export default Order;

const styles = StyleSheet.create({
    address: {
        backgroundColor: 'white',
        padding: 10
    },
    note: {
        backgroundColor: 'white',
        marginTop: 5,
        padding: 10,
    },
    input: {
        backgroundColor: '#C0C0C0',
        height: 'auto',
        padding: 8,
    },
    product: {
        backgroundColor: 'white',
        marginTop: 5,
        padding: 10
    }

})