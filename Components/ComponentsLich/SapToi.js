import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ip from '../../IP';
import * as Notifications from 'expo-notifications';

const SapToi = (props) => {



    const [isLoading, setIsLoading] = useState(false);
    const [dataLich, setDataLich] = useState([]);

    const id = props.route.params.id;

    const getList = async () => {


        let api = 'http://' + ip + ':3000/getBill/' + id + '/Sắp tới';


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

        async function scheduleAndCancel() {

            await Notifications.cancelAllScheduledNotificationsAsync();
        }


        const huyLich = async () => {

            Alert.alert("Cảnh báo!!!", "Bạn chắc chắn muốn hủy lịch?", [
                {
                    text: 'Hủy lịch',
                    onPress: async () => {

                        await scheduleAndCancel();

                        let api = 'http://' + ip + ':3000/huyBill/' + item._id;

                        fetch(api, {
                            method: 'PUT',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                        }).then((res) => {
                            if (res.status == '200') {
                                alert("Hủy lịch thành công");
                                getList();

                            } else {
                                alert("Xảy ra lỗi!");
                            }
                        })

                    }
                },
                {
                    text: 'Không',
                    style: "cancel"
                }
            ], {
                cancelable: true,
            }
            )
        }


        const chiTiet = () => {

            props.navigation.navigate('ChiTietLich', {
                name: item.nameSalon,
                address: item.addressSalon,
                day: item.day,
                hour: item.hour,
                price: item.price,
                service: item.services,
                phone: item.phone
            })

        }
        return (
            <View style={{ borderWidth: 1, marginBottom: 10, borderRadius: 20 }}>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: '600' }}>{item.day} </Text>
                    <Text style={{ fontWeight: '600', width: '55%' }}>  /   {item.hour} </Text>

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

                <View style={styles.con2}>

                    <TouchableOpacity onPress={huyLich} style={styles.but1}>
                        <Text style={{ marginTop: 8, color: 'white' }}>Hủy lịch</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 0.1 }}></View>

                    <TouchableOpacity onPress={chiTiet} style={styles.but2}>
                        <Text style={{ marginTop: 8, color: 'orange' }}>Xem chi tiết</Text>
                    </TouchableOpacity>

                </View>



            </View>
        )
    }


    return (
        <View style={{ padding: 10 }}>

            {isLoading
                ? <ActivityIndicator style={{ alignSelf: "center", marginTop: 200 }} />
                : dataLich.length == 0
                    ? <View >
                        <Image style={{ width: 100, height: 100, alignSelf: "center", marginTop: 200 }} source={require('../ComponentsDonHang/document_icon.png')} />
                        <Text style={{ textAlign: 'center', marginTop: 10 }}>Chưa có lịch</Text>
                    </View>
                    : <FlatList data={dataLich} renderItem={renderItem} />
            }

        </View>
    )
}

export default SapToi;

const styles = StyleSheet.create({
    status: {
        backgroundColor: 'orange',
        padding: 5,
        width: 80,
        alignItems: 'center',
        borderRadius: 5
    },
    con1: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
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
        backgroundColor: 'orange',
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
