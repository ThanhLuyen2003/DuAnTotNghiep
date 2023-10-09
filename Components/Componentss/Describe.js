import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Describe = ({route}) => {
    // console.log(route);
  return (
    <View style={styles.container}>
      <Text>{route.params.describe}</Text>
    </View>
  )
}

export default Describe

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        padding:10,
        borderWidth:1,
        borderColor:"#CCCCCC"
        
    }
})