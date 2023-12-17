import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ip from '../../IP';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { Modal } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Button } from 'react-native';

const Order = (props) => {


    const [userInfor, setUserInfor] = useState({});
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState();
    const [message, setMessage] = useState("");
    let giaoHang = '35000';
    let dichVu = "Thanh toán ví BarberPay"
    const [isDone, setisDone] = useState(false)


    const today = new Date();

    const ngayMua = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    const gioMua = today.getHours() + ":" + today.getMinutes();

    const time = gioMua + " - " + ngayMua;


    const [totalBalance, settotalBalance] = useState(0);


    const getLoginInfor = async () => {
        const m_totalBalance = await AsyncStorage.getItem('totalBalance')
        const user = await AsyncStorage.getItem('loginInfo');

        setUserInfor(JSON.parse(user))
        settotalBalance(parseFloat(m_totalBalance));

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
            <View key={item.idPro} style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1 }}>
                <Image source={{ uri: item.image }} style={{ height: 100, width: 100 }} />

                <View style={{ alignSelf: 'center', width: "100%", marginLeft: 5 }}>
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
            status: "Có đơn",
            time: time,
            note: "Thanh toán khi nhận hàng"
        }

        console.log(obj);

        if (userInfor.address == "") {
            alert("Cần cập nhật địa chỉ!");
            return;
        }
        setisDone(true)

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

                setisDone(false)
                alert('Đặt hàng thành công')
                props.navigation.navigate('Home');

            } else {
                alert("cut")
            }
        });

    }

    const radioButtons = useMemo(() => ([
        {
            id: '1',
            label: 'Thanh toán khi nhận hàng',
        },
        {
            id: '2',
            label: 'Ví BarberPay',
        }
    ]), []);



    const [selectedId, setSelectedId] = useState("");

    const hi = () => {
        alert("Chọn phương thức thanh toán");
    }

    const BarberPay = async () => {

        if (userInfor.address == "") {
            alert("Cần cập nhật địa chỉ!");
            return;
        }

        let pay2 = String(price + Number(giaoHang));

        if (Number(pay2) > totalBalance) {
            Alert.alert("Không đủ tiền trong ví", "Bạn có muốn nạp thêm tiền?", [
                {
                    text: "Ok",
                    onPress: () => {
                        props.navigation.navigate('Balance')
                    },
                },
                {
                    text: "Hủy",
                    style: "cancel"
                }
            ])

        } else {
            Alert.alert("", "Xác nhận thanh toán bằng ví BarberPay?", [
                ,
                {
                    text: "Hủy",

                },
                {
                    text: "Thanh toán",
                    onPress: async () => {
                        const tienConLai = totalBalance - Number(pay2);
                        setisDone(true)

                        console.log(tienConLai);

                        try {
                            await AsyncStorage.setItem('totalBalance', tienConLai.toString());

                        } catch (e) {
                            console.log(e);
                        }

                        const url = 'http://' + ip + ':3000/changeBalance/' + userInfor._id + '/' + tienConLai;

                        fetch(url, {
                            method: 'PUT',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                        }).then((res) => {
                            if (res.status == '200') {

                                const url = 'http://' + ip + ':3000/addBillMoney/' + userInfor._id;

                                const obj = {
                                    idUser: userInfor._id,
                                    soDu: "-" + Number(pay2),
                                    date: ngayMua,
                                    time: gioMua,
                                    tongSoDu: tienConLai,
                                    dichVu: dichVu
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

                                        let url = 'http://' + ip + ':3000/addOrder';

                                        let obj = {
                                            idUser: userInfor._id,
                                            nameU: userInfor.name,
                                            phoneU: userInfor.phone,
                                            addressU: userInfor.address,
                                            message: message,
                                            price: pay,
                                            products: products,
                                            status: "Có đơn",
                                            time: time,
                                            note: "Đã thanh toán"
                                        }

                                        console.log(obj);

                                        if (userInfor.address == "") {
                                            alert("Cần cập nhật địa chỉ!");
                                            return;
                                        }
                                        setisDone(true)

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

                                                setisDone(false)
                                                alert('Đặt hàng thành công')
                                                props.navigation.navigate('Home');

                                            } else {
                                                alert("cut")
                                            }
                                        });

                                    }
                                })


                            } else {
                                alert("Xảy ra lỗi!");
                            }
                        })


                    }
                }
            ])


        }

    }


    return (
        <View>

            <Modal
                animationType='fade'
                visible={isDone}
                transparent={true}
            >
                <View style={{ padding: 40, backgroundColor: 'black', marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', borderRadius: 20, opacity: 0.7 }}>

                    <ActivityIndicator />
                </View>
            </Modal>

            <ScrollView style={{ height: "89%" }}>
                <View style={styles.address}>
                    <View style={{ flexDirection: 'row' }}>

                        <Text style={{ fontSize: 20, fontWeight: '500', width: '65%' }} >Thông tin nhận hàng</Text>

                        <TouchableOpacity
                            onPress={() => { props.navigation.navigate('EditProfile') }}
                            style={{ alignSelf: 'center', borderWidth: 1, padding: 3 }}>
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
                            <Text style={{ padding: 5, width: '60%' }}>{userInfor.address} </Text>

                        </View>

                    </View>


                </View>

                <View style={styles.note}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Ghi chú đơn hàng</Text>
                    <TextInput onChangeText={(txt) => { setMessage(txt) }} style={styles.input} placeholder='...' placeholderTextColor='black' />
                </View>


                <View style={styles.product}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Sản phẩm </Text>

                    <View >
                        {products.map((item) => renderItem(item))}
                    </View>
                </View>

                <View style={styles.note}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Phương thức thanh toán</Text>

                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={setSelectedId}
                        selectedId={selectedId}
                        containerStyle={styles.radio}
                    />
                </View>


                <View style={styles.note}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Thông tin đơn hàng</Text>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ padding: 5 }}>Tổng tiền hàng</Text>
                            <Text style={{ padding: 5 }}>Phí giao hàng</Text>
                        </View>

                        <View>
                            <Text style={{ padding: 5 }}>{price2}đ </Text>
                            <Text style={{ padding: 5 }}>35.000đ </Text>

                        </View>

                    </View>
                </View>


            </ScrollView>
            <View style={{ marginTop: '2%', height: '10%', backgroundColor: 'white', alignItems: 'flex-end', flexDirection: 'row-reverse', }}>


                {selectedId == ""
                    ?
                    <TouchableOpacity onPress={hi} style={{ width: 80, backgroundColor: '#CD853F', height: '100%', alignItems: 'center' }}>
                        <Text style={{ marginTop: '32%', color: 'white' }}>Đặt hàng</Text>
                    </TouchableOpacity>

                    :
                    selectedId == "1"
                        ?
                        <TouchableOpacity onPress={datHang} style={{ width: 80, backgroundColor: '#CD853F', height: '100%', alignItems: 'center' }}>
                            <Text style={{ marginTop: '32%', color: 'white' }}>Đặt hàng</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={BarberPay} style={{ width: 80, backgroundColor: '#CD853F', height: '100%', alignItems: 'center' }}>
                            <Text style={{ marginTop: '32%', color: 'white' }}>Đặt hàng</Text>
                        </TouchableOpacity>
                }

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
    },
    radio: {
        alignItems: 'flex-start',
        marginTop: 5
    }

})