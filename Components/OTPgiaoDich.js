import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useRef } from 'react';
const OTPgiaoDich = () => {
    const [phone, setPhone] = useState('');
    const numberOfInputs = 6; // Số lượng ô nhập trong mã OTP
    const inputs = Array.from({ length: numberOfInputs }, () => useRef());
    const handleOTPInputChange = (text, index) => {
        if (text.length === 1) {
          // Di chuyển tới ô nhập tiếp theo nếu có kí tự được nhập
          if (index < numberOfInputs - 1) {
            inputs[index + 1].current.focus();
          }
        } else if (text.length === 0) {
          // Di chuyển tới ô nhập trước đó nếu kí tự được xóa
          if (index > 0) {
            inputs[index - 1].current.focus();
          }
        }
      };

  return (
    <View style={styles.container}>
    {
      inputs.map((input, index) => (
        <TextInput
          key={index}
          ref={input}
          style={styles.input}
          onChangeText={(text) => handleOTPInputChange(text, index)}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
        />
      ))
    }
  </View>
  )
}

export default OTPgiaoDich

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
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
})