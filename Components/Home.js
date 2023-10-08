import React from "react";
import { View, Image, StyleSheet, Text, TextInput, SafeAreaView, ScrollView } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'


const Home = (props) => {
    const { navigation } = props
    const profile = () => {
        navigation.navigate("Profile")
    }
    return (

        <SafeAreaView>
            <View style={{ backgroundColor: 'rgba(251, 154, 69, 0.8)', width: "100%", height: 60, flexDirection: "row", alignItems: "center" }}>
                <View >
                    <Icons style={{ position: "absolute", left: 25, zIndex: 1, top: 7 }} name="magnify" size={25} color="#363636" />
                    <TextInput placeholder="Tìm dịch vụ, cửa hàng, địa điểm,.." style={{ width: 250, height: 40, backgroundColor: "#F8F8FF", left: 20, borderRadius: 10, paddingLeft: 28 }} />

                    <Icons style={{ position: "absolute", left: 375, zIndex: 1, top: 7, }} name="cart" size={25} color="#363636" />
                    <Icons style={{ position: "absolute", left: 340, zIndex: 1, top: 7, }} name="bell-badge" size={25} color="#363636" />
                </View>

            </View>

            <ScrollView horizontal>

            </ScrollView>




        </SafeAreaView>

    );
}

export default Home;