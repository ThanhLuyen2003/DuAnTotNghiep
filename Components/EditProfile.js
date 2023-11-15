import { ImageBackground, StyleSheet, Text, TouchableHighlight, View, TextInput, Pressable, Platform, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import DropDownPicker from 'react-native-dropdown-picker'
import { useState } from 'react'
import DatePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useEffect } from 'react'
import ip from '../IP'
const EditProfile = (props) => {
    const [userInfo, setuserInfo] = useState({
    })
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setavatar] = useState("")
    const [address, setaddress] = useState("")


    const [img_source, setimg_source] = useState(null)
    const [img_base64, setiimg_base64] = useState(null)
    const [saveImage, setsaveImage] = useState({});
    const [isDirty, setIsDirty] = useState(false);



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

    const saveImageToStorage = async (imageBase64, shouldSave) => {
        try {
            if (imageBase64 && shouldSave) {
                await AsyncStorage.setItem('savedImage', imageBase64);
                console.log('Đã lưu ảnh vào Storage.');
            } else {
                console.log('Dữ liệu ảnh không tồn tại hoặc không cần lưu.');
            }
        } catch (error) {
            console.log('Lỗi khi lưu ảnh vào Storage:', error);
        }
    };

    // const pickImage = async () => {
    //     // Đọc ảnh từ thư viện thì không cần khai báo quyền
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3], // khung view cắt ảnh 
    //         quality: 1,
    //     });

    //     console.log(result);

    //     if (!result.cancelled) {
    //         if (result.assets.length > 0 && result.assets[0].uri) {
    //             setimg_source(result.assets[0].uri);
    //             let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
    //             let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file
    //             FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
    //                 .then((res) => {
    //                     // phải nối chuỗi với tiền tố data image
    //                     setiimg_base64("data:image/" + file_ext + ";base64," + res);
    //                     console.log(img_base64);

    //                     // upload ảnh lên api thì dùng PUT có thể viết ở đây
    //                     let url_api = "http://" + ip + ":3000/apiuser/updateAvatar/" + userInfo._id
    //                     let obj1 = { avatar: img_base64 }
    //                     fetch(url_api, {
    //                         method: 'PUT',
    //                         headers: {
    //                             Accept: 'application/json',
    //                             'Content-Type': 'application/json',
    //                         },
    //                         body: JSON.stringify(obj1),
    //                     }).then(async (res) => {
    //                         if (res.status === 200) {
    //                             // Save the image to storage
    //                             saveImageToStorage(img_base64, true);
    //                         } else {
    //                             alert("Có lỗi xảy ra!")
    //                             console.log(res);
    //                             return res;
    //                         }
    //                     }).catch((err) => {
    //                         console.log(err);
    //                     });
    //                 });
    //         } else {
    //             // Image selection canceled, do not save
    //             saveImageToStorage(null, false);
    //         }
    //     }
    // }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.0001,
        });

        console.log(result);

        if (!result.canceled) {
            if (result.assets.length > 0 && result.assets[0].uri) {
                setimg_source(result.assets[0].uri);
                let _uri = result.assets[0].uri;
                let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1);

                FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
                    .then((res) => {
                        setiimg_base64("data:image/" + file_ext + ";base64," + res);
                        console.log(img_base64);

                    });
            } else {
                // Image selection canceled, set img_base64 to null
                setiimg_base64(null);
            }
        }
    }


    useEffect(() => {
        if (img_base64 !== null) {

            let url_api = "http://" + ip + ":3000/apiuser/updateAvatar/" + userInfo._id;
            let obj1 = { avatar: img_base64 };

            fetch(url_api, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj1),
            }).then(async (res) => {
                if (res.status === 200) {
                    // Save the image to storage
                    saveImageToStorage(img_base64, true);

                } else {
                    alert("Có lỗi xảy ra!")
                    console.log(res);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [img_base64]);

    const editUser = async () => {
        const addressRegex = /^[0-9A-Za-z\s,-]+$/;
        if (!addressRegex.test(address)) {
            alert("Sai định dạng địa chỉ");
            return;
        }
        // if (img_base64 == null) {
        //     alert("Vui lòng chọn ảnh")
        //     return;
        // }
        let url_api = "http://" + ip + ":3000/apiuser/updateUsers/" + userInfo._id
        let obj = { name: name, phone: phone, email: email, address: address }
        fetch(url_api, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
            .
            then(async (res) => {
                if (res.status === 200) {
                    alert("Sửa thành công");
                    const updatedUserInfo = {
                        ...userInfo, name, phone, email, address,
                    }

                    await AsyncStorage.setItem('loginInfo', JSON.stringify(updatedUserInfo));

                    setName("")
                    setEmail("")
                    setPhone("")
                    setaddress("")
                    props.navigation.navigate("Profile");
                    // console.log(res);
                    // let updatedImage = img_base64 || saveImage; // Sử dụng ảnh hiện tại hoặc ảnh đã lưu
                    // setiimg_base64(updatedImage);

                    // if (img_base64 !== saveImage) {
                    //     // Chỉ khi có thay đổi ảnh mới, hãy lưu vào Storage
                    //     saveImageToStorage(updatedImage);
                    // }


                } else {
                    alert("Có lỗi xảy ra!")
                    console.log(res);
                    return res;
                }

            })
            .catch((err) => {
                console.log(err);
            });

    }
    const handleInputChange = (text, field) => {
        switch (field) {
            case 'name':
                setName(text);
                break;
            case 'phone':
                setPhone(text);
                break;
            case 'email':
                setEmail(text);
                break;
            case 'address':
                setaddress(text);
                break;
            default:
                break;
        }
        setIsDirty(true);
    }


    return (
        <SafeAreaView >
            <View style={{ backgroundColor: "#666b7b", width: "auto", height: 100, marginTop: 10, alignItems: "center" }}>
                <TouchableOpacity onPress={pickImage}>
                    {img_base64 ? (

                        <ImageBackground style={{ width: 120, height: 120, borderWidth: 0.5, borderRadius: 100, marginTop: 20 }} imageStyle={{ borderRadius: 100 }} source={{ uri: img_base64 }}>
                        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                            <Icons name='camera' size={30} color={'black'} style={{ opacity: 0.7, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff", borderRadius: 10 }} />
                        </View>
                    </ImageBackground>

                       
                    ) : (
                        (saveImage && typeof saveImage === 'string') ? (
                            <ImageBackground style={{ width: 120, height: 120, borderWidth: 0.5, borderRadius: 100, marginTop: 20 }} imageStyle={{ borderRadius: 100 }} source={{ uri: saveImage }}>
                                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                    <Icons name='camera' size={30} color={'black'} style={{ opacity: 0.7, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff", borderRadius: 10 }} />
                                </View>
                            </ImageBackground>
                        ) : null
                    )}
                </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: 'white', width: "100%", height: 300, marginTop: 60, padding: 10 }}>
                <View style={{ flexDirection: "column", width: "auto", height: 50, borderBottomColor: "gray", borderBottomWidth: 0.5 }}>
                    <Text>Họ tên {<Text style={{ color: "red" }}>*</Text>}</Text>

                    <TextInput placeholder='Nhập họ tên' value={name}
                        onChangeText={(text) => handleInputChange(text, 'name')} />
                </View>
                <View style={{ flexDirection: "column", width: "auto", height: 50, borderBottomColor: "gray", borderBottomWidth: 0.5, marginTop: 20 }}>
                    <Text>Số điện thoại {<Text style={{ color: "red" }}>*</Text>}</Text>
                    <TextInput placeholder='Số điện thoại' value={phone}
                        onChangeText={(text) => handleInputChange(text, 'phone')} />
                </View>
                <View style={{ flexDirection: "column", width: "auto", height: 50, borderBottomColor: "gray", borderBottomWidth: 0.5, marginTop: 20 }}>
                    <Text>Email</Text>
                    <TextInput placeholder='Email' value={email}
                        onChangeText={(text) => handleInputChange(text, 'email')} />
                </View>
                <View style={{ flexDirection: "column", width: "auto", height: 50, borderBottomColor: "gray", borderBottomWidth: 0.5, marginTop: 20 }}>
                    <Text>Address</Text>
                    <TextInput placeholder='Nhập Address' value={address}
                        onChangeText={(text) => handleInputChange(text, 'address')} />
                </View>
            </View>
            <TouchableHighlight onPress={editUser} disabled={!isDirty} style={{ backgroundColor: isDirty ? "#CD853F" : "#888", width: "90%", height: 50, margin: 20, justifyContent: "center", alignItems: "center", borderRadius: 10, marginTop: 50 }}>
                <Text style={{ fontWeight: "bold" }}>CẬP NHẬT</Text>
            </TouchableHighlight>
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