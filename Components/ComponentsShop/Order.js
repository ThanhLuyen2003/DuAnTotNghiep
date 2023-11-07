import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Order = (props) => {

    const ip = "192.168.88.101";

    const [userInfor, setUserInfor] = useState({});
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState();
    const [message, setMessage] = useState("");
    let giaoHang = '35000';



    const today = new Date();

    const ngayMua = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    const gioMua = today.getHours() + ":" + today.getMinutes();

    const time = gioMua + " - " + ngayMua;

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

    let price2 = String(price);
    if (price2.length == 5) {
        price2 = (item.price.substring(0, 2) + '.' + price2.substring(2, 5));
    } else
        if (price2.length == 6) {
            price2 = (price2.substring(0, 3) + '.' + price2.substring(3, 6));

        } else
            if (price2.length == 7) {
                price2 = (price2.substring(0, 1) + '.' + price2.slice(1, 4) + '.' + price2.slice(4, 7));
            } else
                if (price2.length == 8) {
                    price2 = (price2.substring(0, 2) + '.' + price2.slice(2, 5) + '.' + price2.slice(5, 8));
                }




    const renderItem = (item) => {

        let price2 = ''
        if (item.price.length == 5) {
            price2 = (item.price.substring(0, 2) + '.' + item.price.substring(2, 5));
        } else
            if (item.price.length == 6) {
                price2 = (item.price.substring(0, 3) + '.' + item.price.substring(3, 6));

            } else
                if (item.price.length == 7) {
                    price2 = (item.price.substring(0, 1) + '.' + item.price.slice(1, 4) + '.' + item.price.slice(4, 7));
                } else
                    if (item.price.length == 8) {
                        price2 = (item.price.substring(0, 2) + '.' + item.price.slice(2, 5) + '.' + item.price.slice(5, 8));
                    }


        return (
            <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1 }}>
                <Image source={{ uri: item.image }} style={{ height: 100, width: 100 }} />

                <View style={{ alignSelf: 'center', width: "100%" }}>
                    <Text style={{ fontSize: 15, width: "75%", }}>{item.name}</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{price2} đ</Text>
                    <Text style={{ fontSize: 15, }}> x{item.quantity}</Text>

                </View>

            </View>
        )
    }

    let pay = String(price + Number(giaoHang));

    if (pay.length == 5) {
        pay = (pay.substring(0, 2) + '.' + pay.substring(2, 5));
    } else
        if (pay.length == 6) {
            pay = (pay.substring(0, 3) + '.' + pay.substring(3, 6));

        } else
            if (pay.length == 7) {
                pay = (pay.substring(0, 1) + '.' + pay.slice(1, 4) + '.' + pay.slice(4, 7));
            } else
                if (pay.length == 8) {
                    pay = (pay.substring(0, 2) + '.' + pay.slice(2, 5) + '.' + pay.slice(5, 8));
                }



    const datHang = () => {



        let url = 'http://' + ip + ':3000/addOrder';

        let obj = {
            idUser: userInfor._id,
            nameU: userInfor.name,
            phoneU: userInfor.phone,
            addressU: userInfor.address,
            message: message,
            price: pay,
            products: products,
            status: "Chờ lấy hàng",
            time: time
        }

        console.log(obj);

        if (userInfor.address == "") {
            alert("Cần cập nhật địa chỉ!");
            return;
        }

        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        }).catch((ex) => {
            console.log(ex);
        }).then(res => {
            if (res.status == 200) {

                products.forEach((item) => {

                    const url = 'http://' + ip + ':3000/delCart/' + item.idCart;

                    fetch(url, {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        }
                    })
                })

                alert('Đặt hàng thành công')
                props.navigation.navigate('Home');

            } else {
                alert("cut")
            }
        });

    }

    return (
        <View>
            <ScrollView style={{ height: "89%" }}>
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
                    <TextInput onChangeText={(txt) => { setMessage(txt) }} style={styles.input} placeholder='...' placeholderTextColor='black' />
                </View>


                <View style={styles.product}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Sản phẩm </Text>

                    <View key={products.map((item) => item.idPro)}>
                        {products.map((item) => renderItem(item))}
                    </View>
                </View>

                <View style={styles.note}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Phương thức thanh toán</Text>
                    <Text>Thanh toán khi nhận hàng</Text>
                </View>

                <View style={styles.note}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Thông tin đơn hàng</Text>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ padding: 5 }}>Tổng tiền hàng</Text>
                            <Text style={{ padding: 5 }}>Phí giao hàng</Text>
                            <Text style={{ padding: 5 }}>Khuyến mãi</Text>
                        </View>

                        <View>
                            <Text style={{ padding: 5 }}>{price2}đ </Text>
                            <Text style={{ padding: 5 }}>35.000đ </Text>
                            <Text style={{ padding: 5 }}>-0đ </Text>

                        </View>

                    </View>
                </View>



            </ScrollView>

            <View style={{ marginTop: '2%', height: '10%', backgroundColor: 'white', alignItems: 'flex-end', flexDirection: 'row-reverse', }}>


                <TouchableOpacity onPress={datHang} style={{ width: 80, backgroundColor: '#CD853F', height: '100%', alignItems: 'center' }}>
                    <Text style={{ marginTop: '32%' }}>Đặt hàng</Text>
                </TouchableOpacity>

                <Text style={{ marginBottom: 20, marginRight: 20, color: 'red' }}>{pay}đ</Text>

                <Text style={{ marginBottom: 20, marginRight: 10 }} >Tổng thanh toán: </Text>

            </View>

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