import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { AsyncStorage } from 'react-native';
import ip from '../IP';

const QuenMatKhau = (props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDone, setIsDone] = useState(false);


  const handleUpdatePassword = async () => {
    try {
      if (!oldPassword || !newPassword || !confirmPassword) {
        Alert.alert('Error', 'Vui lòng nhập đầy đủ thông tin.');
        return;
      }
      if (newPassword !== confirmPassword) {
        Alert.alert('Error', 'Mật khẩu mới và xác nhận mật khẩu mới không khớp.');
        return;
      }
      if (oldPassword !== props.route.params.oldPassword) {
        Alert.alert('Error', 'Mật khẩu cũ không đúng');
        return;
      }

      // Show loading indicator
      setIsDone(true);

      const url_api = `http://${ip}:3000/apiuser/updatePassword/${props.route.params.userId}`;
      const response = await fetch(url_api, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Mật khẩu đã được cập nhật thành công');
        // Update AsyncStorage with the new password
        // Remove the old password from storage
        await AsyncStorage.removeItem('pass');
        // Reset component state
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        // Redirect to the login screen
        props.navigation.navigate('Login');
      } else {
        const errorMessage = await response.text();
        Alert.alert('Error', `Cập nhật mật khẩu không thành công: ${errorMessage}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Đã xảy ra lỗi kết nối');
      
    } finally {
      // Hide loading indicator
      setIsDone(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>QuenMatKhau</Text>

      <TextInput
        placeholder="Nhập mật khẩu cũ"
        secureTextEntry
        
        onChangeText={(text) => setOldPassword(text)}
        style={styles.input}
       
      />
      <TextInput
        placeholder="Nhập mật khẩu mới"
        secureTextEntry
        
        onChangeText={(text) => setNewPassword(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Xác nhận mật khẩu mới"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        style={styles.input}
      />
      <Button title="Cập nhật mật khẩu" onPress={handleUpdatePassword} />
      {isDone && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    padding: 10,
    width: 200,
  },
});

export default QuenMatKhau;
