import React from "react";
import { View, Image, StyleSheet, Text, FlatList, TouchableHighlight, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import { disabled } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";
import { style } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";

const numColumn = 4;

const DatLich = (props) => {



    const [chonNgay, setchonNgay] = useState("");
    const [chonGio, setchonGio] = useState("");

    const today = new Date();

    const startDay = today.getFullYear() + "-" + 0 + (today.getMonth() + 1) + "-" + today.getDate();

    const timeee = today.getHours();

    const hi = "11:00";
    const ho = "50:00";
    var hii = hi.slice(0, 2);

    //console.log(timeee);





    const [khungGio, setkhungGio] = useState([
        { "id": "1", "time": "09:00" }, { "id": "2", "time": "09:30" }, { "id": "3", "time": "10:00" }, { "id": "4", "time": "10:30" },
        { "id": "5", "time": "11:00" }, { "id": "6", "time": "11:30" }, { "id": "7", "time": "12:00" }, { "id": "8", "time": "12:30" },
        { "id": "9", "time": "13:00" }, { "id": "10", "time": "13:30" }, { "id": "11", "time": "14:00" }, { "id": "12", "time": "14:30" },
        { "id": "13", "time": "15:00" }, { "id": "14", "time": "15:30" }, { "id": "15", "time": "16:00" }, { "id": "16", "time": "16:30" },
        { "id": "17", "time": "17:00" }, { "id": "18", "time": "17:30" }, { "id": "19", "time": "18:00" }, { "id": "20", "time": "18:30" },
        { "id": "21", "time": "19:00" }, { "id": "22", "time": "19:30" }, { "id": "23", "time": "20:00" }, { "id": "24", "time": "20:30" },

    ])


    selectedItemm = (item, index) => {

        const newData = khungGio.map((e, index) => {

            if (item.id == e.id) {
                return {
                    ...e,
                    selected: true
                }
            }
            return {
                ...e,
                selected: false
            }


        })
        setchonGio(item.time);

        //console.log(item.time.slice(0, 2));

        setkhungGio(newData);
    }



    const renderItemm = ({ item, index }) => {

        return (
            <TouchableOpacity

                onPress={() => selectedItemm(item, index)}
                style={[stylee.itemm, { backgroundColor: item.selected ? '#CD853F' : 'white', }]}
            >
                <Text style={{ color: item.selected ? 'white' : 'black' }}> {item.time}</Text>
            </TouchableOpacity>
        )
    }

    const salon = () => {
        props.navigation.navigate('ChonSalon');
    }

    return (
        <SafeAreaView>
            <View style={{ padding: 15, backgroundColor: 'white', height: '96%' }}>
                <View >
                    <Calendar
                        enableSwipeMonths
                        theme={{ monthTextColor: "#CD853F", arrowColor: "#CD853F", textMonthFontSize: 30, textMonthFontWeight: "bold", dayTextColor: "#CD853F", textInactiveColor: "#CD853F", textSectionTitleColor: "#CD853F", textDayFontWeight: "bold", todayBackgroundColor: "#CD853F", selectedDayBackgroundColor: "#CD853F" }}
                        style={{ borderRadius: 10, borderColor: '#CD853F', borderWidth: 1, shadowOpacity: 0.2 }}
                        onDayPress={(date) => { setchonNgay(date.dateString) }}
                        markedDates={{
                            [chonNgay]: { selected: true }
                        }}
                        minDate={startDay}
                    />
                </View>


                <View >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 5 }}>Chọn  khung giờ   {chonGio}</Text>
                </View>


                <FlatList
                    data={khungGio}
                    renderItem={renderItemm}
                    numColumns={3}
                />


                <TouchableOpacity onPress={salon} style={{ marginTop: 5, backgroundColor: '#CD853F', width: '90%', height: 40, borderRadius: 50, alignItems: 'center', alignSelf: 'center' }}  >
                    <Text style={{ color: 'white', fontSize: 20, marginTop: 10, }}>Tiếp tục</Text>
                </TouchableOpacity>


            </View>


        </SafeAreaView>

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