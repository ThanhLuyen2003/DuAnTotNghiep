import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ComfirmData = (props) => {
    return (
        <View>
            <Text>{props.route.params.price}</Text>
            <Text>{props.route.params.content}</Text>

        </View>
    )
}

export default ComfirmData;

const styles = StyleSheet.create({})