import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Order = (props) => {

    const [userInfor, setUserInfor] = useState({});

    const getLoginInfor = async () => {

        const user = await AsyncStorage.getItem('loginInfo');
        setUserInfor(JSON.parse(user))

    }


    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getLoginInfor();
        });

        return unsubscribe;
    }, [props.navigation]);



    return (
        <View>
            <ScrollView>
                <View style={styles.address}>
                    <View style={{ flexDirection: 'row' }}>

                        <Text style={{ fontSize: 20, fontWeight: '500', width: '65%' }} >Thông tin nhận hàng</Text>

                        <TouchableOpacity style={{ alignSelf: 'center', borderWidth: 0.5, padding: 2 }}>
                            <Text>Thay đổi địa chỉ</Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </ScrollView>

        </View>
    )
}

export default Order;

const styles = StyleSheet.create({
    address: {
        backgroundColor: 'white',
        padding: 10
    }

})