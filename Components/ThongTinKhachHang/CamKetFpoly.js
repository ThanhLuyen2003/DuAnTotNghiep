import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CamKetFpoly = (props) => {
  const [userInfor, setUserInfor] = useState({});
  const [saveImage, setsaveImage] = useState();

  const getLoginInfor = async () => {

    const user = await AsyncStorage.getItem('loginInfo');
    const m_saveImage = await AsyncStorage.getItem('savedImage')

    setUserInfor(JSON.parse(user))
    setsaveImage(m_saveImage);

  }
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // cập nhật giao diện ở đây
      getLoginInfor();


    });

    return unsubscribe;
  }, [props.navigation]);
  return (
    <ScrollView style={{ width: "100%", height: "100%" }}>
      <View style={{ width: "100%", height: 50, backgroundColor: "white", justifyContent: "center", borderBottomWidth: 0.5, borderBottomColor: "#CCCCCC" }}>
        <Pressable onPress={() => { props.navigation.navigate("ThongTinHoTroKhachHang",{avatar:saveImage,name:userInfor.name}) }}>
          <Icons name='arrow-left' size={30} />
        </Pressable>
      </View>
      <View style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>CAM KẾT FPOLY CARE</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image style={{width:"100%"}} height={400} source={{ uri: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/15/871184/Cat-Toc-2.jpeg" }} />
        <Text style={{ position: "absolute", bottom: 50, color: "white", fontWeight: "bold" }}>VÌ FPOLY TIN CHẤT LƯỢNG PHỤC VỤ LÀ HÀNG ĐẦU</Text>
        <Text style={{ position: "absolute", bottom: 30, color: "white" }}>Áp dụng tại salon bất kỳ toàn hệ thống Fpoly Barber</Text>
      </View>
      <View style={{ width: "100%", padding: 10, margin: 10, borderBottomWidth: 0.5, borderBottomColor: "#CCCCCC" }}>
        <Text style={{ fontWeight: "bold" }}>7 ngày chỉnh sửa tóc miễn phí</Text>
        <Text style={{ marginTop: 10 }}>Nếu anh chưa hài lòng về kiểu tóc sau khi về nhà vì bất kỳ lý do gì, Fpoly sẽ hỗ trợ anh sửa lại mái tóc đó hoàn toàn miễn phí trong vòng 7 ngày. Anh đặt lịch bình thường và báo sửa tóc với lễ tân.</Text>
      </View>
      <View style={{ width: "100%", padding: 10, margin: 10, borderBottomWidth: 0.5, borderBottomColor: "#CCCCCC" }}>
        <Text style={{ fontWeight: "bold" }}>30 ngày đổi/trả hàng miễn phí</Text>
        <Text style={{ marginTop: 10 }}>Tất cả các sản phẩm mua tại Fply anh có thể đổi hoặc trả lại hoàn toàn MIỄN PHÍ (hoàn lại 100% số tiền) trong vòng 30 ngày kể từ thời điểm mua hàng, ngay cả khi sản phẩm đó đã qua sử dụng.
          Cam kết: Hoàn lại 100% tiền.</Text>
      </View>
      <View style={{ width: "100%", padding: 10, margin: 10, borderBottomWidth: 0.5, borderBottomColor: "#CCCCCC" }}>
        <Text style={{ fontWeight: "bold" }}>7 ngày bảo hành Uốn/Nhuộm</Text>
        <Text style={{ marginTop: 10 }}>Mái tóc sau khi uốn nhuộm có thể không đúng ý anh sau khi về nhà. FPoly sẽ hỗ trợ anh chỉnh sửa hoàn toàn miễn phí trong vòng 7 ngày. Anh đặt lịch bình thường và chọn dịch vụ bảo hành hoặc báo lễ tân.</Text>
      </View>
      <View style={{ width: "100%", padding: 10, margin: 10, borderBottomWidth: 0.5, borderBottomColor: "#CCCCCC" }}>
        <Text style={{ fontWeight: "bold" }}>Giảm 20% nếu chờ đợi lâu</Text>
        <Text style={{ marginTop: 10 }}>Fpoly cam kết phục vụ anh đúng giờ đặt lịch. Nếu anh phải chờ lâu hơn 20 phút so với giờ đặt lịch, Fpoly sẽ giảm giá ngay 20% cho hoá đơn Shine Combo.
          Áp dụng: Khi anh đến đúng giờ đã đặt. Thời gian chờ được tính từ lúc checkin tới lúc bắt đầu gội. Trừ trường hợp salon xảy ra sự cố bất khả kháng như mất điện, nước.</Text>
      </View>
      <View style={{ width: "100%", padding: 10, margin: 10 }}>
        <Text style={{ fontWeight: "bold" }}>CHỈ TRONG 2 GIỜ BỌN EM SẼ HỖ TRỢ ANH NGAY</Text>
        <Text style={{ marginTop: 10 }}>Nếu các anh chưa được báo giá, thông tin dịch vụ rõ ràng, minh bạch trước khi sử dụng chúng em xin phép hoàn trả ngay 100% giá trị anh đã thanh toán
          Kiểu tóc mới chưa quen mắt hay anh cần chỉnh lại, thay đổi bất cứ điều gì nếu chưa đến kịp Salon anh yên tâm, chúng em có đôi ngũ đến tận nhà chỉnh lại ngay chỉ trong 2 giờ
          Ngoài ra, bất cứ 1 điều gì trong trải nghiệm như thái độ nhân sự chưa chu đáo, không gian Salon, thời gian chờ lâu hay các vấn đề sức khoẻ về da, tóc (100% Sản phẩm sử dụng tại Fpoly đều có nguồn gốc rõ ràng và công bố kiểm định tại Việt Nam) anh đừng ngần ngại cho chúng em biết nhé.</Text>
      </View>
    </ScrollView>
  )
}

export default CamKetFpoly

const styles = StyleSheet.create({})