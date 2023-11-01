import { ImageBackground, StyleSheet, Text, TouchableHighlight, View, TextInput, Pressable, Platform, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import DropDownPicker from 'react-native-dropdown-picker'
import { useState } from 'react'
import DatePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
const EditProfile = (props) => {
    const ip = "192.168.0.102";


    const [dateBirth, setdateBirth] = useState("");
    const [date, setdate] = useState(new Date());
    const [showPicker, setshowPicker] = useState(false)

    const [userInfo, setuserInfo] = useState({
        phone: '',
        email: '',
        avatar: '',
        address: ''
    })
    const [userId, setUserId] = useState(''); // State to hold the user ID
    const [name, setName] = useState(''); // State to hold the name
    const [phone, setPhone] = useState(''); // State to hold the phone
    const [email, setEmail] = useState(''); // State to hold the email
    const [avatar, setavatar] = useState("")
    const [address, setaddress] = useState("")


    const [img_source, setimg_source] = useState(null)
    const [img_base64, setiimg_base64] = useState(null)
    const [saveImage, setsaveImage] = useState({});


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

    const getLoginInfor = async () => {

        const value = await AsyncStorage.getItem('loginInfo');
        const m_saveImage = await AsyncStorage.getItem('savedImage')
        const userData = JSON.parse(value);
        setuserInfo(userData)
        setName(userData.name)
        setPhone(userData.phone)
        setEmail(userData.email)
        setavatar(userData.avatar)
        setaddress(userData.address)
        setsaveImage(m_saveImage);
    }

    React.useEffect(() => {

        getLoginInfor();

    }, []);

    const saveImageToStorage = async (imageBase64) => {
        try {
            if (imageBase64) {
                await AsyncStorage.setItem('savedImage', imageBase64);
                console.log('Đã lưu ảnh vào Storage.');
            } else {
                console.log('Dữ liệu ảnh không tồn tại.');
            }
        } catch (error) {
            console.log('Lỗi khi lưu ảnh vào Storage:', error);
        }
    };

    const pickImage = async () => {

        // Đọc ảnh từ thư viện thì không cần khai báo quyền
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3], // khung view cắt ảnh 
            quality: 1,
        });


        console.log(result);


        if (!result.cancelled) {
            if (result.assets.length > 0 && result.assets[0].uri) {
                setimg_source(result.assets[0].uri);
                let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
                let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file
                FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
                    .then((res) => {
                        // phải nối chuỗi với tiền tố data image
                        setiimg_base64("data:image/" + file_ext + ";base64," + res);

                        console.log(img_base64);

                        // upload ảnh lên api thì dùng PUT có thể viết ở đây
                    });
            }

            // chuyển ảnh thành base64 để upload lên json   

        }
    }
    const editUser = () => {
        const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        const addressRegex = /^[0-9A-Za-z\s,-]+$/;
        if (!nameRegex.test(name)) {
            alert("Tên không hợp lệ. Vui lòng kiểm tra lại!");
            return;
        }
        if (!addressRegex.test(address)) {
            alert("Sai định dạng địa chỉ");
            return;
        }

        let url_api = "http://" + ip + ":3000/apiuser/updateUsers/" + userInfo._id
        let obj = { name: name, phone: phone, email: email, avatar: img_base64, address: address }
        fetch(url_api, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
            .

            then((res) => {
                if (res.status === 200) {
                    alert("Sửa thành công");
                    saveImageToStorage(img_base64);

                    setName("")
                    setEmail("")
                    setPhone("")
                    setaddress("")
                    props.navigation.navigate("Profile");
                    getLoginInfor();

                    console.log(res);
                } else {
                    alert("Có lỗi xảy ra!")
                    return res;
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }





    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 20 }}>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity onPress={pickImage}>
                        <View style={{ height: 125, width: 125, borderRadius: 100, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#CD853F" }}>
                            {/* {img_source && <Image source={{ uri: img_source }} style={{ width: 200, height: 200 }} />} */}


                            <View style={{ height: 125, width: 125, borderRadius: 100, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#CD853F" }}>

                                {img_base64 && <Image source={{ uri: img_base64 }} style={{ width: 125, height: 125, borderRadius: 100, }} />}
                                {(!img_base64 && typeof saveImage === 'string') && (
                                    <ImageBackground style={{ width: 120, height: 120 }} imageStyle={{ borderRadius: 100 }} source={{ uri: saveImage }}>
                                        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                            <Icons name='camera' size={30} color={'black'} style={{ opacity: 0.7, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff", borderRadius: 10 }} />
                                        </View>
                                    </ImageBackground>
                                )
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} value={name} onChangeText={(txt) => { setName(txt) }} />

                    <TextInput style={styles.input} value={phone} editable={false} onChangeText={(txt) => { setPhone(txt) }} />

                    <TextInput style={styles.input} value={email} editable={false} onChangeText={(txt) => { setEmail(txt) }} />

                    {/* <TextInput style={styles.input} value={avatar} onChangeText={(txt) => { setavatar(txt) }} /> */}

                    <TextInput style={styles.input} value={address} onChangeText={(txt) => { setaddress(txt) }} />
                </View>

                <Pressable style={{ justifyContent: "center", bottom: 10 }} onPress={editUser}>
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
    },
    inputContainer: {
        marginVertical: 10,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#aaa',


        borderRadius: 5,
        padding: 10,
    },
})