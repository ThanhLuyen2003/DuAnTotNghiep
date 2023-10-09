import { View, Image, StyleSheet, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, TouchableHighlight, } from "react-native";
import { useState } from "react";
import React from 'react'
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

import { FontVariant } from "react-native";

const TaoKieuToc = (props) => {
  const { navigation } = props;
  const [dsProduct, setdsProduct] = useState([])
  const [isLoading, setisLoading] = useState(true);




  const getList = async () => {

    let apiSalon = 'http://192.168.88.103:3000/apiProduct/productsalon';

    try {
      const response = await fetch(apiSalon);
      const json = await response.json(); //chuyen du lieu thanh json

      setdsProduct(json);// do du lieu vao state
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

    return (
      <SafeAreaView style={{ height: "89%" }}>
        <View >
          <TouchableHighlight onPress={() => { navigation.navigate("ChiTietItemShop", { avatar: item.avatar, name: item.name, trademark: item.trademark, price: item.price, describe: item.describe, ingredient: item.ingredient, type: item.type }) }}>
            <View style={styles.gridItem}>
              <Image style={{ width: 150, height: 250, alignSelf: "center" }} source={{ uri: item.avatar }} />
              <Text style={{ fontSize: 15 }} numberOfLines={2}>{item.name}</Text>
              <Text style={{ fontSize: 15, color: "red" }} >{item.price} Đ</Text>
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
            : <FlatList numColumns={numColumns} data={dsProduct} renderItem={renderProductSalon} />

        }
      </View>
    </SafeAreaView>
  )
}




export default TaoKieuToc

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