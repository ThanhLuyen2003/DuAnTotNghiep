import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React from 'react'
import { useState } from "react";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import ip from '../IP';
import { ScrollView } from 'react-native';


const ChonDichVu = (props) => {

    const [dsCat, setDsCat] = useState([]);
    const [dsMassage, setDsMassage] = useState([]);
    const [dsDa, setdsDa] = useState([]);
    const [dsUon, setDsUon] = useState([]);
    const [dsNhuom, setDsNhuom] = useState([]);
    const [isLoading, setisLoading] = useState(true)



    const getList = async () => {

        let apiService = 'http://' + ip + ':3000/getCat';
        let mas = 'http://' + ip + ':3000/getMassage';
        let da = 'http://' + ip + ':3000/getChamsocda';
        let uon = 'http://' + ip + ':3000/getUon';
        let nhuom = 'http://' + ip + ':3000/getNhuom';



        try {
            const response = await fetch(apiService);
            const response2 = await fetch(mas);
            const response3 = await fetch(da);
            const response4 = await fetch(uon);
            const response5 = await fetch(nhuom);

            const json = await response.json(); //chuyen du lieu thanh json
            const json2 = await response2.json();
            const json3 = await response3.json();
            const json4 = await response4.json();
            const json5 = await response5.json();

            setDsCat(json);// do du lieu vao state
            setDsMassage(json2);
            setdsDa(json3);
            setDsUon(json4);
            setDsNhuom(json5);
        } catch (err) {
            console.error(err);
        } finally {
            setisLoading(false);
        }
    }

    selectedItemm = (item, index) => {

        const newData = dsCat.map((e, index) => {

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

        const newData2 = dsDa.map((e, index) => {

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

        const newData3 = dsMassage.map((e, index) => {

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
        const newData4 = dsUon.map((e, index) => {

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

        const newData5 = dsNhuom.map((e, index) => {

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
        setDsCat(newData);
        setdsDa(newData2);
        setDsMassage(newData3);
        setDsUon(newData4);
        setDsNhuom(newData5);
    }

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

    const renderItem = (item, index) => {

        let pay = item.price;


        return (
            <View style={[styles.container, {
                backgroundColor: (item.selected) ? '#778899' : 'white', borderColor: (item.selected) ? 'white' : 'gray',
            }]}
                key={item._id}
            >

                <TouchableOpacity
                    onPress={() => selectedItemm(item, index)}
                >
                    <Image source={{ uri: item.image }} style={{ height: 120, width: 185, borderRadius: 10 }} />
                    <Text style={{ fontSize: 18, fontWeight: '500', margin: 5 }} >{item.name}</Text>
                    <Text style={{ fontSize: 12, color: (item.selected) ? 'white' : '#778899', margin: 5 }} >{item.describe} </Text>
                    <Text style={{ color: 'red', fontSize: 15, marginLeft: 5 }} >{fomatPrice(pay)} Đ </Text>
                </TouchableOpacity>


            </View>
        )

    }

    onShowSelectedItem = () => {
        const listSelected = dsCat.filter(item => item.selected == true);
        const listSelected2 = dsDa.filter(item => item.selected == true);
        const listSelected3 = dsMassage.filter(item => item.selected == true);
        const listSelected4 = dsNhuom.filter(item => item.selected == true);
        const listSelected5 = dsUon.filter(item => item.selected == true);


        let content = [];
        let price = '';
        let idService = [];

        listSelected.forEach((item, index) => {

            let pay = item.price;

            content.push({ name: item.name, price: fomatPrice(pay) });
            price = Number(price) + Number(item.price);
            idService.push(item._id);
        })


        listSelected2.forEach((item, index) => {

            let pay = item.price;

            content.push({ name: item.name, price: fomatPrice(pay) });
            price = Number(price) + Number(item.price);
            idService.push(item._id);
        })
        listSelected3.forEach((item, index) => {

            let pay = item.price;

            content.push({ name: item.name, price: fomatPrice(pay) });
            price = Number(price) + Number(item.price);
            idService.push(item._id);
        })

        listSelected4.forEach((item, index) => {

            let pay = item.price;

            content.push({ name: item.name, price: fomatPrice(pay) });
            price = Number(price) + Number(item.price);
            idService.push(item._id);
        })

        listSelected5.forEach((item, index) => {

            let pay = item.price;

            content.push({ name: item.name, price: fomatPrice(pay) });
            price = Number(price) + Number(item.price);
            idService.push(item._id);
        })

        if (content.length == 0) {
            alert("Vui lòng chọn dịch vụ!");
            return;
        }

        let pay = String(price);

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

        props.navigation.navigate('ComfirmData', { content, pay, idService });
    }


    React.useEffect(() => {

        getList();

    }, [])

    return (
        <View style={{ height: '100%' }} >

            {
                (isLoading)
                    ? <View style={{ height: '90%' }}>
                        <ActivityIndicator style={{ marginTop: 300, }} />
                    </View>
                    : <ScrollView style={{ height: '90%' }}>

                        <View style={{ backgroundColor: 'white', padding: 5, marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <Text style={styles.text}>Cắt tóc</Text>
                                <Text >{dsCat.length} dịch vụ </Text>
                            </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {dsCat.map((item) => renderItem(item))}
                            </ScrollView>

                            <Text style={{ textAlign: "center" }}>--{'>'}</Text>
                        </View>


                        <View style={{ backgroundColor: 'white', padding: 5, marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <Text style={styles.text}>Chăm sóc da</Text>
                                <Text >{dsDa.length} dịch vụ </Text>
                            </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {dsDa.map((item) => renderItem(item))}
                            </ScrollView>

                            <Text style={{ textAlign: "center" }}>--{'>'}</Text>
                        </View>


                        <View style={{ backgroundColor: 'white', padding: 5, marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <Text style={styles.text}>Massage</Text>
                                <Text >{dsMassage.length} dịch vụ </Text>
                            </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {dsMassage.map((item) => renderItem(item))}
                            </ScrollView>

                            <Text style={{ textAlign: "center" }}>--{'>'}</Text>
                        </View>


                        <View style={{ backgroundColor: 'white', padding: 5, marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <Text style={styles.text}>Uốn cao cấp</Text>
                                <Text >{dsUon.length} dịch vụ </Text>
                            </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {dsUon.map((item) => renderItem(item))}
                            </ScrollView>

                            <Text style={{ textAlign: "center" }}>--{'>'}</Text>
                        </View>


                        <View style={{ backgroundColor: 'white', padding: 5, marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <Text style={styles.text}>Nhuộm cao cấp</Text>
                                <Text >{dsNhuom.length} dịch vụ </Text>
                            </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {dsNhuom.map((item) => renderItem(item))}
                            </ScrollView>

                            <Text style={{ textAlign: "center" }}>--{'>'}</Text>
                        </View>


                    </ScrollView>


            }
            <TouchableOpacity onPress={() => onShowSelectedItem()} style={styles.tiepTuc}  >
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
        width: 190
    },
    tiepTuc: {
        marginTop: '3%',
        backgroundColor: '#CD853F',
        width: '90%',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',

    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        width: '80%'
    }

})