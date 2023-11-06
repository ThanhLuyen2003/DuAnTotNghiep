import React from "react";
import { View, Image, StyleSheet, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, } from "react-native";
import { useState } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChonSalon = (props) => {

    const [dssl, setDssl] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const ip = "192.168.0.102";


    const getList = async () => {

        let apiSalon = 'http://' + ip + ':3000/apisalon/salon';

        try {
            const response = await fetch(apiSalon);
            const json = await response.json(); //chuyen du lieu thanh json

            setDssl(json);// do du lieu vao state
        } catch (err) {
            console.error(err);
        } finally {
            setisLoading(false); // khong con load nua
        }
    }


    service = async (item) => {

        try {
            await AsyncStorage.setItem('idSalon', item._id);

            await AsyncStorage.setItem('name', item.name);
            await AsyncStorage.setItem('address', item.address);
            await AsyncStorage.setItem('image', item.image);
            await AsyncStorage.setItem('phone', item.phone);

            props.navigation.navigate('ChonDichVu');

        } catch (e) {
            console.log(e);
        }
    }


    const renderSalon = ({ item }) => {

        return (
            <View  >
                <TouchableOpacity onPress={() => service(item)} style={stylee.container}  >

                    <Image source={{ uri: item.image }} style={{ height: 120, margin: 10, borderRadius: 20, flex: 3, }} />

                    <View style={{ flexDirection: 'column', flex: 6, marginTop: 10, }}>

                        <Text style={{ fontSize: 16, fontWeight: 'bold' }} >{item.name}</Text>
                        <Text style={{ marginTop: 5, }} >{item.address}</Text>
                        <Text style={{ marginTop: 5, color: 'gray' }}>{item.describe}</Text>
                        <Text style={{ marginTop: 5, color: 'gray' }}>SĐT: {item.phone}</Text>

                    </View>

                </TouchableOpacity>
            </View>
        );

    }



    React.useEffect(() => {

        getList();

    }, []);


    return (
        <SafeAreaView >
            <View >
                {
                    (isLoading)
                        ? (<ActivityIndicator style={{ marginTop: 300, }} />)
                        : <FlatList data={dssl} renderItem={renderSalon} />

                }
            </View>
        </SafeAreaView>
    );
}

const stylee = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: 'white',
        margin: 6,
        borderRadius: 20,
        shadowColor: "dark",
        shadowOpacity: 0.1,
        elevation: 4,



    }


})

export default ChonSalon;