import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Describe from './Describe';
import Ingredient from './Ingredient';
const topTap = createMaterialTopTabNavigator();
const ChiTietItemShop = ({ route }) => {
  // console.log(route);
  let describe = route.params.describe;
  let ingredient = route.params.ingredient;
  return (

    <View>
      <ScrollView style={{ height: "90%" }}>


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


  }
})