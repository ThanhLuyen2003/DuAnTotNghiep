import React from "react";
import { View, Image, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, Button } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Cart = (props) => {

    const [isLoading, setisLoading] = useState(true);
    const [data, setdata] = useState([]);

    const getList = async () => {


        let api = 'http://192.168.88.103:3000/getCart/' + props.route.params.id;

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

    const renderItem = ({ item, index }) => {


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

                <TouchableOpacity
                    onPress={() => selectedItemm(item, index)}
                >
                    <View style={{ flexDirection: 'row' }}  >

                        <View style={{ marginRight: 5, alignSelf: 'center', height: 20, width: 20, borderWidth: 1 }}>
                            <Icon style={{ alignSelf: 'center' }} name={(item.selected) ? 'check' : ''} size={20} />

                        </View>

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

                </TouchableOpacity>

                <TouchableOpacity>

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
                    (data.length == 0)
                        ? (<Text style={{ marginTop: 300, alignSelf: 'center' }}>Giỏ hàng rỗng</Text>)
                        : <FlatList data={data} renderItem={renderItem} />

                }
            </View>

            <View style={stylee.order}>

                <TouchableOpacity style={{ height: '100%', backgroundColor: 'aqua', flex: 2 }} onPress={tinhTien}>
                    <Text style={{ alignSelf: 'center', marginTop: 20 }}>Tính tiền</Text>
                </TouchableOpacity>

                <View style={{ flex: 2 }}></View>

                <Text style={{ flex: 4, fontSize: 15 }}>Tạm tính: {tamTinh} đ</Text>

                <TouchableOpacity style={{ height: '100%', width: "auto", backgroundColor: '#CD853F', flex: 2 }}>
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