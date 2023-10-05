import React from "react";
import { View, Image, StyleSheet, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, } from "react-native";
import { useState } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const ChonSalon = (props) => {

    const [dssl, setDssl] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const getList = async () => {

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


    const renderSalon = ({ item }) => {

        return (
            <View  >
                <TouchableOpacity style={stylee.container}>

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
                        : <FlatList data={dssl} renderItem={renderSalon} keyExtractor={(item) => { return item.id }} />

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
        shadowOffset: {
            height: 6,
            width: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,



    }


})

export default ChonSalon;