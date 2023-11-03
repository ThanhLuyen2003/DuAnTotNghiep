import { View, Image, StyleSheet, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, TouchableHighlight, } from 'react-native'
import React from 'react';
import { useState } from "react";

const ChamSocCoThe = (props) => {
  const { navigation } = props;
  const [dsProductChamSocCoThe, setdsProductChamSocCoThe] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const ip = "192.168.0.103";

  const getList = async () => {


    let apiSalon = 'http://' + ip + ':3000/apiProduct/productsalon/ChamSocCoThe';

    try {
      const response = await fetch(apiSalon);
      const json = await response.json(); //chuyen du lieu thanh json

      setdsProductChamSocCoThe(json);// do du lieu vao state
    } catch (err) {
      console.error(err);
    } finally {
      setisLoading(false); // khong con load nua
    }
  }
  React.useEffect(() => {

    getList();


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

    return (
      <SafeAreaView style={{ height: "89%" }}>
        <View >
          <TouchableHighlight onPress={() => { navigation.navigate("ChiTietItemShop", { avatar: item.avatar, name: item.name, trademark: item.trademark, price: item.price, describe: item.describe, ingredient: item.ingredient, type: item.type, id: item._id }) }}>
            <View style={styles.gridItem}>
              <Image style={{ width: 180, height: 180, alignSelf: "center" }} source={{ uri: item.avatar }} />
              <Text style={{ fontSize: 15 }} numberOfLines={2}>{item.name}</Text>
              <Text style={{ fontSize: 15, color: "red" }} >{price} Đ</Text>
              {/* <Text style={{borderBottomWidth:2,borderColor:"#CD853F",width:110,fontSize:20}}>Xem chi tiết</Text> */}

            </View>
          </TouchableHighlight>

        </View>
      </SafeAreaView>

    );

  }
  return (
    <SafeAreaView style={{ height: "88%" }}>
      <View >
        {
          (isLoading)
            ? (<ActivityIndicator style={{ marginTop: 300, }} />)
            : <FlatList numColumns={numColumns} data={dsProductChamSocCoThe} renderItem={renderProductSalon} />

        }
      </View>
    </SafeAreaView>
  )
}

export default ChamSocCoThe

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
  },
})