import { ImageBackground, StyleSheet, Text, TouchableHighlight, View, TextInput, Pressable, Platform, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import DropDownPicker from 'react-native-dropdown-picker'
import { useState } from 'react'
import DatePicker from '@react-native-community/datetimepicker'
const EditProfile = () => {

    const [open, setOpen] = useState(false); // xổ list xuống hay không
    const [value, setValue] = useState(null); // giá trị người dùng chọn
    const [items, setItems] = useState([     // mảng các phần tử
        { label: 'Nam', value: 1 },
        { label: 'Nữ', value: 2 }
    ]);
    const [dateBirth, setdateBirth] = useState("");
    const [date, setdate] = useState(new Date());
    const [showPicker, setshowPicker] = useState(false)
    const toggleDatePicker = () => {
        setshowPicker(!showPicker);
    }
    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setdate(currentDate);
            if (Platform.OS === "android") {
                toggleDatePicker();
                setdateBirth(currentDate.toDateString());
            }
        } else {
            toggleDatePicker();
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 20 }}>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity onPress={() => { }}>
                        <View style={{ height: 125, width: 125, borderRadius: 100, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#CD853F" }}>
                            <ImageBackground style={{ width: 120, height: 120 }} imageStyle={{ borderRadius: 100 }} source={require('../Images/anime.jpg')}>
                                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                    <Icons name='camera' size={30} color={'black'} style={{ opacity: 0.7, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff", borderRadius: 10 }} />
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', padding: 5, bottom: 50, marginTop: 50 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Họ tên</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icons name="account" size={35} style={{ position: "absolute", left: 10 }} />
                        <TextInput placeholder="Nhập tên" style={{ width: "100%", height: 50, paddingLeft: 50, borderWidth: 1, borderColor: "white", borderRadius: 10 }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'column', padding: 5, bottom: 50 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Ngày sinh</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icons name="calendar-blank" size={35} style={{ position: "absolute", left: 10 }} />
                        {
                            showPicker && (
                                <DatePicker
                                    mode='date'
                                    display="spinner"
                                    value={date}
                                    onChange={onChange}
                                />
                            )
                        }

                        <Pressable onPress={toggleDatePicker}>
                            <TextInput placeholder="12/12/2003" placeholderTextColor="black" onChangeText={setdateBirth} value={dateBirth} editable={false} style={{ width: "100%", height: 50, paddingLeft: 50, borderWidth: 1, borderColor: "white", borderRadius: 10 }} />
                        </Pressable>


                    </View>
                </View>
                <View style={{ flexDirection: 'column', padding: 5, bottom: 50 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Số điện thoại</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icons name="phone" size={35} style={{ position: "absolute", left: 10 }} />
                        <TextInput placeholder="Nhập số điện thoại" style={{ width: "100%", height: 50, paddingLeft: 50, borderWidth: 1, borderColor: "white", borderRadius: 10 }} />
                    </View>
                </View>
                <View >
                    <Text style={{ fontSize: 15, fontWeight: "bold", bottom: 50 }}>Giới tính</Text>
                    <DropDownPicker style={styles.containerDropDown}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems} />
                </View>
                <Pressable style={{ justifyContent: "center", bottom: 10 }}>
                    <Text style={styles.press}>Cập nhật</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    containerDropDown: {
        backgroundColor: "#F5F5F5",
        width: "100%",
        zIndex: 1000, // quy định thứ tự xếp chồng các phần tử trên giao diện
        height: 50,
        bottom: 50
    },
    press: {
        backgroundColor: "#CD853F",
        fontWeight: "bold",
        color: "white",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        fontSize: 20,
        textAlign: "center",
        shadowColor: "#000",
        elevation: 5
    }
})