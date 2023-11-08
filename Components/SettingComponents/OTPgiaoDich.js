import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import ip from '../../IP';


const OTPgiaoDich = ({ route }) => {



  const numberOfInputs = 4;
  const inputs = Array.from({ length: numberOfInputs * 2 }, () => useRef(null));
  const [otp, setOTP] = useState(Array(numberOfInputs).fill(''));
  const [confirmOTP, setConfirmOTP] = useState(Array(numberOfInputs).fill(''));

  const handleOTPInputChange = (text, index) => {
    const newInputs = [...otp];
    newInputs[index] = text;
    setOTP(newInputs);

    // Di chuyển đến ô nhập tiếp theo nếu có kí tự được nhập, theo thứ tự từ trái sang phải và từ trên xuống dưới
    const nextIndex = index + 1;
    if (text.length === 1 && index < numberOfInputs - 1) {
      const nextRow = nextIndex < numberOfInputs ? 0 : 1;
      const nextInputIndex = (nextIndex % numberOfInputs) + nextRow * numberOfInputs;
      inputs[nextInputIndex].current?.focus();
    } else if (text.length === 0 && index > 0) {//check xóa từ trái sang phải
      const prevRow = index < numberOfInputs ? 0 : 1;
      const prevInputIndex = ((index - 1) % numberOfInputs) + prevRow * numberOfInputs;
      inputs[prevInputIndex].current?.focus();
    }
  };
  const handleConfirmOTPChange = (text, index) => {
    const newInputs = [...confirmOTP];
    newInputs[index] = text;
    setConfirmOTP(newInputs);


    if (text.length === 1 && index < numberOfInputs - 1) {
      const nextRow = index < numberOfInputs ? 1 : 0;
      const nextInputIndex = ((index + 1) % numberOfInputs) + nextRow * numberOfInputs;
      inputs[nextInputIndex].current?.focus();
    } else if (text.length === 0 && index >= 0) {//check xóa từ trái sang phải 
      const prevRow = index < numberOfInputs ? 1 : 0;
      const prevInputIndex = ((index - 1) % numberOfInputs) + prevRow * numberOfInputs;
      inputs[prevInputIndex].current?.focus();
    }
  };
  const updateOTP = () => {

    // Kiểm tra xem có ô TextInput nào rỗng không
    const isAnyEmpty = otp.some(value => value === '');

    if (isAnyEmpty) {
      alert('Vui lòng điền đầy đủ mã OTP.');
      return; // Ngăn người dùng cập nhật nếu có ô TextInput rỗng
    }
    const updatedOTP = otp.join('');
    const updatedConfirmOTP = confirmOTP.join('');
    if (updatedOTP !== updatedConfirmOTP) {
      alert('Mã xác nhận không khớp với mã OTP.');
      return;
    }

    // Ví dụ với fetch API
    fetch('http://' + ip + ':3000/apiuser/updateOTP/' + route.params.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp: updatedOTP }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Update success:', data);
        setOTP(Array(numberOfInputs).fill(''));
        setConfirmOTP(Array(numberOfInputs).fill(''));
        // Xử lý khi cập nhật thành công
      })
      .catch(error => {
        console.error('Update failed:', error);
        // Xử lý khi cập nhật thất bại
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {inputs.slice(0, numberOfInputs).map((input, index) => (
          <TextInput
            key={index}
            ref={input}
            style={styles.input}
            value={otp[index]}
            onChangeText={(text) => handleOTPInputChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

      <View style={styles.inputContainer}>
        {inputs.slice(numberOfInputs).map((input, index) => (
          <TextInput
            key={index + numberOfInputs}
            ref={input}
            style={styles.input}
            value={confirmOTP[index]}
            onChangeText={(text) => handleConfirmOTPChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>
      <Button title="Cập nhật OTP" onPress={updateOTP} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 50,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },
});

export default OTPgiaoDich;
