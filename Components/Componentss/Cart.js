import React from "react";
import { View, Image, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Cart = (props) => {

    const [isLoading, setisLoading] = useState(true);
    const [data, setdata] = useState({});



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

    const renderItem = ({ item }) => {

        //const [soLuong, setSoLuong] = useState(item.quantity);

        var num = Number(item.quantity);

        const minus = () => {

            if (num == 1) {
                return;
            }
            num = num - 1;

            console.log(num);

        }

        const plus = () => {
            item.quantity = Number(item.quantity) + 1;
        }

        return (
            <View style={{ width: '100%', margin: 5, backgroundColor: 'white', padding: 5 }}>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: item.imagePro }} style={{ height: 100, width: 100 }} />

                        <View>
                            <Text style={{ width: '70%' }}>{item.namePro}</Text>
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

            </View>
        )
    }

    React.useEffect(() => {

        getList();

    }, [])

    return (
        <View>
            {
                (isLoading)
                    ? (<ActivityIndicator style={{ marginTop: 300, }} />)
                    : <FlatList style={{ height: '100%' }} data={data} renderItem={renderItem} />

            }


        </View>
    )
}

export default Cart;