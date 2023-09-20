import React from "react";
import { View, Image, StyleSheet, Text, FlatList, TouchableHighlight, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import DatePicker from "react-native-date-picker";

const numColumn = 4;

const DatLich = (props) => {

    const [chonNgay, setchonNgay] = useState("");
    const [chonGio, setchonGio] = useState("");

    const today = new Date();

    const startDay = today.getFullYear() + "-" + 0 + (today.getMonth() + 1) + "-" + today.getDate();

    const [khungGio, setkhungGio] = useState([
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
        "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",

    ])

    const hi = (item, index) => {
        selected: true
    }


    const itemm = ({ item }) => {

        let { itemm } = stylee;

        return (
            <TouchableOpacity onPress={hi(item)} style={[stylee.itemm, { backgroundColor: item.selected ? '#CD853F' : 'white' }]}>
                <Text > {item}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ padding: 20, backgroundColor: 'white', height: '100%' }}>

            <View style={{ height: 40, width: "100%" }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 5 }}>Chọn ngày</Text>
            </View>

            <Calendar
                enableSwipeMonths
                theme={{ monthTextColor: "#CD853F", arrowColor: "#CD853F", textMonthFontSize: 30, textMonthFontWeight: "bold", dayTextColor: "#CD853F", textInactiveColor: "#CD853F", textSectionTitleColor: "#CD853F", textDayFontWeight: "bold", todayBackgroundColor: "#CD853F", selectedDayBackgroundColor: "#CD853F" }}
                style={{ borderRadius: 10, borderColor: '#CD853F', borderWidth: 1, shadowOpacity: 0.2, padding: 20 }}
                onDayPress={(date) => { setchonNgay(date.dateString) }}
                markedDates={{
                    [chonNgay]: { selected: true }
                }}
                minDate={startDay}
            />

            <View style={{ height: 40, width: "100%", }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 5 }}>Chọn  khung giờ</Text>
            </View>

            <View style={{ width: '100%', height: 200 }}>
                <FlatList
                    data={khungGio}
                    renderItem={itemm}
                    numColumns={3}
                    style={{ height: 50 }}
                />
            </View>

            <TouchableOpacity onPress={hi} style={{ backgroundColor: '#CD853F', width: '90%', height: 40, borderRadius: 50, alignItems: 'center', alignSelf: 'center' }}  >
                <Text style={{ color: 'white', fontSize: 20, marginTop: 10, }}>Tiếp tục</Text>
            </TouchableOpacity>




        </View>

    );
}

const stylee = StyleSheet.create({
    itemm: {
        borderColor: '#CD853F',
        borderWidth: 1,
        padding: 10,
        width: 100,
        margin: 5,
        alignItems: 'center',
        borderRadius: 20,
        height: 'auto',
        flex: 1,

    }
})

export default DatLich;