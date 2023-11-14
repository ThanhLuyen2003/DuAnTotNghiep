import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
const VeChungToi = (props) => {
  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={{ width: "100%", padding: 20 }}>
        <Image source={{ uri: "https://i.pinimg.com/564x/0b/b7/af/0bb7afd6a2596aadc215cd7ce77e6000.jpg" }} height={150} style={{ opacity: 0.5, borderRadius: 20 }} />
      </View>
      <View style={{ flexDirection: "row", padding: 20, alignItems: "center" }}>
        <Text style={{ width: 8, height: 20, backgroundColor: "#CD853F" }}></Text>
        <Text style={{ marginLeft: 5, fontWeight: "bold" }}>GIỚI THIỆU VỀ FPOLY BARBER</Text>
      </View>
      <View style={{ paddingLeft: 20, }}>
        <Text>Công ty cổ phần thương mại & dịch vụ Fpoly là nền tảng (lifestyle platform) phục vụ nhu cầu cắt tóc, gội đầu (relax), spa và cung cấp đa dạng sản phẩm chất lượng cao dành riêng cho nam giới.</Text>
      </View>
      <View style={{ paddingLeft: 20, marginTop: 20 }}>
        <Text>Fpoly đầu tư mạnh mẽ vào nền tảng công nghệ giúp nâng cao trải nghiệm dịch vụ, hiệu suất vận hành, đồng thời liên tục nghiên cứu và phát triển các dịch vụ và trải nghiệm mới phù hợp với nhu cầu khách hàng nam giới hiện đại.</Text>
      </View>
      <View style={{ padding: 20, marginTop: 20, width: "100%" }}>
        <Image source={{ uri: "https://i.pinimg.com/236x/96/2e/3a/962e3a25078ef898c4eb9ed7a4ab96c1.jpg" }} height={200} style={{ borderRadius: 20, opacity: 0.9 }} />
        <Image source={{ uri: "https://i.pinimg.com/564x/d2/12/ac/d212acb7c9e33083d98d89dce0fc6141.jpg" }} height={200} style={{ borderRadius: 20, opacity: 0.9, top: 20 }} />
        <Image source={{ uri: "https://i.pinimg.com/564x/4b/da/2e/4bda2eec6a704a66d7f9cb3cf0738193.jpg" }} height={200} style={{ borderRadius: 20, opacity: 0.9, top: 40 }} />
      </View>
      <View style={{ flexDirection: "row", padding: 20, alignItems: "center", marginTop: 20 }}>
        <Text style={{ width: 8, height: 20, backgroundColor: "#CD853F" }}></Text>
        <Text style={{ marginLeft: 5, fontWeight: "bold" }}>SỨ MỆNH</Text>
      </View>
      <View style={{ paddingLeft: 20, }}>
        <Text>Fpoly không ngừng quan tâm và lan tỏa niềm tin tới mọi người để cùng đổi mới và có cuộc sống ý nghĩa hơn.</Text>
      </View>
      <View style={{ flexDirection: "row", padding: 20, alignItems: "center", marginTop: 20 }}>
        <Text style={{ width: 8, height: 20, backgroundColor: "#CD853F" }}></Text>
        <Text style={{ marginLeft: 5, fontWeight: "bold" }}>TẦM NHÌN</Text>
      </View>
      <View style={{ paddingLeft: 20, }}>
        <Text>Với Khách hàng: Fpoly là một nền tảng cho nam giới hiện đại (LifeStyle Platform for Men) thỏa mãn đa dạng nhu cầu của hàng triệu khách hàng.</Text>
      </View>
      <View style={{ paddingLeft: 20, top: 20 }}>
        <Text>Với Anh em: Fpoly là một môi trường năng động, nơi anh em có thể tự hào, thỏa sức học hỏi, cống hiến để vươn tới cuộc sống sung túc và hạnh phúc.</Text>
      </View>
      <View style={{ width: "90%", height: 150,padding:5, borderWidth: 0.5, borderColor: "#CD853F", top: 40, marginLeft: 20,flexDirection:"row",borderRadius:20 }}>
        <View style={{justifyContent:"center",alignItems:"center",width:"30%"}}>
          <Icons name='new-box' size={60} style={{fontWeight:"bold"}} color={"#CD853F"}/>
          <Text style={{fontWeight:"bold"}}>Đổi mới</Text>
        </View>
        <View style={{ flexDirection: "column",alignItems:"center",width:"70%",justifyContent:"center" }}>
          <Text><Text style={{fontWeight:"bold"}}>*</Text> Luôn tin có góc nhìn và cách làm khác tốt hơn trong mọi tình huống</Text>
          <Text><Text style={{fontWeight:"bold"}}>*</Text> Đề cao những giải pháp CTM-KNR</Text>
        </View>
      </View>
      <View style={{ width: "90%",marginTop:20, height: 150,padding:5, borderWidth: 0.5, borderColor: "#CD853F", top: 40, marginLeft: 20,flexDirection:"row",borderRadius:20 }}>
        <View style={{justifyContent:"center",alignItems:"center",width:"30%"}} >
          <Icons name='account' size={60} style={{fontWeight:"bold"}} color={"#CD853F"}/>
          <Text style={{fontWeight:"bold"}}>Quan tâm</Text>
        </View>
        <View style={{ flexDirection: "column",alignItems:"center",width:"70%",justifyContent:"center" }}>
          <Text><Text style={{fontWeight:"bold"}}>*</Text> Làm thêm chút nữa mang lại giá trị cho mọi người</Text>
          
        </View>
      </View>
      <View style={{ width: "90%",marginTop:20, height: 150,padding:5, borderWidth: 0.5, borderColor: "#CD853F", top: 40, marginLeft: 20,flexDirection:"row",borderRadius:20 }}>
        <View style={{justifyContent:"center",alignItems:"center",width:"30%"}}>
          <Icons name='book' size={60} style={{fontWeight:"bold"}} color={"#CD853F"}/>
          <Text style={{fontWeight:"bold"}}>Ham học{"\n"}     hỏi</Text>
        </View>
        <View style={{ flexDirection: "column",alignItems:"center",width:"70%",justifyContent:"center" }}>
          <Text><Text style={{fontWeight:"bold"}}>*</Text> Chia sẻ kiến thức, kinh nghiệm với mọi người cũng là học tập</Text>
          <Text><Text style={{fontWeight:"bold"}}>*</Text> Nhìn nhận lý thuyết, sách vở, kiến thức cũng quan trọng như thực tiễn, kinh nghiệm</Text>
        </View>
      </View>
      <View style={{ width: "90%",marginTop:20, height: 150,padding:5, borderWidth: 0.5, borderColor: "#CD853F", top: 40, marginLeft: 20,flexDirection:"row",borderRadius:20 }}>
        <View style={{justifyContent:"center",alignItems:"center",width:"30%"}}>
          <Icons name='comment-plus-outline' size={60} style={{fontWeight:"bold"}} color={"#CD853F"}/>
          <Text style={{fontWeight:"bold"}}> Chân thành</Text>
        </View>
        <View style={{ flexDirection: "column",alignItems:"center",width:"70%",justifyContent:"center" }}>
          <Text><Text style={{fontWeight:"bold"}}>*</Text> Tin rằng mọi người đều có thể "tỏa sáng"</Text>
         
        </View>
      </View>
    </ScrollView>
  )
}

export default VeChungToi

const styles = StyleSheet.create({})