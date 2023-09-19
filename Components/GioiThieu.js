import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
const GioiThieu = (props) => {
    const { navigation } = props;
    const DoneAndSkip = () => {
        setTimeout(() => {
            navigation.navigate("Login")
        }, 1000);
    }
    const donButton = ({ ...props }) => {
        return (
            <TouchableOpacity style={{ padding: 20, backgroundColor: "#CD853F", borderTopLeftRadius: 100, borderBottomLeftRadius: 100, opacity: 0.7 }} {...props} >
                <Text >Done</Text>
            </TouchableOpacity>
        )
    }
    return (
        <ImageBackground blurRadius={1} style={{ flex: 1 }} source={require('../Images/nenbarber.jpg')}>
            <Onboarding
                onDone={DoneAndSkip}
                onSkip={DoneAndSkip}
                DoneButtonComponent={donButton}
                pages={[
                    {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        image: <Image style={{ width: 300, height: 380, borderRadius: 50, opacity: 0.7 }} source={require('../Images/imgGioiThieu/barber1.jpg')} />,
                        title: 'Poly Barber',
                        subtitle: 'Thợ cắt tóc',
                    },
                    {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        image: <Image style={{ width: 300, height: 380, borderRadius: 50, opacity: 0.7 }} source={require('../Images/imgGioiThieu/barber2.jpg')} />,
                        title: 'Combo giá rẻ',
                        subtitle: 'Làm tí đê',
                    },
                    {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        image: <Image style={{ width: 300, height: 380, borderRadius: 50, opacity: 0.7 }} source={require('../Images/imgGioiThieu/barber3.jpg')} />,
                        title: 'Sales ngập sàn',
                        subtitle: 'Wellcome to play',
                    },
                    {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        image: <Image style={{ width: 300, height: 380, borderRadius: 50, opacity: 0.7 }} source={require('../Images/imgGioiThieu/barber4.jpg')} />,
                        title: 'Hi! ',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },

                ]}
            />
        </ImageBackground>
    )
}

export default GioiThieu

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
})