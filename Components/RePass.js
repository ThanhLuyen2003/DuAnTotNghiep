import React, { useState } from "react";
import { View, Image, StyleSheet, Text, TextInput, SafeAreaView, ScrollView } from "react-native";
import { firebase } from "../Firebase";
import { testID } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";
import { TouchableOpacity } from "react-native";

const RePass = (props) => {

    const [email, setEmail] = useState("");

    const sendEmail = () => {
        console.log(email);
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert("Check email!");
                props.navigation.navigate('RePass2', { email: email });
            })
            .catch((e) => {
                alert(e);
            })
    }


    return (
        <View style={{ height: '100%', width: '100%', padding: 20, backgroundColor: 'white' }}>

            <Text style={styles.text}>
                Nhập email xác thực tài khoản!
            </Text>

            <View style={styles.email}>
                <TextInput style={{ marginTop: 20, }} placeholder="Email" onChangeText={(txt) => { setEmail(txt) }} />
            </View>

            <TouchableOpacity style={styles.hi} onPress={sendEmail}>
                <Text style={styles.hi2}>-{'>'} </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    email: {
        width: "auto",
        height: 50,
        borderBottomColor: "gray",
        borderBottomWidth: 0.5,
        marginTop: 20

    },
    text: {
        fontSize: 25,
        marginTop: 50
    },
    hi: {
        height: 50,
        backgroundColor: '#778899',
        width: 50,
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 20,
        alignSelf: 'flex-end',
        marginRight: 20
    },
    hi2: {
        marginTop: 10,
        fontSize: 20,
        color: 'white'
    }
})

export default RePass;