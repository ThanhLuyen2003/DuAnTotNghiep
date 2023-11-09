import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const VeChungToi = (props) => {
  return (
    <View>
      <View style={{width:"100%",padding:20}}>
        <Image source={{uri:"https://i.pinimg.com/564x/0b/b7/af/0bb7afd6a2596aadc215cd7ce77e6000.jpg"}}  width={"100%"} height={150} style={{opacity:0.5,borderRadius:20}}/>
      </View>
    </View>
  )
}

export default VeChungToi

const styles = StyleSheet.create({})