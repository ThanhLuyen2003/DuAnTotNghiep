import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ip from '../../IP';

const DaGiao = (props) => {
    const [donhang, setDonhang] = useState([]);
    const [isLoading, setisLoading] = useState(true);


    const id = props.route.params.id;


    const getList = async () => {


        let api = 'http://' + ip + ':3000/getOrder/' + id + '/Đã giao hàng';


        try {
            const response = await fetch(api);
            const json = await response.json(); //chuyen du lieu thanh json

            setDonhang(json);// do du lieu vao state
        } catch (err) {
            console.error(err);
        } finally {
            setisLoading(false); // khong con load nua
        }
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getList();
        });

        return unsubscribe;
    }, [props.navigation]);


    const renderItem = ({ item }) => {

        const product = item.products;

        return (
            <TouchableOpacity
                style={{ backgroundColor: 'white', marginBottom: 10, padding: 10 }}
                onPress={() => props.navigation.navigate('DonHangHoanThanh',
                    { name: item.nameU, address: item.addressU, phone: item.phoneU, message: item.message, price: item.price, time: item.time, product: product, id: item._id })}
            >

                <Text style={styles.status}>{item.status}</Text>

                <View style={{ flexDirection: 'row', margin: 5 }}>
                    <Image source={{ uri: product[0].image }} style={{ height: 100, width: 100 }} />

                    <View style={{ alignSelf: 'center', width: "100%", marginLeft: 15 }}>

                        <Text style={{ fontSize: 15, width: "75%", }}>{product[0].name}</Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{product[0].price} đ</Text>
                        <Text style={{ fontSize: 15, }}> x{product[0].quantity}</Text>

                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '50%' }}>
                        <Text>Cùng {product.length - 1} sản phẩm khác nữa </Text>

                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <Text>Thành tiền:</Text>
                        <Text > {item.price} đ</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )

    }
    return (

        <View>
            {isLoading
                ? <ActivityIndicator style={{ alignSelf: "center", marginTop: 200 }} />
                : donhang.length == 0
                    ? <View >
                        <Image style={{ width: 100, height: 100, alignSelf: "center", marginTop: 200 }} source={require('./document_icon.png')} />
                        <Text style={{ textAlign: 'center', marginTop: 10 }}>Chưa có đơn hàng nào</Text>
                    </View>
                    : <FlatList data={donhang} renderItem={renderItem} />
            }
        </View>

    )
}

export default DaGiao

const styles = StyleSheet.create({
    status: {
        alignSelf: 'flex-end', marginRight: 30,
        color: 'green',
    }
})