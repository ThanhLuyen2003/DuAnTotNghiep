import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
const ThongTinHoTroKhachHang = (props) => {

  // console.log(route);
  return (
    <View style={{ height: '90%' }}>
      <View style={{ height: '20%', width: '100%', backgroundColor: "#778899", flexDirection: 'row', alignItems: 'center', padding: 20 }}>
        <Pressable onPress={() => { props.navigation.navigate("Profile") }}>
          <Icons name='arrow-left' size={30} color={"black"} />
        </Pressable>

        <TouchableOpacity onPress={() => { alert("hi") }}>
          <Image source={{ uri: props.route.params.avatar }} style={{ height: 60, width: 60, borderRadius: 50, marginBottom: '5%', marginLeft: 10 }} />
        </TouchableOpacity>

        <View style={{ alignItems: 'flex-start', marginLeft: 10, marginBottom: '5%' }}>
          <Text style={{ fontSize: 20, color: 'white' }} >{props.route.params.name} </Text>
          <Text style={{ color: 'white' }} >Đẹp như trong mơ đến Fpoly Barber</Text>
        </View>
      </View>
      <View style={{ backgroundColor: "#CCCCCC", height: 50, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Thông tin hỗ trợ khách hàng</Text>
      </View>
      <Pressable onPress={() => { props.navigation.navigate("CamKetFpoly") }}>
        <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F', height: 40, justifyContent: "center", alignItems: "center" }} >
          <Icons name='shield-sun' size={25} color={'#CD853F'} />
          <Text style={{ marginLeft: 10, width: 200 }}>Cam kết về Fpoly Barber Care</Text>
          <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
        </View>
      </Pressable>

      <Pressable onPress={() => { props.navigation.navigate("VeChungToi") }}>
        <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F', height: 40, justifyContent: "center", alignItems: "center" }} >
          <Icons name='family-tree' size={25} color={'#CD853F'} />
          <Text style={{ marginLeft: 10, width: 200 }}>Về chúng tôi</Text>
          <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
        </View>
      </Pressable>
      <Pressable onPress={() => { props.navigation.navigate("DieuKienGiaoDich") }}>
        <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F', height: 40, justifyContent: "center", alignItems: "center" }} >
          <Icons name='account-arrow-right' size={25} color={'#CD853F'} />
          <Text style={{ marginLeft: 10, width: 200 }}>Điều kiện giao dịch chung</Text>
          <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
        </View>
      </Pressable>
      <Pressable onPress={() => { props.navigation.navigate("BaoMatThongTin") }}>
        <View style={{ flexDirection: 'row', margin: 10, padding: 5, borderBottomWidth: 1, borderBottomColor: '#CD853F', height: 40, justifyContent: "center", alignItems: "center" }} >
          <Icons name='security' size={25} color={'#CD853F'} />
          <Text style={{ marginLeft: 10, width: 200 }}>Chính sách bảo mật thông tin</Text>
          <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
        </View>
      </Pressable>
    </View>
  )
}

export default ThongTinHoTroKhachHang

const styles = StyleSheet.create({})