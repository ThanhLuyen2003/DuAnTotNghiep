import { View, Image, StyleSheet, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, TouchableHighlight, ScrollView, } from "react-native";
import { useState } from "react";
import React from "react";
const Ingredient = ({route}) => {



    return (
        
        <View style={styles.container}>
            {/* <Text>{props.children}</Text> */}
            <Text>{route.params.ingredient}</Text>
        </View>
       
    )
}

export default Ingredient

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#CCCCCC"

    }
})