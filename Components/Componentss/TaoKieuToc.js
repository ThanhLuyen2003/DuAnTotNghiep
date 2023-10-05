import { View, Image, StyleSheet, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, } from "react-native";
import { useState } from "react";
import React from 'react'


const TaoKieuToc = () => {

  const [dsProduct, setdsProduct] = useState([])
  const [isLoading, setisLoading] = useState(true);

  const getList = async () => {

    let apiSalon = 'http://192.168.1.117:3000/apiProduct/productsalon';

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
    <View >
      <View style={styles.gridItem}>
        <Image  style={{width:150,height:250,alignSelf:"center"}} source={{uri:item.avatar}}/>
           <Text style={{fontSize:15,fontWeight:"bold"}} numberOfLines={2}>{item.name}</Text>       
           <Text style={{fontSize:15,fontWeight:"bold",color:"red"}} >{item.price} Đ</Text> 
           <Text style={{borderBottomWidth:2,borderColor:"#CD853F",width:110,fontSize:20,fontWeight:"bold"}}>Xem chi tiết</Text>
            
      </View>
    </View>
      
  );

}

  return (
    <SafeAreaView >
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
    backgroundColor:"#fff",
    flex: 1,
    padding:5,
    margin:1,
    width:210,
    fontSize:12,
    borderColor:"#F8F8FF",
    borderWidth:1
  },

})