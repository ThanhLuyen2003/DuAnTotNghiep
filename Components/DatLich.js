import React from "react";
import { View, Image, StyleSheet, Text, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
const DatLich = (props) => {

    const [chonNgay, setchonNgay] = useState("");

    const today = new Date();

    const startDay = today.getFullYear() + "-" + 0 + (today.getMonth() + 1) + "-" + today.getDate();

    const [khungGio, setkhungGio] = useState([
        "10:70", "10:00", "10:00", "10:00", "10:00"
    ])


    const itemm = ({ item }) => {
        return (
            <View style={{ borderColor: '#CD853F', borderWidth: 1, padding: 10, width: 100, margin: 5, alignItems: 'center', borderRadius: 20 }}>
                <Text> {item}</Text>
            </View>
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
                hideExtraDays={true}
                markedDates={{
                    [chonNgay]: { selected: true }
                }}
                minDate={startDay}
            />

            <View style={{ height: 40, width: "100%", marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 5 }}>Chọn  khung giờ</Text>
            </View>

            <FlatList data={khungGio}
                renderItem={itemm}

            />



        </View>

    );
}

export default DatLich;