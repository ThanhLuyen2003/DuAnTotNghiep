import React from "react";
import { View, Image, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, ImageBackground } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Onboarding from 'react-native-onboarding-swiper';
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const Home = (props) => {
    const { navigation } = props
    const profile = () => {
        navigation.navigate("Profile")
    }
    return (
        <SafeAreaView>



            <View style={{ height: '70%', width: '100%', backgroundColor: 'yellow' }}>

            </View>

        </SafeAreaView>

    );
}

export default Home;

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    verticalLayout: {
        flexDirection: "column",
    },
    horizontalLayout: {
        flexDirection: "row",
        marginLeft: 40,
        marginTop: 20,
    },
    item: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 20,
    },
    iconContainer: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 50
    },
    icon: {
        width: 30,
        height: 30,
    },
    itemText: {
        marginTop: 5,
        textAlign: "center",
    },
    menuContainer: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    viewTrainghiem: {
        backgroundColor: "#FFFFFF",
        width: 350,
        height: 300,
        borderRadius: 10,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
    },
    viewTopsp: {
        textAlign: "center",
        backgroundColor: "#FFFFFF",
        width: 130,
        height: 190,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
    },

    viewCamket: {
        backgroundColor: "#FFFFFF",
        width: 350,
        height: 120,
        marginTop: 20,
        marginLeft: 20,
    },

    viewminitopsp: {
        height: 25,
        width: 130,
        backgroundColor: "rgba(251, 154, 69, 0.8)",
    },
    trainghiemSrcoll: {
        textAlign: "center",
    },
    menuItem: {
        flex: 1,
        marginRight: 10,
    },
    menuItemTrainghiem: {
        flex: 2,
        marginRight: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    menuItemImage: {
        marginLeft: 20,
        width: 350,
        height: 100,
        borderRadius: 10,
    },
    menuTrainghiem: {
        marginLeft: 20,
        width: 100,
        height: 100,
        marginTop: 15,
        borderRadius: 10,
    },
    textTrainghiem: {
        fontSize: 17,
        marginLeft: 5,
    },
    textTrainghiem2: {
        fontSize: 14,
        marginLeft: 5,
    },
    Imagetopsp: {
        marginLeft: 15,
        width: 100,
        height: 100,
    },

});
