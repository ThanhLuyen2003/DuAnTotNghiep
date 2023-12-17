import { Image, Pressable, ScrollView, StyleSheet, Text, View, SafeAreaView, ActivityIndicator, FlatList, TextInput, TouchableOpacity, Modal, Alert } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Describe from './Describe';
import Ingredient from './Ingredient';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ip from '../../IP';
import { CommonActions } from '@react-navigation/native';
const topTap = createMaterialTopTabNavigator();

const ChiTietItemShop = ({ route, navigation }) => {


  // console.log(route);
  let describe = route.params.describe;
  let ingredient = route.params.ingredient;
  let idbv = route.params.id;

  const [dsComment, setdsComment] = useState([])
  const [isLoading, setisLoading] = useState(true);

  const [moDalComment, setmoDalComment] = useState(false);
  const [modalCart, setModalCart] = useState(false);
  const [modalOrder, setModalOrder] = useState(false);


  const [Comment, setComment] = useState("");
  const [avatarUser, setavatarUser] = useState("");
  const [nameUser, setnameUser] = useState("");
  const [TimeComment, setTimeComment] = useState("");

  const [soLuong, setsoLuong] = useState(1);

  const [userInfo, setuserInfo] = useState({})

  const [userAvatar, setUserAvatar] = useState(null);

  const [saveImage, setsaveImage] = useState({});
  const getLoginInfor = async () => {

    const value = await AsyncStorage.getItem('loginInfo');
    const m_saveImage = await AsyncStorage.getItem('savedImage')
    setuserInfo(JSON.parse(value))
    setsaveImage(m_saveImage);
  }



  const getList = async () => {

    let apiComment = 'http://' + ip + ':3000/apiComment/getComment/' + idbv;

    try {
      const response = await fetch(apiComment);
      const json = await response.json();
      setdsComment(json);
    } catch (err) {
      console.error("Error fetching comments:", err); // Log the error for troubleshooting
    } finally {
      setisLoading(false);
    }
  }


  const addComment = () => {

    let obj = {
      Comment: Comment,
      idUser: userInfo._id,
      idbv: idbv,
      avatarUser: saveImage,
      nameUser: userInfo.name

    }
    const url = `http://${ip}:3000/apiComment/addComment/${userInfo._id}/${idbv}`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    }).catch((ex) => {
      console.log(ex);
    })
      .then(async (res) => {
        if (res.status == 200) {

          if (obj.avatarUser) {
            // Remove the old image from storage
            await AsyncStorage.removeItem("savedImage");

            // Save the new image to storage
            await AsyncStorage.setItem('savedImage', obj.avatarUser);
            setsaveImage(obj.avatarUser);
          }
          getList();
          setComment('');
        } else {
          alert("Vui lòng cập nhật đầy đủ thông tin")
          return res;

        }
      })
  }


  const renderComment = ({ item }) => {

    return (
      <View >
        <View style={{ flexDirection: "row", alignItems: "stretch", borderBottomWidth: 1, padding: 6, borderColor: "#CCCCCC" }}>

          <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={{ uri: item.avatarUser }} />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 5 }}>{item.nameUser}</Text>
            <Text style={{ fontSize: 15, marginLeft: 15 }}>{item.Comment}</Text>
          </View>

        </View>
      </View>

    );

  }


  const addCart = () => {

    if (userInfo.name == "Khách") {
      Alert.alert("Thông báo", "Vui lòng đăng nhập", [
        {
          text: "Hủy",
          onPress: () => { navigation.navigate("Home") }

        }
        ,
        {
          text: "Đăng nhập",
          onPress: () => {
            setModalCart(false);

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }]
              })
            )
          }
        }
      ])

      return;
    }

    if (route.params.soLuong == 0) {
      alert("Đã hết hàng!")
      return;
    }

    let obj2 = {
      namePro: route.params.name,
      pricePro: route.params.price,
      quantity: soLuong,
      imagePro: route.params.avatar,
      idUser: userInfo._id,
      idPro: route.params.id
    }

    const idPro = route.params.id
    let url2 = 'http://' + ip + ':3000/addCart';


    fetch(url2, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj2)
    }).catch((ex) => {
      console.log(ex);
    }).then(res => {
      if (res.status == 200) {
        alert("Đã thêm vào giỏ hàng")
        setModalCart(false);
        navigation.navigate('TabGroupProduct');
      }
    });

  }


  const Order = () => {

    if (userInfo.name == "Khách") {
      Alert.alert("Thông báo", "Vui lòng đăng nhập", [
        {
          text: "Hủy",
          onPress: () => { navigation.navigate("Home") }

        }
        ,
        {
          text: "Đăng nhập",
          onPress: () => {
            setModalOrder(false)

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }]
              })
            )
          }
        }
      ])

      return;
    }

    if (route.params.soLuong == 0) {
      alert("Đã hết hàng!")
      return;
    }

    let products = [];
    let price = route.params.price * soLuong;

    products.push({ name: route.params.name, price: route.params.price, quantity: soLuong, image: route.params.avatar, idPro: route.params.id });

    setModalOrder(false)

    navigation.navigate('Order', { price, products });

    console.log(price);

  }


  React.useEffect(() => {

    getLoginInfor();

    getList();

  }, []);

  const minus = () => {

    if (soLuong == 1) {
      return;
    }
    setsoLuong(soLuong - 1);


  }

  const plus = () => {
    setsoLuong(soLuong + 1);
  }

  let price = '';

  if (route.params.price.length == 5) {
    price = (route.params.price.substring(0, 2) + '.' + route.params.price.substring(2, 5));
  } else
    if (route.params.price.length == 6) {
      price = (route.params.price.substring(0, 3) + '.' + route.params.price.substring(3, 6));

    } else
      if (route.params.price.length == 7) {
        price = (route.params.price.substring(0, 1) + '.' + route.params.price.slice(1, 4) + '.' + route.params.price.slice(4, 7));
      } else
        if (route.params.price.length == 8) {
          price = (route.params.price.substring(0, 2) + '.' + route.params.price.slice(2, 5) + '.' + route.params.price.slice(5, 8));
        }

  return (

    <SafeAreaView>
      <ScrollView style={{ height: "92%" }} nestedScrollEnabled={true}>


        <View style={styles.container}>
          {/* <Text>{route.params.price}</Text> */}

          <View style={{ width: "100%", height: 300, borderWidth: 1, borderColor: "#CCCCCC", backgroundColor: "white", borderRadius: 10 }}>
            <Image style={{ width: "80%", height: 250, alignSelf: "center", marginTop: 25, borderRadius: 5 }} source={{ uri: route.params.avatar }} />
          </View>

          <View>
            <Text style={{ fontSize: 20, color: "red", fontWeight: "400" }}>{price} Đ</Text>
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
              <TextInput onChangeText={(txt) => { setComment(txt) }} style={{ width: 280, height: 45, borderRadius: 10, borderWidth: 2, borderColor: "#CCCCCC", padding: 5, margin: 5 }} />

              <Icons name='send' size={25} onPress={addComment} />
            </View>



            {
              (isLoading)
                ? (<ActivityIndicator style={{ marginTop: 200, }} />)
                : <FlatList style={{ width: "100%" }} scrollEnabled={false} data={dsComment} renderItem={renderComment} />

            }

            {/* modal comment */}
            <View >
              <Modal
                animationType='slide'
                visible={moDalComment}
                transparent={true}
              >
                <View style={styles.modalView}>
                  <Pressable onPress={() => { setmoDalComment(false) }} style={{ width: "30%", backgroundColor: "black", borderRadius: 10, height: 10, opacity: 0.10 }}>

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

        {/* modal giỏ hàng */}
        <Modal
          visible={modalCart}
          transparent={true}
          animationType='slide'

        >
          <View style={styles.modelCart}>

            <TouchableOpacity style={{ alignSelf: 'flex-end', margin: 10 }} onPress={() => { setModalCart(false) }}>
              <Icon name='arrow-left' size={20} />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: route.params.avatar }} style={{ width: 100, height: 100, marginLeft: 20, }} />

              <View >
                <Text style={{ alignSelf: 'center', fontSize: 20, color: 'red' }}>{price} Đ</Text>
                {route.params.soLuong == 0
                  ? <View><Text>Hết hàng</Text></View>
                  : <Text>Kho: {route.params.soLuong} </Text>
                }
              </View>
            </View>

            <View style={{ flexDirection: 'row', }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 20, marginTop: 20, width: '65%' }}>Số lượng</Text>

              <View style={{ flexDirection: 'row', marginTop: 20, borderColor: 'black', borderWidth: 1, alignItems: 'center', alignSelf: 'stretch', width: 100, borderRadius: 5, }}>

                <TouchableOpacity onPress={minus}>
                  <Icon style={{ marginLeft: 7 }} name='minus' size={20} />
                </TouchableOpacity>

                <View style={{ borderColor: 'black', height: '100%', width: 30, borderRightWidth: 1, borderLeftWidth: 1, alignItems: 'center', marginLeft: 5, marginRight: 8, borderRadius: 3 }}>
                  <Text style={{ marginTop: 3, marginLeft: 2 }}>{soLuong} </Text>
                </View>

                <TouchableOpacity onPress={plus}>
                  <Icon name='plus' size={20} />
                </TouchableOpacity>

              </View>
            </View>

            <TouchableOpacity onPress={addCart} style={{ backgroundColor: "#CD853F", width: "100%", height: 60, justifyContent: "center", alignItems: "center", flexDirection: "row", position: 'absolute', bottom: 0 }}>

              <Icons name='cart-plus' size={20} style={{ right: 5 }} />
              <Text style={{ fontWeight: "bold" }}>ThÊM GIỎ HÀNG</Text>

            </TouchableOpacity>

          </View>
        </Modal>


        {/* 
//modal đơn hàng */}
        <Modal
          visible={modalOrder}
          transparent={true}
          animationType='slide'

        >
          <View style={styles.modelCart}>

            <TouchableOpacity style={{ alignSelf: 'flex-end', margin: 10 }} onPress={() => { setModalOrder(false) }}>
              <Icon name='arrow-left' size={20} />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: route.params.avatar }} style={{ width: 100, height: 100, marginLeft: 20, }} />

              <View >
                <Text style={{ alignSelf: 'center', fontSize: 20, color: 'red' }}>{price} Đ</Text>
                {route.params.soLuong == 0
                  ? <View><Text>Hết hàng</Text></View>
                  : <Text>Kho: {route.params.soLuong} </Text>
                }
              </View>

            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 20, marginTop: 20, width: '65%' }}>Số lượng</Text>

              <View style={{ flexDirection: 'row', marginTop: 20, borderColor: 'black', borderWidth: 1, alignItems: 'center', alignSelf: 'stretch', width: 100, borderRadius: 5, }}>

                <TouchableOpacity onPress={minus}>
                  <Icon style={{ marginLeft: 7 }} name='minus' size={20} />
                </TouchableOpacity>

                <View style={{ borderColor: 'black', height: '100%', width: 30, borderRightWidth: 1, borderLeftWidth: 1, alignItems: 'center', marginLeft: 5, marginRight: 8, borderRadius: 3 }}>
                  <Text style={{ marginTop: 3, marginLeft: 2 }}>{soLuong} </Text>
                </View>

                <TouchableOpacity onPress={plus}>
                  <Icon name='plus' size={20} />
                </TouchableOpacity>

              </View>
            </View>

            <TouchableOpacity onPress={Order} style={{ backgroundColor: "#CD853F", width: "100%", height: 60, justifyContent: "center", alignItems: "center", flexDirection: "row", position: 'absolute', bottom: 0 }}>

              <Text style={{ fontWeight: "bold" }}>MUA NGAY</Text>

            </TouchableOpacity>

          </View>
        </Modal>


        <TouchableOpacity onPress={() => { setModalCart(true) }} style={{ backgroundColor: "white", width: "50%", height: 60, justifyContent: "center", alignItems: "center", }}>

          <Icons name='cart-plus' size={20} style={{ right: 5 }} />
          <Text style={{ fontWeight: "bold" }}>ThÊM GIỎ HÀNG</Text>

        </TouchableOpacity>


        <TouchableOpacity onPress={() => { setModalOrder(true) }} style={{ backgroundColor: "#CD853F", width: "50%", height: 60, justifyContent: "center", alignItems: "center" }}>

          <Text style={{ fontWeight: "bold" }}>MUA NGAY</Text>
          <Text style={{ top: 5 }}>Không ưng đổi ngay</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

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
    flex: 0.7
  },
  modelCart: {
    backgroundColor: 'white',
    height: '100%',
    flex: 0.42,
    marginTop: "auto",



  }
})