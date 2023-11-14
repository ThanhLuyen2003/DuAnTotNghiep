import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DieuKienGiaoDich = () => {
  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>ĐIỀU KIỆN GIAO DỊCH CHUNG {"\n"} TRÊN APP FPOLY BARBER</Text>
      </View>
      <View style={{ width: "100%", padding: 10 }}>
        <Text style={{ fontWeight: "bold" }}>I.Thông tin về điều kiện giao dịch chung</Text>
        <Text>1.Khách hàng của website shop.polybarber.com (sau đây gọi tắt là “polybarberstore”) là các cá nhân, tổ chức không giới hạn giới tính hay phạm vi địa lý, có nhu cầu mua mỹ phẩm dành cho nam giới.</Text>
        <Text>2.Chính sách hoàn trả:{"\n"}* polybarberstore miễn phí đổi trả sản phẩm trong vòng 03 ngày kể từ ngày mua hàng, kể cả sản phẩm đã qua sử dụng. </Text>
        <Text>* Phương thức hoàn trả: Đổi trả tại salon bất kỳ trên toàn hệ thống.{"\n"}* Cách thức lấy lại tiền: Nếu khách hàng không muốn đổi sang sản phẩm khác thì Khách hàng được hoàn lại 100% số tiền đã mua hàng.{"\n"}* Chi phí hoàn trả: Khách hàng phải mang sản phẩm đổi trả tới salon, khách hàng không phải trả bất kỳ một khoản phí đổi trả nào.</Text>
        <Text>3.Chính sách bảo hành sản phẩm:{"\n"}Sản phẩm cam kết đảo bảo chất lượng do Nhà sản xuất đưa ra trong suốt thời hạn sử dụng.{"\n"}Nếu sản phẩm lỗi do nhà sản xuất hoặc gây ra bất cứ dị ứng nào đối với khách hàng, khách hàng vui lòng liên hệ vào số hotline: 1900.27.27.30 để được tiếp nhận thông tin và giải quyết.{"\n"}30shinestore và Nhà sản xuất sẽ tiến hành xác minh thông tin và giải quyết vụ việc trong vòng 45 ngày kể từ ngày tiếp nhận thông tin.</Text>
        <Text>4.Nghĩa vụ của shop.30shine.com và nghĩa vụ của khách hàng trong mỗi giao dịch.{"\n"}Nghĩa vụ của 30shinestore:{"\n"}- Đảm bảo giao hàng đúng thời gian đã cam kết,{"\n"}- Đảm bảo giao hàng đúng địa điểm khách hàng cung cấp khi mua hàng,{"\n"}- Đảm bảo hàng hóa đạt chất lượng đúng thông tin đã cung cấp cho khách hàng trên website.{"\n"}- Đảm bảo hàng hóa còn hạn sử dụng.{"\n"}Nghĩa vụ của khách hàng:{"\n"}- Nhận hàng đúng địa điểm đã cung cấp cho 30shinestore;{"\n"}- Nghe điện thoại và nhận hàng đúng thời gian đã thỏa thuận;{"\n"}- Thanh toán tiền hàng ngay khi nhận hàng.{"\n"}- Cung cấp đầy đủ thông tin liên quan tới quá trình sử dụng sản phẩm khi khiếu nại về chất lượng hàng hóa.{"\n"}- Tuân thủ các quy định của 30shinestore khi đổi trả hàng.</Text>
        <Text>5.Thông tin về vận chuyển và giao nhận{"\n"}- Phương thức giao hàng: giao hàng tại địa chỉ khách hàng cung cấp trong đơn đặt hàng và thu tiền tận nơi.{"\n"}- Thời gian giao hàng:{"\n"}+ Đối với khách hàng tại khu vực Hà Nội và TP HCM: giao hàng trong 24 giờ kể từ thời điểm đặt hàng.{"\n"}+ Đối với khách hàng tại tỉnh/thành phố khác: giao hàng trong 02-05 ngày ngày kể từ thời điểm đặt hàng.{"\n"}Trường hợp do sự kiện bất khả kháng 30Shine không thể giao hàng đúng thời gian nêu trên, 30shine đồng ý cho khách hàng hủy đơn hàng bằng cách: khi shipper gọi điện giao hàng, khách hàng thông báo hủy đơn hàng và không nhận hàng.</Text>
        <Text>6.Phương thức thanh toán:{"\n"}- Khách hàng thanh toán bằng hình thức trả tiền mặt khi nhận hàng.{"\n"}Website không có chức năng thanh toán trực tuyến.</Text>
        <Text>II.Miễn trừ trách nhiệm trong trường hợp phát sinh lỗi kỹ thuật của website shop.30shine.com{"\n"}- shop.30shine.com cam kết nỗ lực đảm bảo website hoạt động an toàn, ổn định và liên tục. Tuy nhiên, trong trường hợp website phát sinh lỗi kỹ thuật như: lỗi phần mềm, lỗi hệ thống đường truyền Internet hoặc các lỗi khách quan khác dẫn đến Khách hàng không thể đặt hàng trên website, Khách hàng vui lòng thông báo ngay và kịp thời cho 30shine, Chúng tôi sẽ khắc phục lỗi trong thời gian sớm nhất.{"\n"}- shop.30shine.com không chịu trách nhiệm giải quyết các khiếu nại của Khách hàng phát sinh trong trường hợp website shop.30shine.com phát sinh lỗi kỹ thuật, lỗi phần mềm, hệ thống đường truyền Internet hoặc các lỗi khác không do shop.30shine.com gây ra.</Text>
        <Text>III.Miễn trừ trách nhiệm trong trường hợp bất khả kháng{"\n"}- Bất khả kháng là những sự kiện xảy ra một cách khách quan, không thể lường trước và không thể kiểm soát được mặc dù đã áp dụng mọi biện pháp cần thiết mà khả năng cho phép.{"\n"}- Những trường hợp được coi là sự kiện bất khả kháng, bao gồm nhưng không giới hạn như: động đất, lũ lụt, hạn hán, cháy, nổ, dịch bệnh, thảm họa, thiên tai, chiến tranh, khủng bố, đình công, phá sản, thay đổi quy định của pháp luật… hoặc những sự kiện không thể lường trước được và không có nghĩa vụ phải biết trước dẫn đến việc không thể tiếp tục thực hiện hay có thể ảnh hưởng nghiêm trọng tới khả năng cung cấp hàng, giao/nhận hàng thì trách nhiệm của các bên sẽ được miễn trừ.{"\n"}Bên bị ảnh hưởng bởi sự kiện bất khả kháng có nghĩa vụ chứng minh.</Text>
      </View>
    </ScrollView>
  )
}

export default DieuKienGiaoDich

const styles = StyleSheet.create({})