import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import ManChao from './Components/ManChao';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';

import DatLich from './Components/DatLich';

import Profile from './Components/Profile';
import EditProfile from './Components/EditProfile';
import GioiThieu from './Components/GioiThieu';

import ChonSalon from './Components/ChonSalon';
import TabGroupProduct from './Components/Navigation/TabGroupProduct';
import ChonDichVu from './Components/ChonDichVu';
import ComfirmData from './Components/ComfirmData';
import LienHe from './Components/LienHe';
import ChiTietItemShop from './Components/ComponentsShop/ChiTietItemShop';
import Cart from './Components/ComponentsShop/Cart';
import Order from './Components/ComponentsShop/Order';
import TabDonHang from './Components/Navigation/TabDonHang';
import KhamPha from './Components/KhamPha';
import ChiTietDonHang from './Components/ComponentsDonHang/ChiTietDonHang';
import ChiTietKhamPha from './Components/ChiTietKhamPha';
import SapToi from './Components/ComponentsLich/SapToi';
import TabHistory from './Components/Navigation/TabHistory';
import TabDonHangProfile from './Components/Navigation/TabDonHangProfile';


import ChiTietLich from './Components/ComponentsLich/ChiTietLich';
import BaoMatThongTin from './Components/ThongTinKhachHang/BaoMatThongTin';
import CamKetFpoly from './Components/ThongTinKhachHang/CamKetFpoly';
import DieuKienGiaoDich from './Components/ThongTinKhachHang/DieuKienGiaoDich';
import VeChungToi from './Components/ThongTinKhachHang/VeChungToi';
import ThongTinTaiKhoan from './Components/SettingComponents/ThongTinTaiKhoan';
import PhoneXacNhan from './Components/SettingComponents/PhoneXacNhan';
import OTPgiaoDich from './Components/SettingComponents/OTPgiaoDich';
import ThongTinHoTroKhachHang from './Components/SettingComponents/ThongTinHoTroKhachHang';
import HeThongSalon from './Components/HeThongSalon';




const Stack = createNativeStackNavigator();
const Tabb = createBottomTabNavigator();

export default function App() {


  return (

    <NavigationContainer >
      <Stack.Navigator initialRouteName='ManChao' >

        <Stack.Screen name='ManChao' component={ManChao} options={{ headerShown: false }} />

        <Stack.Screen name='GioiThieu' component={GioiThieu} options={{ headerShown: false }} />

        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />

        <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />

        <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />

        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />

        <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "Chỉnh sửa tài khoản" }} />

        <Stack.Screen name="ChonSalon" component={ChonSalon} options={{ title: "Chọn địa điểm" }} />

        <Stack.Screen name="ChonDichVu" component={ChonDichVu} options={{ title: "Chọn dịch vụ" }} />

        <Stack.Screen name="ComfirmData" component={ComfirmData} options={{ title: "Xác nhận thông tin" }} />

        <Stack.Screen name="ChiTietItemShop" component={ChiTietItemShop} options={{ headerShown: false }} />

        <Stack.Screen name="Cart" component={Cart} options={{ title: "Giỏ hàng" }} />

        <Stack.Screen name="Order" component={Order} options={{ title: "Đặt hàng" }} />

        <Stack.Screen name="TabDonHang" component={TabDonHang} options={{ title: "Đơn hàng" }} />

        <Stack.Screen name="TabHistory" component={TabHistory} options={{ title: "Lịch sử cắt" }} />

        <Stack.Screen name="ChiTietDonHang" component={ChiTietDonHang} options={{ title: "Đơn hàng" }} />

        <Stack.Screen name="ChiTietKhamPha" component={ChiTietKhamPha} options={{ title: "Khám phá" }} />

        <Stack.Screen name="LichDaDat" component={SapToi} options={{ title: "Lịch đã đặt" }} />

        <Stack.Screen name="TabDonHangProfile" component={TabDonHangProfile} options={{ title: "Đơn hàng" }} />

        <Stack.Screen name="OTPgiaoDich" component={OTPgiaoDich} options={{ title: "Xác nhận OTP" }} />

        <Stack.Screen name="PhoneXacNhan" component={PhoneXacNhan} options={{ title: "Xác nhận số điện thoại" }} />

        <Stack.Screen name="ThongTinTaiKhoan" component={ThongTinTaiKhoan} options={{ title: "Thông tin tài khoản" }} />

        <Stack.Screen name="ChiTietLich" component={ChiTietLich} options={{ title: "Chi tiết lịch" }} />

        <Stack.Screen name="ThongTinHoTroKhachHang" component={ThongTinHoTroKhachHang} options={{ headerShown: false }} />

        <Stack.Screen name="BaoMatThongTin" component={BaoMatThongTin} options={{ title: "Chính sách bảo mật" }} />

        <Stack.Screen name="CamKetFpoly" component={CamKetFpoly} options={{ headerShown: false }} />

        <Stack.Screen name="DieuKienGiaoDich" component={DieuKienGiaoDich} options={{ title: "Điều kiện giao dịch chung" }} />

        <Stack.Screen name="VeChungToi" component={VeChungToi} options={{ title: "Giới thiệu" }} />

        <Stack.Screen name="HeThongSalon" component={HeThongSalon} options={{ title: "Hệ thống salon" }} />


      </Stack.Navigator>
    </NavigationContainer>

  );
}




