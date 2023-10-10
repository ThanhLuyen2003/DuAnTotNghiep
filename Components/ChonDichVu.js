import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React from 'react'
import { useState } from "react";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


const ChonDichVu = (props) => {

    const [dsdv, setDsdv] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const getList = async () => {

        let apiService = 'http://192.168.88.103:3000/service/service';

        try {
            const response = await fetch(apiService);
            const json = await response.json(); //chuyen du lieu thanh json

            setDsdv(json);// do du lieu vao state
        } catch (err) {
            console.error(err);
        } finally {
            setisLoading(false); // khong con load nua
        }
    }

    selectedItemm = (item, index) => {

        const newData = dsdv.map((e, index) => {

            if (item.name == e.name) {
                return {
                    ...e,
                    selected: !e.selected,
                }
            }
            return {
                ...e,
                selected: e.selected
            }



        })

        setDsdv(newData);
    }


    const renderItem = ({ item, index }) => {

        return (
            <View style={[styles.container, { backgroundColor: (item.selected) ? '#CD853F' : 'white', }]}
            >

                <TouchableOpacity
                    onPress={() => selectedItemm(item, index)}
                >
                    <Image source={{ uri: item.image }} style={{ height: 120, width: 185, borderRadius: 10 }} />
                    <Text style={{ fontSize: 18, fontWeight: '500', margin: 5 }} >{item.name}</Text>
                    <Text style={{ fontSize: 12, color: 'gray', margin: 5 }} >{item.describe} </Text>
                    <Text style={{ color: 'red', fontSize: 15, marginLeft: 5 }} >{item.price} Đ </Text>
                </TouchableOpacity>


            </View>
        )

    }

    onShowSelectedItem = () => {
        const listSelected = dsdv.filter(item => item.selected == true);

        let content = '';
        let price = '';

        listSelected.forEach((item, index) => {
            content = content + (index + 1) + ". " + item.name + " ( " + item.price + " đ )" + " \n";
            price = Number(price) + Number(item.price);
        })

        if (content.length == 0) {
            alert("Vui lòng chọn dịch vụ!");
            return;
        }

        props.navigation.navigate('ComfirmData', { content, price });
    }


    React.useEffect(() => {

        getList();

    }, [])

    return (
        <View  >

            {
                (isLoading)
                    ? (<ActivityIndicator style={{ marginTop: '50%', marginBottom: '200%' }} />)
                    : (<FlatList style={{ height: '90%' }} data={dsdv} renderItem={renderItem} numColumns={2} />)

            }

            <TouchableOpacity onPress={() => onShowSelectedItem()} style={{ marginTop: '3%', backgroundColor: '#CD853F', width: '90%', height: 40, borderRadius: 10, alignItems: 'center', alignSelf: 'center', }}  >
                <Text style={{ color: 'white', fontSize: 20, marginTop: 10, }}>Tiếp tục</Text>
            </TouchableOpacity>

        </View>
    )
}

export default ChonDichVu;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        margin: 5,
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'gray',
        height: 'auto'

    }

})