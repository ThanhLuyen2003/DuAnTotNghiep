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

            <View style={{ backgroundColor: 'rgba(251, 154, 69, 0.8)', width: "100%", height: 60, flexDirection: "row", alignItems: "center" }}>
                <View>
                    <Icons style={{ position: "absolute", left: 25, zIndex: 1, top: 7 }} name="magnify" size={25} color="#363636" />
                    <TextInput placeholder="Tìm dịch vụ, cửa hàng, địa điểm,.." style={{ width: 250, height: 40, backgroundColor: "#F8F8FF", left: 20, borderRadius: 10, paddingLeft: 28 }} />
                    {/* // ádcscscd */}
                    <Icons style={{ position: "absolute", left: 375, zIndex: 1, top: 7, }} name="cart" size={25} color="#363636" />
                    <Icons style={{ position: "absolute", left: 340, zIndex: 1, top: 7, }} name="bell-badge" size={25} color="#363636" />
                </View>
                {/* <Text>{'\n'}Muốn đẹp trai đến ngay Poly Barber</Text> */}
            </View>

            {/* alo1231233 */}
            <ScrollView >

                <View style={styles.verticalLayout}>

                    <View style={styles.horizontalLayout}>

                        <View style={styles.item}>
                            <View style={styles.iconContainer}>
                                <Image source={require('../Images/imgHome/datlich.png')} style={styles.icon} />
                            </View>
                            <Text style={styles.itemText}>Đặt lịch</Text>
                        </View>

                        <View style={styles.item}>
                            <View
                                style={styles.iconContainer}>
                                <Image source={require('../Images/imgHome/lichsucat.png')} style={styles.icon} />
                            </View>
                            <Text style={styles.itemText}>Lịch sử cắt</Text>
                        </View>

                        <View style={styles.item}>
                            <View
                                style={styles.iconContainer}
                                imageStyle={{ borderRadius: 25 }} >
                                <Image source={require('../Images/imgHome/banggia.png')} style={styles.icon} />
                            </View>
                            <Text style={styles.itemText}>Đơn hàng</Text>
                        </View>

                        <View style={styles.item}>
                            <View
                                style={styles.iconContainer}
                                imageStyle={{ borderRadius: 25 }} >
                                <Image source={require('../Images/imgHome/hethong.png')} style={styles.icon} />
                            </View>
                            <Text style={styles.itemText}>Hệ thống Salon</Text>
                        </View>

                    </View>


                </View>

                <ScrollView horizontal >
                    <View style={styles.menuItem}>
                        <Image
                            source={require('../Images/imgHome/banner1.png')}
                            style={styles.menuItemImage}
                        />
                    </View>
                    <View style={styles.menuItem}>
                        <Image
                            source={require('../Images/imgHome/banner2.png')}
                            style={styles.menuItemImage}
                        />
                    </View>
                    <View style={styles.menuItem}>
                        <Image
                            source={require('../Images/imgHome/banner3.png')}
                            style={styles.menuItemImage}
                        />
                    </View>
                    <View style={styles.menuItem}>
                        <Image
                            source={require('../Images/imgHome/banner2.png')}
                            style={styles.menuItemImage}
                        />
                    </View>
                    <View style={styles.menuItem}>
                        <Image
                            source={require('../Images/imgHome/banner1.png')}
                            style={styles.menuItemImage}
                        />
                    </View>

                </ScrollView>

                <Text style={styles.text}>TOP SẢN PHẨM NỔI BẬT</Text>

                <ScrollView horizontal contentContainerStyle={styles.menuContainer} showsHorizontalScrollIndicator={true}>

                    <View style={[styles.menuItem, styles.viewTopsp]}>
                        <Image
                            source={require('../Images/imgHome/saptoc.png')}
                            style={styles.Imagetopsp} />
                        <Text>Sáp vuốt tóc {'\n'}Matte UNO</Text>
                        <View style={[styles.viewminitopsp, { position: "absolute", bottom: 0 }]}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Mua ngay ➡</Text>
                        </View>

                    </View>
                    <View style={[styles.menuItem, styles.viewTopsp]}>
                        <Image
                            source={require('../Images/imgHome/gomtoc.png')}
                            style={styles.Imagetopsp} />
                        <Text>Combo Gôm xịt tóc {'\n'}The Prolock 420ml</Text>
                        <View style={[styles.viewminitopsp, { position: 'absolute', bottom: 0 }]}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Mua ngay ➡</Text>
                        </View>
                    </View>
                    <View style={[styles.menuItem, styles.viewTopsp]}>
                        <Image
                            source={require('../Images/imgHome/matsay.png')}
                            style={styles.Imagetopsp} />
                        <Text>Máy sấy tóc Furin</Text>
                        <View style={[styles.viewminitopsp, { position: 'absolute', bottom: 0 }]}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Mua ngay ➡</Text>
                        </View>
                    </View>
                    <View style={[styles.menuItem, styles.viewTopsp]}>
                        <Image
                            source={require('../Images/imgHome/suaruamat.png')}
                            style={styles.Imagetopsp} />
                        <Text>Sữa rửa mặt{'\n'}Simple lành tính 150ml</Text>
                        <View style={[styles.viewminitopsp, { position: 'absolute', bottom: 0 }]}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Mua ngay ➡</Text>
                        </View>
                    </View>
                    <View style={[styles.menuItem, styles.viewTopsp]}>
                        <Image
                            source={require('../Images/imgHome/lankhumui.png')}
                            style={styles.Imagetopsp} />
                        <Text>Lăn khử mùi{'\n'}Chanel Bleu De Stick{'\n'} Deodorant 75ml</Text>
                        <View style={[styles.viewminitopsp, { position: 'absolute', bottom: 0 }]}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Mua ngay ➡</Text>
                        </View>
                    </View>
                    <View style={[styles.menuItem, styles.viewTopsp]}>
                        <Image
                            source={require('../Images/imgHome/serum.png')}
                            style={styles.Imagetopsp} />
                        <Text style={{ fontSize: 13 }}>Serum POND'S{'\n'}Age Miracle Hya-Collagen{'\n'}Fillter Retinol-C 30ml</Text>
                        <View style={[styles.viewminitopsp, { position: 'absolute', bottom: 0 }]}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Mua ngay ➡</Text>
                        </View>
                    </View>

                </ScrollView>

                <Text style={styles.text}>CAM KẾT 30SHINE</Text>

            </ScrollView>


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
