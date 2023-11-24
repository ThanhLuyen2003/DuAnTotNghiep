import React, { useState } from "react";
import { View, Image, StyleSheet, Text, TextInput, SafeAreaView, ScrollView } from "react-native";
import { firebase } from "../Firebase";
import { testID } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";
import { TouchableOpacity } from "react-native";
import ip from "../IP";

const RePass2 = (props) => {


    const [pass, setPass] = useState("");
    const email = props.route.params.email;

    const comfirmPass = async () => {

        let url = 'http://' + ip + ':3000/changePass/' + email;

        await firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((data) => {
                if (data) {

                    fetch(url, {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ pass: pass })
                    })
                        .then(async (res) => {
                            if (res.status === 200) {
                                alert("Đổi mật khẩu thành công");
                                props.navigation.navigate("Login");
                            } else {
                                alert("cut")
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });


                }
                else {
                    alert("Sai mật khẩu");
                }
            })
            .catch((e) => {
                alert("Sai mật khẩu " + e);

            })

    }


    return (
        <View style={{ height: '100%', width: '100%', padding: 20, backgroundColor: 'white' }}>

            <Text style={styles.text}>
                Xác nhận mật khẩu!
            </Text>

            <View style={styles.email}>
                <TextInput style={{ marginTop: 20, }} placeholder="Mật khẩu" onChangeText={(txt) => { setPass(txt) }} />
            </View>

            <TouchableOpacity style={styles.hi} onPress={comfirmPass}>
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

export default RePass2;