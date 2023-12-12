import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';


const ChiTietDonHang = (props) => {

    const [product, setProduct] = useState([]);

    const renderItem = (item) => {

        return (

            <View key={item.name} style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1 }}>
                <Image source={{ uri: item.image }} style={{ height: 100, width: 100 }} />

                <View style={{ alignSelf: 'center', width: "100%", marginLeft: 10 }}>
                    <Text style={{ fontSize: 15, width: "75%", }}>{item.name}</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.price} đ</Text>
                    <Text style={{ fontSize: 15, }}> x{item.quantity}</Text>

                </View>

            </View>
        )
    }

    React.useEffect(() => {
        setProduct(props.route.params.product);

    }, []);

    return (
        <ScrollView>

            <View style={styles.address}>

                <View style={{ flexDirection: 'row' }}>
                    <Icons name='map-marker' size={25} />

                    <Text style={{ fontSize: 20, fontWeight: '500', width: '65%', marginLeft: 10 }} >Thông tin nhận hàng</Text>

                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ width: '30%' }}>
                        <Text style={{ padding: 5 }}>Họ tên</Text>
                        <Text style={{ padding: 5 }}>Số điện thoại</Text>
                        <Text style={{ padding: 5 }}>Địa chỉ</Text>
                    </View>

                    <View>
                        <Text style={{ padding: 5 }}>{props.route.params.name} </Text>
                        <Text style={{ padding: 5 }}>{props.route.params.phone} </Text>
                        <Text style={{ padding: 5, width: '60%' }}>{props.route.params.address} </Text>

                    </View>

                </View>



            </View>

            <View style={styles.product}>
                <Text style={{ fontSize: 20, fontWeight: '500' }}>Sản phẩm </Text>

                <View >
                    {product.map((item) => renderItem(item))}
                </View>


                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 5 }}>
                    <Text style={{ width: '70%', fontSize: 18 }}>Thành tiền:</Text>
                    <Text style={{ color: 'red', fontSize: 18 }}> {props.route.params.price} đ</Text>
                </View>

                {
                    props.route.params.note == "Thanh toán khi nhận hàng"
                        ? <Text>Vui lòng thanh toán {props.route.params.price}đ sau khi nhận hàng </Text>

                        : <Text>Đơn hàng đã thanh toán</Text>
                }


            </View>

            <View style={styles.cc}>
                <View style={{ width: '40%' }}>
                    <Text style={{ padding: 5 }}>Mã đơn hàng</Text>
                    <Text style={{ padding: 5 }}>Thời gian đặt hàng</Text>
                </View>

                <View>
                    <Text style={{ padding: 5 }}>{props.route.params.id} </Text>
                    <Text style={{ padding: 5 }}>{props.route.params.time} </Text>

                </View>

            </View>



            <View style={{ height: 100 }}></View>

        </ScrollView>
    )
}

export default ChiTietDonHang

const styles = StyleSheet.create({
    address: {
        backgroundColor: 'white',
        padding: 10
    },
    product: {
        backgroundColor: 'white',
        marginTop: 5,
        padding: 10
    },
    cc: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white',
        marginTop: 5,
        padding: 10
    }
})