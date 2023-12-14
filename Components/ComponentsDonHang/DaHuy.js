import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ip from '../../IP';

const DaHuy = (props) => {
    const [donhang, setDonhang] = useState([]);
    const [isLoading, setisLoading] = useState(true);


    const id = props.route.params.id;


    const getList = async () => {


        let api = 'http://' + ip + ':3000/getOrder/' + id + '/Hủy đơn';


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

    const fomatPrice = (pay) => {
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
        return pay;
    }

    const renderItem = ({ item }) => {

        const product = item.products;

        return (
            <TouchableOpacity
                style={{ backgroundColor: 'white', marginBottom: 10, padding: 10 }}
            >

                <Text style={styles.status}>Đã hủy</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: product[0].image }} style={{ height: 100, width: 100 }} />

                    <View style={{ alignSelf: 'center', width: "100%", marginLeft: 15 }}>

                        <Text style={{ fontSize: 15, width: "75%", }}>{product[0].name}</Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{fomatPrice(product[0].price)} đ</Text>
                        <Text style={{ fontSize: 15, }}> x{product[0].quantity}</Text>

                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '50%' }}>
                        <Text>Cùng {product.length - 1} sản phẩm khác nữa </Text>

                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <Text>Thành tiền:</Text>
                        <Text style={{ color: 'red' }}> {item.price} đ</Text>
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

export default DaHuy

const styles = StyleSheet.create({
    status: {
        alignSelf: 'flex-end', marginRight: 30,
        color: 'red',
    }
})