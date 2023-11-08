import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ip from '../../IP';

const DaHuyLich = (props) => {



    const [isLoading, setIsLoading] = useState(false);
    const [dataLich, setDataLich] = useState([]);

    const id = props.route.params.id;

    const getList = async () => {


        let api = 'http://' + ip + ':3000/getBill/' + id + '/Đã hủy lịch';


        try {
            const response = await fetch(api);
            const json = await response.json(); //chuyen du lieu thanh json

            setDataLich(json);// do du lieu vao state
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false); // khong con load nua
        }
    }

    React.useEffect(() => {
        // cập nhật giao diện ở đây
        getList();


    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={{ borderWidth: 1, marginBottom: 10, borderRadius: 20 }}>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: '600' }}>{item.day} </Text>
                    <Text style={{ fontWeight: '600', width: '50%' }}>  /   {item.hour} </Text>

                    <View style={styles.status}>
                        <Text style={{ color: 'white' }}>{item.status} </Text>

                    </View>
                </View>

                <View style={styles.con1}>

                    <Image source={{ uri: item.imageSalon }} style={{ width: 100, height: 100, borderRadius: 10 }} />

                    <View style={{ marginLeft: 10 }}>

                        <Text style={{ marginTop: 10 }}>{item.nameSalon}</Text>
                        <Text style={{ marginTop: 10, width: '75%' }}>{item.addressSalon}</Text>
                        <Text style={{ marginTop: 10 }}>{item.phone}</Text>

                    </View>


                </View>





            </View>
        )
    }


    return (
        <View style={{ padding: 10 }}>

            {isLoading
                ? <ActivityIndicator style={{ alignSelf: "center", marginTop: 200 }} />
                : dataLich.length == 0
                    ? <Image style={{ width: 100, height: 100, alignSelf: "center", marginTop: 200 }} source={require('../ComponentsDonHang/document_icon.png')} />
                    : <FlatList data={dataLich} renderItem={renderItem} />
            }

        </View>
    )
}

export default DaHuyLich;

const styles = StyleSheet.create({
    status: {
        backgroundColor: 'red',
        padding: 5,
        width: 100,
        alignItems: 'center',
        borderRadius: 5
    },
    con1: {
        borderTopWidth: 1,
        flexDirection: 'row',
        padding: 10
    },
    con2: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        padding: 10
    },
    but1: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'red',
        height: 35,
        borderRadius: 20
    },
    but2: {
        flex: 1,
        alignItems: 'center',
        borderColor: 'orange',
        height: 35,
        borderRadius: 20,
        borderWidth: 1
    }
})
