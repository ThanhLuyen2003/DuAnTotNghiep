import { StyleSheet, Text, View, ImageBackground, Image, ScrollView } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

const Profile = (props) => {
    return (
        <ImageBackground blurRadius={2} style={{ flex: 1 }} source={require('../Images/nenbarber.jpg')}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                </View>

                <View style={{ flex: 2, backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ position: "absolute", top: -50, justifyContent: 'center', width: "100%", alignItems: "center" }}>
                        <Image style={{ width: 96, height: 96, borderRadius: 50 }} source={require('../Images/Barbershop.png')} />
                        <Text style={{fontWeight:"bold",fontSize:20}}>Nguyễn Quang Huy</Text>
                        <Text style={{fontSize:15}}>huynqph23996@fpt.edu.vn</Text>
                        <Text style={{fontSize:15}}>+84 45628285</Text>
                    </View>
                   
                    <ScrollView style={{marginTop:120}}>
                    <View style={{ margin: 5,  marginLeft: 10, backgroundColor: '#CD853F', borderRadius: 5 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Tài khoản</Text>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 10, padding: 5 }}>
                        <Icons name='shopping' size={25} color={'#CD853F'} />
                        <Text style={{ marginLeft: 10, width: 200 }}>Đơn hàng</Text>
                        <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                    </View>
                    <View style={{ flexDirection: 'row', margin: 10, padding: 5 }}>
                        <Icons name='sale' size={25} color={'#CD853F'} />
                        <Text style={{ marginLeft: 10, width: 200 }}>Ưu đãi</Text>
                        <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                    </View>
                    <View style={{ flexDirection: 'row', margin: 10, padding: 5 }}>
                        <Icons name='face-agent' size={25} color={'#CD853F'} />
                        <Text style={{ marginLeft: 10, width: 200 }}>Trợ giúp, hỗ trợ yêu cầu</Text>
                        <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                    </View>
                    <View style={{ flexDirection: 'row', margin: 10, padding: 5 }}>
                        <Icons name='map-marker-check' size={25} color={'#CD853F'} />
                        <Text style={{ marginLeft: 10, width: 200 }}>Địa điểm salon</Text>
                        <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                    </View>
                    <View style={{ flexDirection: 'row', margin: 10, padding: 5 }}>
                        <Icons name='bell-badge' size={25} color={'#CD853F'} />
                        <Text style={{ marginLeft: 10, width: 200 }}>Thông báo</Text>
                        <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                    </View>
                    <View style={{ margin: 5, marginLeft: 10, backgroundColor: '#CD853F', borderRadius: 5 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Settings</Text>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 10, padding: 5 }}>
                        <Icons name='information' size={25} color={'#CD853F'} />
                        <Text style={{ marginLeft: 10, width: 200 }}>Điều khoản và dịch vụ</Text>
                        <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                    </View>
                    <View style={{ flexDirection: 'row', margin: 10, padding: 5 }}>
                        <Icons name='logout' size={25} color={'#CD853F'} />
                        <Text style={{ marginLeft: 10, width: 200 }}>Đăng xuất</Text>
                        <Icons style={{ paddingLeft: 120 }} name='chevron-right' size={25} color={'#CD853F'} />
                    </View>
                    
                    </ScrollView>
                   
                </View>
            </View>
        </ImageBackground>
    )
}

export default Profile

const styles = StyleSheet.create({})