import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChiTietKhamPha = ({route}) => {
   
  return (
    <ScrollView >
        <View>
            <Text style={{fontSize:30,fontWeight:"bold",margin:10,alignSelf:"center"}}>{route.params.Detail3}</Text>
        </View>
      <View style={{padding:10}}>
        <Text style={{fontWeight:"bold"}}>{route.params.Detail1}</Text>
        <Text >{route.params.Detail2}</Text>
        <Image style={{width:"100%",height:400}} source={{uri:route.params.image1}}/>
      </View>
      

    </ScrollView>
  )
}

export default ChiTietKhamPha

const styles = StyleSheet.create({})