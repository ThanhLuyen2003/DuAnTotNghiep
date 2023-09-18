import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import ManChao from './Components/ManChao';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import LienHe from './Components/LienHe';
import MuaSam from './Components/MuaSam';
import DatLich from './Components/DatLich';


const Tabb = createBottomTabNavigator();

export default function App() {

  const Stack = createNativeStackNavigator();


  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='ManChao'>

        <Stack.Screen name='ManChao' component={ManChao} options={{ headerShown: false }} />

        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />

        <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />

        <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}


const HomeTab = () => {
  return (
    <Tabb.Navigator >

      <Tabb.Screen name='Home' component={Home}

        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={require('./Images/home.png')} style={{ width: 25, height: 25, }} resizeMode="stretch" />
          ),
          title: "Trang chủ"
        }}
      />

      <Tabb.Screen name='DatLich' component={DatLich}
        options={{
          tabBarIcon: () =>
            <Image source={require('./Images/DatLich.png')} style={{ width: 30, height: 30 }} resizeMode="stretch" />,
          title: "Đặt lịch"
        }}
      />

      <Tabb.Screen name='MuaSam' component={MuaSam}
        options={{
          tabBarIcon: () =>
            <Image source={require('./Images/MuaSam.png')} style={{ width: 25, height: 25 }} resizeMode="stretch" />,
          title: "Mua sắm"
        }}
      />

      <Tabb.Screen name='LienHe' component={LienHe}
        options={{
          tabBarIcon: () =>
            <Image source={require('./Images/LienHe.png')} style={{ width: 25, height: 25 }} resizeMode="stretch" />,
          title: "Liên hệ"
        }}
      />

    </Tabb.Navigator>
  );
}