// screenOptions={{headerShown:false,tabBarStyle:styles.tabBar}}
const HomeTab = (props) => {
  return (
    <Tabb.Navigator screenOptions={{ headerShown: false, tabBarStyle: styles.tabBar, tabBarShowLabel: false }}>
      <Tabb.Screen name='Home' component={Home} initialParams={{ id: props.route.params.id }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 3 }}>
              <Image source={require('./Images/homee.png')} style={{ width: 25, height: 25, tintColor: focused ? '#CD853F' : '#778899' }} resizeMode="stretch" />
              <Text style={{ color: focused ? '#CD853F' : '#778899', fontSize: 12 }}>Home</Text>
            </View>
          ),

        }}
      />

      <Tabb.Screen name='TabGroupProduct' component={TabGroupProduct} initialParams={{ id: props.route.params.id }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 3 }}>
              <Image source={require('./Images/shopping.png')} style={{ width: 25, height: 25, tintColor: focused ? '#CD853F' : '#778899' }} resizeMode="stretch" />
              <Text style={{ color: focused ? '#CD853F' : '#778899', fontSize: 12 }}>Mua sắm</Text>
            </View>
          ),
        }}
      />

      <Tabb.Screen name='DatLich' component={DatLich}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", bottom: 3, tintColor: focused ? 'black' : 'white', backgroundColor: focused ? '#CD853F' : '#778899', borderRadius: 100, height: 60, width: 60 }}>
              <Image source={require('./Images/timetable.png')} style={{ width: 25, height: 25, tintColor: 'white' }} resizeMode="stretch" />
              <Text style={{ color: 'white', fontSize: 12 }}>Đặt lịch</Text>
            </View>
          ),
        }}
      />

      <Tabb.Screen name='KhamPha' component={KhamPha} initialParams={{ id: props.route.params.id }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 3 }}>
              <Image source={require('./Images/icons8-eventidea-50.png')} style={{ width: 25, height: 25, tintColor: focused ? '#CD853F' : '#778899' }} resizeMode="stretch" />
              <Text style={{ color: focused ? '#CD853F' : '#778899', fontSize: 12 }}>Khám phá</Text>
            </View>
          ),
        }}
      />

      <Tabb.Screen name='Profile' component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 3 }}>
              <Image source={require('./Images/ava.png')} style={{ width: 25, height: 25, tintColor: focused ? '#CD853F' : 'gray' }} resizeMode="stretch" />
              <Text style={{ color: focused ? '#CD853F' : 'gray', fontSize: 12 }}>Tài khoản</Text>
            </View>
          ),
        }}
      />



    </Tabb.Navigator>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    padding: 0,
    height: 66,
    marginTop: 60,
    backgroundColor: "white",
    borderTopColor: "transparent",
    shadowColor: "dark",
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },

})