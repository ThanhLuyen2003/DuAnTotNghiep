import { View, Image, StyleSheet, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, TouchableHighlight, TextInput, } from 'react-native'
import React from 'react';
import { useState } from "react";
import ip from '../../IP';
const ComboSalon = (props) => {
  const { navigation } = props;
  const [dsProductCombo, setdsProductCombo] = useState([])
  const [isLoading, setisLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getList = async () => {


    let apiSalon = 'http://' + ip + ':3000/apiProduct/productsalon/Combo';

    try {
      const response = await fetch(apiSalon);
      const json = await response.json(); //chuyen du lieu thanh json

      setdsProductCombo(json);// do du lieu vao state
    } catch (err) {
      console.error(err);
    } finally {
      setisLoading(false); // khong con load nua
    }
  }
  const [donHang, setDonHang] = useState([]);

  const getDonHang = async () => {

    let apiSalon = 'http://' + ip + ':3000/getOrder';

    try {
      const response = await fetch(apiSalon);
      const json = await response.json(); //chuyen du lieu thanh json

      setDonHang(json);// do du lieu vao state
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {

    getList();
    getDonHang();


  }, []);

  const numColumns = 2; //
  const renderProductSalon = ({ item }) => {

    let price = '';

    if (item.price.length == 5) {
      price = (item.price.substring(0, 2) + '.' + item.price.substring(2, 5));
    } else
      if (item.price.length == 6) {
        price = (item.price.substring(0, 3) + '.' + item.price.substring(3, 6));

      } else
        if (item.price.length == 7) {
          price = (item.price.substring(0, 1) + '.' + item.price.slice(1, 4) + '.' + item.price.slice(4, 7));
        } else
          if (item.price.length == 8) {
            price = (item.price.substring(0, 2) + '.' + item.price.slice(2, 5) + '.' + item.price.slice(5, 8));
          }
    let daBan = 0;

    donHang.forEach(element => {
      let pro = element.products;
      if (element.status == 'Đã giao hàng') {
        pro.forEach(pro => {
          if (item.name == pro.name) {
            daBan += Number(pro.quantity);
          }
        })
      }
    });

    let conLai = item.soluongnhap - daBan;

    return (
      <SafeAreaView style={{ height: "89%" }}>
        <View >
          <TouchableHighlight onPress={() => { navigation.navigate("ChiTietItemShop", { soLuong: conLai, avatar: item.avatar, name: item.name, trademark: item.trademark, price: item.price, describe: item.describe, ingredient: item.ingredient, type: item.type, id: item._id }) }}>
            <View style={styles.gridItem}>
              <Image style={{ width: 180, height: 180, alignSelf: "center" }} source={{ uri: item.avatar }} />
              <Text style={{ fontSize: 15 }} numberOfLines={2}>{item.name}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                <Text style={{ fontSize: 15, color: "red" }} >{price} Đ</Text>
                <Text style={{ marginRight: 20 }}>Đã bán: {daBan}</Text>
              </View>
            </View>
          </TouchableHighlight>

        </View>
      </SafeAreaView>

    );

  }
  const filteredProducts = dsProductCombo.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <SafeAreaView style={{ height: "88%" }}>

      <View >
        {
          (isLoading)
            ? (<ActivityIndicator style={{ marginTop: 300, }} />)
            : <FlatList numColumns={numColumns} data={dsProductCombo} renderItem={renderProductSalon} />

        }
      </View>
    </SafeAreaView>
  )
}

export default ComboSalon

const styles = StyleSheet.create({
  gridItem: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
    margin: 2,
    width: 210,
    fontSize: 12,
    padding: 5,
    margin: 1,
    width: 210,
    fontSize: 12,
    borderColor: "#F8F8FF",
    borderWidth: 1
  }, searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    fontSize: 15,
  },

})