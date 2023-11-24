import { ImageBackground, StyleSheet, Text, TouchableHighlight, View, TextInput, Pressable, Platform, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import DropDownPicker from 'react-native-dropdown-picker'
import { useState } from 'react'
import DatePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import ip from '../IP'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Modal } from 'react-native'
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
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3], // khung view cắt ảnh 
            quality: 1,
            multiple: true, // Enable multiple image selection
        });
        console.log(result);

        if (!result.cancelled) {
            const selectedImages = result.assets;
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
                        let url_api = "http://" + ip + ":3000/apiuser/updateAvatar/" + userInfo._id
                        let obj1 = { avatar: img_base64 }
                        fetch(url_api, {
                            method: 'PUT',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(obj1),
                        }).then(async (res) => {
                            if (res.status === 200) {
                                saveImageToStorage(img_base64);
                            } else {
                                alert("Có lỗi xảy ra!")
                                console.log(res);
                                return res;
                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                    });
            }


        }

    }
    const editUser = async () => {
        const addressRegex = /^[0-9A-Za-z\s,-]+$/;
        if (!addressRegex.test(address)) {
            alert("Sai định dạng địa chỉ");
            return;
        }


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

                    props.navigation.navigate("HomeTab");

                    props.navigation.navigate("Profile");

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
            default:
                break;
        }
        setIsDirty(true);
    }

    const [onShow, setOnShow] = useState(false);//show modal

    const [open1, setOpen1] = useState(false);//show dropdown
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const [value, setValue] = useState(null); // giá trị ng dùng chọn
    const [value2, setValue2] = useState(null);
    const [value3, setValue3] = useState(null);

    const [provinces, setprovinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const getProvinces = () => {

        let url = 'https://provinces.open-api.vn/api/?depth=1';

        fetch(url)
            .then((res) => { return res.json(); })
            .then((res_json) => {
                let arr_droplist = res_json.map((item, index, src_arr) => {
                    return { label: item.name, value: item.code }
                });

                setprovinces(arr_droplist);

            })
    }

    const getDistricts = (code) => {

        let url = 'https://provinces.open-api.vn/api/p/' + code + '?depth=2';

        if (!code) {
            return
        } else {

            fetch(url)
                .then((res) => { return res.json(); })
                .then((res_json) => {
                    let arr_droplist = res_json.districts;

                    let districts = arr_droplist.map((item, index, src_arr) => {

                        return { label: item.name, value: item.code }
                    });

                    setDistricts(districts);
                    setValue3("")

                })
        }

    }

    const getward = (code) => {
        let url = 'https://provinces.open-api.vn/api/d/' + code + '?depth=2';

        if (!code) {
            return
        } else {
            fetch(url)
                .then((res) => { return res.json(); })
                .then((res_json) => {
                    let arr_droplist = res_json.wards;

                    let wards = arr_droplist.map((item, index, src_arr) => {

                        return { label: item.name, value: item.name }
                    });

                    setWards(wards);
                })

        }

    }

    React.useEffect(() => {
        getProvinces();
    }, [])


    const [province, setProvince] = useState("");

    const onSelectItem = (item) => {

        setProvince(item.label);

    }


    const [district, setDistrict] = useState("");

    const onSelectItem2 = (item) => {

        setDistrict(item.label);

    }

    const confirmAddress = (text) => {
        setaddress(text + "/" + value3 + "/" + district + "/" + province);
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

            <View style={{ width: "100%", height: 300, marginTop: 60, padding: 10 }}>
                <View style={{ flexDirection: "column", width: "auto", height: 50, borderBottomColor: "gray", borderBottomWidth: 0.5 }}>
                    <Text>Họ tên {<Text style={{ color: "red" }}>*</Text>}</Text>

                    <TextInput style={styles.textInput} placeholder='Nhập họ tên' value={name}
                        onChangeText={(text) => handleInputChange(text, 'name')} />
                </View>
                <View style={{ flexDirection: "column", width: "auto", height: 50, borderBottomColor: "gray", borderBottomWidth: 0.5, marginTop: 20 }}>
                    <Text>Số điện thoại {<Text style={{ color: "red" }}>*</Text>}</Text>
                    <TextInput style={styles.textInput} placeholder='Số điện thoại' value={phone}
                        onChangeText={(text) => handleInputChange(text, 'phone')} />
                </View>
                <View style={{ flexDirection: "column", width: "auto", height: 50, borderBottomColor: "gray", borderBottomWidth: 0.5, marginTop: 20 }}>
                    <Text>Email</Text>
                    <TextInput style={styles.textInput} placeholder='Email' value={email}
                        onChangeText={(text) => handleInputChange(text, 'email')} />
                </View>

                <Modal
                    visible={onShow}
                    transparent={true}
                    animationType='slide'
                >
                    <View style={styles.modal}>

                        <Text onPress={() => { setOnShow(false) }} style={{ marginBottom: 10 }}>Đóng</Text>
                        <View style={styles.dropdown}>

                            <DropDownPicker
                                open={open1}
                                value={value}
                                items={provinces}
                                setOpen={setOpen1}
                                setValue={setValue}
                                setItems={setprovinces}
                                onChangeValue={(code) => getDistricts(code)}
                                onSelectItem={(item) => onSelectItem(item)}
                                placeholder='Chọn thành phố'
                            />


                        </View>

                        <View style={styles.dropdown2}>
                            <DropDownPicker
                                open={open2}
                                value={value2}
                                items={districts}
                                setOpen={setOpen2}
                                setValue={setValue2}
                                setItems={setDistricts}
                                onChangeValue={(code) => getward(code)}
                                onSelectItem={(item) => onSelectItem2(item)}
                                placeholder='Chọn quận/huyện'

                            />
                        </View>

                        <View style={styles.dropdown3}>
                            <DropDownPicker
                                open={open3}
                                value={value3}
                                items={wards}
                                setOpen={setOpen3}
                                setValue={setValue3}
                                setItems={setWards}
                                placeholder='Chọn phường/xã'
                            />
                        </View>


                        <View style={{ width: 300, height: 50, borderBottomColor: "gray", borderBottomWidth: 0.5, marginTop: 20 }}>
                            <Text>Địa chỉ</Text>
                            <TextInput style={styles.textInput} placeholder='Số nhà/tên đường'
                                onChangeText={(text) => confirmAddress(text)} />
                        </View>

                    </View>
                </Modal>

                <View style={{ flexDirection: "column", width: "auto", height: 'auto', borderBottomColor: "gray", borderBottomWidth: 0.5, marginTop: 20 }}>
                    <Text>Địa chỉ</Text>
                    <TouchableOpacity onPress={() => { setOnShow(true) }}>
                        <Text style={{ marginTop: 10 }}>{!address ? <Text style={{ color: 'gray' }} >Nhập địa chỉ</Text> : <Text>{address}</Text>} </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableHighlight onPress={editUser} style={{ backgroundColor: isDirty ? "#CD853F" : "#888", width: "90%", height: 50, margin: 20, justifyContent: "center", alignItems: "center", borderRadius: 10, marginTop: 50 }}>
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
    textInput: {
        marginTop: 8
    },
    modal: {
        backgroundColor: 'white',
        height: '100%',
        flex: 0.7,
        margin: 30,
        marginTop: '45%',
        borderRadius: 30,
        alignItems: 'center',
        padding: 20,
        shadowRadius: 1,
        shadowColor: 'gray',
        shadowOpacity: 0.5,
        shadowOffset: { height: -5, width: -5 },
    },
    dropdown: {
        zIndex: 300,
        width: 300
    },
    dropdown2: {
        zIndex: 200,
        width: 300,
        margin: 20
    },
    dropdown3: {
        zIndex: 100,
        width: 300
    }
})