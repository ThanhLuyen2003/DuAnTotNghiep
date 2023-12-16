import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, ImageBackground, Image, TouchableOpacity, FlatList } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Onboarding from 'react-native-onboarding-swiper';
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ip from "../IP";

const FindPro = (props) => {

    const [pro, setPro] = useState([]);

    const getList = async () => {
        let apiSalon = 'http://' + ip + ':3000/getProduct';

        try {
            const response = await fetch(apiSalon);
            const json = await response.json(); //chuyen du lieu thanh json

            setPro(json);// do du lieu vao state
        } catch (err) {
            console.error(err);
        }
    }

    const [donHang, setDonHang] = useState([]);


    const getDonHang = async () => {

        let apiSalon = 'http://' + ip + ':3000/getOrder';

        try {
            const response = await fetch(apiSalon);
            const json = await response.json(); //chuyen du lieu thanh json

            setDonHang(json);// do du lieu vao state
        } catch (err) {
            console.error(err);
        }
    }


    React.useEffect(() => {
        getList();
        getDonHang();
    }, [])

    const renderItem = ({ item }) => {
        if (item.price.length == 6) {
            price = (item.price.substring(0, 3) + '.' + item.price.substring(3, 6));

        } else
            if (item.price.length == 7) {
                price = (item.price.substring(0, 1) + '.' + item.price.slice(1, 4) + '.' + item.price.slice(4, 7));
            } else
                if (item.price.length == 8) {
                    price = (item.price.substring(0, 2) + '.' + item.price.slice(2, 5) + '.' + item.price.slice(5, 8));
                }
        let daBan = 0;

        donHang.forEach(element => {
            let pro = element.products;
            if (element.status == 'Đã giao hàng') {
                pro.forEach(pro => {
                    if (item.name == pro.name) {
                        daBan += Number(pro.quantity);
                    }
                })
            }
        });

        let conLai = item.soluongnhap - daBan;

        return (
            <View>
                <TouchableOpacity onPress={() => { props.navigation.navigate("ChiTietItemShop", { avatar: item.avatar, name: item.name, trademark: item.trademark, price: item.price, describe: item.describe, ingredient: item.ingredient, type: item.type, id: item._id, soLuong: conLai, }) }}>
                    <View style={styles.gridItem}>
                        <Image style={{ width: 180, height: 180, alignSelf: "center" }} source={{ uri: item.avatar }} />
                        <Text style={{ fontSize: 15 }} numberOfLines={2}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <Text style={{ fontSize: 15, color: "red" }} >{price} Đ</Text>
                            <Text style={{ marginRight: 20 }}>Đã bán: {daBan}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    const [searchTerm, setSearchTerm] = useState("")

    const filteredProducts = pro.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <View style={{ height: '100%' }}>

            <View style={styles.nav}>
                <FlatList data={filteredProducts} renderItem={renderItem} numColumns={2} />

            </View>

            <View style={styles.header}>
                <View style={styles.textInput}>
                    <Icons name="magnify" size={20} />
                    <TextInput onChangeText={(txt) => { setSearchTerm(txt) }} style={styles.text} placeholder="Tìm kiếm sản phẩm" />
                </View>
                <TouchableOpacity onPress={() => { props.navigation.navigate('TabGroupProduct') }}>
                    <Text style={styles.cancel}>Hủy</Text>
                </TouchableOpacity>
            </View>




        </View>

    );
}

export default FindPro;

const styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: '#778899',
        position: 'absolute',
        top: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',

    },
    nav: {
        height: 'auto',
        marginTop: 80
    },
    textInput: {
        width: "75%",
        backgroundColor: 'white',
        padding: 10,
        margin: 25,
        borderRadius: 20,
        height: 37,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        width: '85%',
        marginLeft: 8
    },
    cancel: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 18,
    },
    gridItem: {
        backgroundColor: "#fff",
        flex: 1,
        padding: 10,
        margin: 2,
        width: 210,
        fontSize: 12,
        padding: 5,
        margin: 1,
        width: 210,
        fontSize: 12,
        borderColor: "#F8F8FF",
        borderWidth: 1
    },
});
