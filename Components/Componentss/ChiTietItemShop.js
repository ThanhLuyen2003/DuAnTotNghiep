import { Image, Pressable, ScrollView, StyleSheet, Text, View, SafeAreaView, ActivityIndicator, FlatList, TextInput, TouchableOpacity, Modal, Button } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Describe from './Describe';
import Ingredient from './Ingredient';
import { useState } from 'react';

const topTap = createMaterialTopTabNavigator();
const ChiTietItemShop = ({ route }) => {
  // console.log(route);
  let describe = route.params.describe;
  let ingredient = route.params.ingredient;

  const [dsComment, setdsComment] = useState([])
  const [isLoading, setisLoading] = useState(true);

  const [moDalComment, setmoDalComment] = useState(false);

  const getList = async () => {

    let apiComment = 'http://192.168.0.104:3000/apiComment/comment';

    try {
      const response = await fetch(apiComment);
      const json = await response.json(); //chuyen du lieu thanh json

      setdsComment(json);// do du lieu vao state
    } catch (err) {
      console.error(err);
    } finally {
      setisLoading(false); // khong con load nua
    }
  }

  React.useEffect(() => {

    getList();

  }, []);


  const renderComment = ({ item }) => {

    return (
      <View >
        <View style={{ flexDirection: "row", alignItems: "stretch" ,borderBottomWidth:1,padding:6,borderColor:"#CCCCCC" }}>
          <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={{ uri: "https://i.pinimg.com/236x/95/0f/f6/950ff67d464c00318f5eea61f2cd0cb2.jpg" }} />
          <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10 }}>{item.Comment}</Text>

        </View>

        <View style={{ flexDirection: "column" }}>
          <Text style={{ position: "relative", left: 70, bottom: 25, opacity: 0.3 }}>{item.TimeComment}</Text>

        </View>
      </View>

    );

  }

  return (

    <View>
      <ScrollView style={{ height: "90%" }} nestedScrollEnabled={true}>


        <View style={styles.container}>
          {/* <Text>{route.params.price}</Text> */}

          <View style={{ width: "100%", height: 300, borderWidth: 1, borderColor: "#CCCCCC", backgroundColor: "white", borderRadius: 10 }}>
            <Image style={{ width: "80%", height: 250, alignSelf: "center", marginTop: 25, borderRadius: 5 }} source={{ uri: route.params.avatar }} />
          </View>

          <View>
            <Text style={{ fontSize: 20, color: "red", fontWeight: "400" }}>{route.params.price} Đ</Text>
            <Text style={{ fontSize: 20, fontWeight: "400" }}>{route.params.name}</Text>
            <Text style={{ fontSize: 20, fontWeight: "400" }}>{route.params.trademark}</Text>
          </View>

          <View style={{ width: "95%", height: 190, alignSelf: "center", backgroundColor: "#EEEEEE", margin: 5, padding: 5 }}>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

              <View style={{ backgroundColor: "white", height: 50, width: 180, margin: 5, padding: 5, flexDirection: "row", alignContent: "center", alignItems: 'center', borderRadius: 5 }} >
                <Icons name='medal-outline' size={20} />
                <Text style={{ width: 140, left: 5 }}>Cam kết 7 ngày hiệu quả</Text>
              </View>

              <View style={{ backgroundColor: "white", height: 50, width: 180, margin: 5, padding: 5, flexDirection: "row", alignContent: "center", alignItems: 'center', borderRadius: 5 }} >
                <Icons name='star-outline' size={20} />
                <Text style={{ width: 140, left: 5 }}>Mua 1 hưởng 5 đặc quyền</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

              <View style={{ backgroundColor: "white", height: 50, width: 180, margin: 5, padding: 5, flexDirection: "row", alignContent: "center", alignItems: 'center', borderRadius: 5 }} >
                <Icons name='currency-usd' size={20} />
                <Text style={{ width: 140, left: 5 }}>Chính sách hoàn tiền 120%</Text>
              </View>

              <View style={{ backgroundColor: "white", height: 50, width: 180, margin: 5, padding: 5, flexDirection: "row", alignContent: "center", alignItems: 'center', borderRadius: 5 }} >
                <Icons name='quality-high' size={20} />
                <Text style={{ width: 140, left: 5 }}>Chất lượng sản phẩm cao cấp</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

              <View style={{ backgroundColor: "white", height: 50, width: 180, margin: 5, padding: 5, flexDirection: "row", alignContent: "center", alignItems: 'center', borderRadius: 5 }} >
                <Icons name='phone-sync' size={20} />
                <Text style={{ width: 140, left: 5 }}>Tổng đài tư vấn cao cấp</Text>
              </View>

              <View style={{ backgroundColor: "white", height: 50, width: 180, margin: 5, padding: 5, flexDirection: "row", alignContent: "center", alignItems: 'center', borderRadius: 5 }} >
                <Icons name='shield-sun-outline' size={20} />
                <Text style={{ width: 140, left: 5 }}>Bảo hành lên đến 12 tháng</Text>
              </View>
            </View>

          </View>

          <View style={{ width: "100%", height: 100, top: 5, borderRadius: 5, borderWidth: 1, borderColor: "#CCCCCC" }}>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>

              <Icon name='phone-classic' color={"black"} size={50} />
              <View style={{ flexDirection: "column", margin: 5, padding: 5 }}>
                <Text>Hotline đặt hàng</Text>
                <Text style={{ fontSize: 20, color: "red", fontWeight: "bold" }}>1900.999.999</Text>
              </View>

            </View>

          </View>
          {/* tabb */}
          <View style={{ height: 300, marginTop: 20 }} >
            <topTap.Navigator
              screenOptions={{
                tabBarAndroidRipple: { borderless: false },
                tabBarStyle: {

                  borderWidth: 1,
                  borderColor: "#CCCCCC",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20
                },
                tabBarLabelStyle: {
                  textTransform: "capitalize",
                  fontWeight: "bold"
                },
                tabBarIndicatorStyle: {
                  backgroundColor: "#CD853F",
                  height: 5,
                  borderRadius: 5,
                  width: "47%",
                  marginLeft: 5
                },
              }}
            >
              <topTap.Screen name='Describe' component={Describe} options={{ title: "Thông tin sản phẩm" }} initialParams={{ describe }} />
              <topTap.Screen name='Ingredient' component={Ingredient} options={{ title: "Thành phần" }} initialParams={{ ingredient }} />
            </topTap.Navigator>
          </View>

          <View style={{ width: 220, height: 55, justifyContent: "center", alignItems: "center", borderTopWidth: 1, marginTop: 20, borderLeftWidth: 1, borderRightWidth: 1, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderColor: "#CCCCCC" }}>
            <Text style={{ fontSize: 20 }}>Phản hồi khách hàng</Text>
          </View>


          <View style={{ width: "100%", height: 220, padding: 8, borderColor: "#CCCCCC", borderWidth: 1 }}>
            <View style={{ flexDirection: "row", width: "100%", height: 70, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 15, right: 5 }}>
                Bình luận
              </Text>
              <TextInput style={{ width: 280, height: 45, borderRadius: 10, borderWidth: 2, borderColor: "#CCCCCC", padding: 5, margin: 5 }} />

              <Icons name='send' size={25} onPress={() => { alert("hi") }} />
            </View>


            
              {
                (isLoading)
                  ? (<ActivityIndicator style={{ marginTop: 300, }} />)
                  : <FlatList style={{width:"100%"}}  scrollEnabled={false}  data={dsComment} renderItem={renderComment} />

              }

            
            <View >
              <Modal
                animationType='slide'
                visible={moDalComment}
                transparent={true}
              >
                <View style={styles.modalView}>
                  <Pressable onPress={()=>{setmoDalComment(false)}} style={{ width: "30%", backgroundColor: "black", borderRadius: 10, height: 10, opacity: 0.10 }}>

                  </Pressable>
                  
                  {
                    (isLoading)
                      ? (<ActivityIndicator style={{ marginTop: 300, }} />)
                      : <FlatList style={{ width: "100%", marginTop: 10 }} data={dsComment} renderItem={renderComment} />
                  }


                </View>
              </Modal>

            </View>



            <TouchableOpacity onPress={() => { setmoDalComment(true) }}>
              <Text style={{ fontSize: 18, alignSelf: "center" }}>Xem chi tiết</Text>
            </TouchableOpacity>

          </View>


        </View>
      </ScrollView>
      <View style={{ flexDirection: "row" }}>
        <View style={{ backgroundColor: "white", width: "50%", height: 60, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>

          <Icons name='cart-plus' size={20} style={{ right: 5 }} />
          <Pressable onPress={() => { alert("gio hang") }}><Text style={{ fontWeight: "bold" }}>ThÊM GIỎ HÀNG</Text></Pressable>

        </View>


        <View style={{ backgroundColor: "#CD853F", width: "50%", height: 60, justifyContent: "center", alignItems: "center" }}>

          <Pressable onPress={() => { alert("mua ngay") }}><Text style={{ fontWeight: "bold" }}>MUA NGAY</Text></Pressable>
          <Text style={{ top: 5 }}>Không ưng đổi ngay</Text>
        </View>
      </View>

    </View>
  )
}

export default ChiTietItemShop

const styles = StyleSheet.create({
  container: {
    padding: 3,
    margin: 2,


  },
  modalView: {
    padding: 10,
    backgroundColor: 'white',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: "auto",
    height: "100%",
    flex: 0.7
  },
})