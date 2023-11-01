import React from "react";
import { View, Image, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, Button, Alert } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Cart = (props) => {

    const [isLoading, setisLoading] = useState(true);
    const [data, setdata] = useState([]);

    const ip = "192.168.88.101";


    const getList = async () => {


        let api = 'http://' + ip + ':3000/getCart/' + props.route.params.id;

        try {
            const response = await fetch(api);
            const json = await response.json(); //chuyen du lieu thanh json

            setdata(json);// do du lieu vao state
        } catch (err) {
            console.error(err);
        } finally {
            setisLoading(false); // khong con load nua
        }

    }



    const [tamTinh, setTamTinh] = useState(0);

    selectedItemm = (item, index) => {

        const newData = data.map((e, index) => {

            if (item._id == e._id) {
                return {
                    ...e,
                    selected: !e.selected,
                }
            }
            return {
                ...e,
                selected: e.selected
            }



        })

        setdata(newData);


    }

    const tinhTien = () => {
        const listSelected = data.filter(item => item.selected == true);

        let price = '0';


        listSelected.forEach((item, index) => {
            price = Number(price) + (Number(item.pricePro) * Number(item.quantity));
        })

        setTamTinh(price)
    }

    const Order = () => {

        const listSelected = data.filter(item => item.selected == true);

        let price = '0';
        let products = [];

        listSelected.forEach((item, index) => {
            price = Number(price) + (Number(item.pricePro) * Number(item.quantity));
            products.push({ name: item.namePro, price: item.pricePro, quantity: item.quantity, image: item.imagePro, idPro: item.idPro });
        })

        if (price == 0) {
            alert('Vui lòng chọn sản phẩm')
            return
        }

        props.navigation.navigate('Order', { price, products });



    }


    const renderItem = ({ item, index }) => {


        const deleteCart = () => {


            const url = 'http://' + ip + ':3000/delCart/' + item._id;

            Alert.alert("Delete!!!", "Bạn có muộn xóa?", [
                {
                    text: 'Yes',
                    onPress: () => {


                        fetch(url, {
                            method: 'DELETE',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            }
                        })
                            .then((res) => {
                                if (res.status == 200) {
                                    alert("Đã xóa");
                                    getList();
                                }
                            })
                            .catch((ex) => {
                                console.log(ex);
                            });

                        getList();

                    }
                },
                {
                    text: 'No',
                    style: "cancel"
                }
            ], {
                cancelable: true,
            }
            )
        }


        const minus = () => {

            if (item.quantity == 1) {
                return;
            }

            item.quantity = Number(item.quantity) - 1;

            const newData = data.map((e, index) => {

                if (item._id == e._id) {
                    return {
                        ...e,
                    }
                }
                return {
                    ...e,
                }

            })

            setdata(newData);

        }

        const plus = () => {

            item.quantity = Number(item.quantity) + 1;

            const newData = data.map((e, index) => {

                if (item._id == e._id) {
                    return {
                        ...e,
                    }
                }
                return {
                    ...e,
                }



            })

            setdata(newData);
        }




        return (
            <View
                style={{ width: '100%', margin: 5, padding: 5, backgroundColor: 'white' }}
            >


                <View style={{ flexDirection: 'row', }}  >
                    <TouchableOpacity style={{ alignSelf: 'center' }}
                        onPress={() => selectedItemm(item, index)}
                    >
                        <View style={{ marginRight: 5, height: 20, width: 20, borderWidth: 1 }}>
                            <Icon style={{}} name={(item.selected) ? 'check' : ''} size={20} />

                        </View>
                    </TouchableOpacity>

                    <Image source={{ uri: item.imagePro }} style={{ height: 100, width: 100, marginRight: 10 }} />

                    <View>
                        <Text style={{ width: '60%' }}>{item.namePro}</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.pricePro} đ</Text>

                        <View style={{ flexDirection: 'row', marginTop: 20, borderColor: 'black', borderWidth: 1, alignItems: 'center', alignSelf: 'stretch', width: 100, borderRadius: 5, }}>

                            <TouchableOpacity onPress={minus}>
                                <Icon style={{ marginLeft: 7 }} name='minus' size={20} />
                            </TouchableOpacity>

                            <View style={{ borderColor: 'black', height: '100%', width: 30, borderRightWidth: 1, borderLeftWidth: 1, alignItems: 'center', marginLeft: 5, marginRight: 8, borderRadius: 3 }}>
                                <Text style={{ marginTop: 3, marginLeft: 2 }}>{item.quantity} </Text>
                            </View>

                            <TouchableOpacity onPress={plus}>
                                <Icon name='plus' size={20} />
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>


                <TouchableOpacity onPress={deleteCart}>

                    <Icon style={{ position: 'absolute', right: 20, bottom: 10 }} size={30} name="delete" />

                </TouchableOpacity>

            </View>
        )
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getList();
        });

        return unsubscribe;
    }, [props.navigation]);




    return (
        <View style={{ height: '100%' }}>
            <View style={{ height: '90%' }}>
                {
                    (isLoading)
                        ? (<ActivityIndicator style={{ marginTop: 300 }} />)
                        : ((data.length == 0)
                            ? (<Text style={{ marginTop: 300, alignSelf: 'center' }}>Giỏ hàng rỗng</Text>)
                            : <FlatList data={data} renderItem={renderItem} />)

                }
            </View>

            <View style={stylee.order}>

                <TouchableOpacity style={{ height: '100%', backgroundColor: 'aqua', flex: 2 }} onPress={tinhTien}>
                    <Text style={{ alignSelf: 'center', marginTop: 20 }}>Tính tiền</Text>
                </TouchableOpacity>

                <View style={{ flex: 2 }}></View>

                <Text style={{ flex: 4, fontSize: 15 }}>Tạm tính: {tamTinh} đ</Text>

                <TouchableOpacity onPress={Order} style={{ height: '100%', width: "auto", backgroundColor: '#CD853F', flex: 2 }}>
                    <Text style={{ alignSelf: 'center', marginTop: 20 }}>Đặt hàng</Text>
                </TouchableOpacity>

            </View>



        </View>
    )
}

export default Cart;

const stylee = StyleSheet.create({
    order: {
        position: 'absolute',
        bottom: 0,
        height: 60,
        backgroundColor: 'white',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    }
})