import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, ImageBackground, TouchableOpacity, Modal, SafeAreaView,Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import ip from '../IP';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { firebase } from "../Firebase";
const QuenMatKhau = (props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDone, setIsDone] = useState(false);

  const handleUpdatePassword = async () => {
    setIsDone(true)
    try {
      if (!oldPassword || !pass || !confirmPassword) {
        Alert.alert('Error', 'Vui lòng nhập đầy đủ thông tin.');
        return;
      }
      if (pass !== confirmPassword) {
        Alert.alert('Error', 'Mật khẩu mới và xác nhận mật khẩu mới không khớp.');
        return;
      }

      if (oldPassword !== props.route.params.oldPassword) {
        Alert.alert('Error', 'Mật khẩu cũ không đúng! Vui lòng thử lại');
        return;
      }

      const url_api = `http://${ip}:3000/apiuser/updatePassword/${props.route.params.userId}`;
      const response = await fetch(url_api, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, pass: pass }),
      });

      if (response.ok) {
        setIsDone(false)
        Alert.alert('Success', 'Mật khẩu đã được cập nhật thành công');
        
        await firebase.auth().signOut();  
        // Chú ý: Không cần đăng nhập lại với mật khẩu mới, vì đã đăng xuất và sẽ đăng nhập mới khi người dùng đăng nhập lại.
        props.navigation.navigate('Login');
      } else {
        const errorMessage = await response.text();
        Alert.alert('Error', `Cập nhật mật khẩu không thành công: ${errorMessage}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Đã xảy ra lỗi kết nối');
    }
  };


  return (
    <ImageBackground blurRadius={1} style={{ flex: 1 }} source={require('../Images/nenbarber.jpg')}>
      <SafeAreaView>

      <Modal
          animationType='fade'
          visible={isDone}
          transparent={true}
        >
          <View style={{ padding: 40, backgroundColor: 'black', marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', borderRadius: 20, opacity: 0.5 }}>
            <ActivityIndicator />
          </View>
        </Modal>
        <View style={{ justifyContent: 'center', width: "100%", alignItems: "center", marginTop: 50 }}>
          <Image style={{ width: 200, height: 200, borderRadius: 50 }} source={require('../Images/Barbershop.png')} />
        </View>

        <View style={styles.btn}>
        
        <Icons name="lock-reset" color="#FFF" size={30} style={{ marginTop: 8 }} />
          <TextInput
            placeholder="Nhập mật khẩu cũ"
            secureTextEntry
            value={oldPassword}
            onChangeText={(text) => setOldPassword(text)}
            style={styles.textinput}
            placeholderTextColor={"#F5F5F5"}
          />
        </View>

        <View style={{ height: 30 }}></View>

        <View style={styles.btn}>
          <Icons name="lock-check-outline" color="#FFF" size={30} style={{ marginTop: 8 }} />
          <TextInput
            placeholder="Nhập mật khẩu mới"
            secureTextEntry
            value={pass}
            onChangeText={(text) => setPass(text)}
            style={styles.textinput}
            placeholderTextColor={"#F5F5F5"}
          />
        </View>
        <View style={{ height: 30 }}></View>
        <View style={styles.btn}>
          <Icons name="lock-check-outline" color="#FFF" size={30} style={{ marginTop: 8 }} />
          <TextInput
            placeholderTextColor={"#F5F5F5"}
            
            placeholder="Xác nhận mật khẩu mới"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            style={styles.textinput}
          />
        </View>
        <TouchableOpacity onPress={handleUpdatePassword} style={{ backgroundColor: '#CD853F', width: '80%', height: 50, marginTop: 50, borderRadius: 50, alignItems: 'center', alignSelf: 'center' }}  >
          <Text style={{ color: 'white', fontSize: 20, marginTop: 10, }}>Cập nhật</Text>
        </TouchableOpacity>
      </SafeAreaView>

    </ImageBackground>





    // <Button title="Cập nhật mật khẩu" onPress={handleUpdatePassword} />

  );
};

const styles = StyleSheet.create({

  img: {
    width: 30,
    height: 30,
    marginTop: 5
  },
  btn: {
    width: 300,
    borderColor: 'white',
    borderWidth: 2,
    alignContent: 'center',
    alignSelf: 'center',
    height: 50,
    borderRadius: 5,
    flexDirection: 'row',
  },
  textinput: {
    width: 200,
    color: 'white',
    marginLeft: 10,

  }

});

export default QuenMatKhau;
