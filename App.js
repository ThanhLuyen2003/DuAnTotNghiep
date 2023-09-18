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
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tabb = createBottomTabNavigator();
const getIconColor = (focus) => ({
  tintColor: focus ? Colors.primary : Colors.dark,

})
export default function App() {

  const Stack = createNativeStackNavigator();
  return (

    <NavigationContainer >
      <Stack.Navigator initialRouteName='ManChao' >

        <Stack.Screen name='ManChao' component={ManChao} options={{ headerShown: false }} />

        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />

        <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />

        <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}

// screenOptions={{headerShown:false,tabBarStyle:styles.tabBar}}
const HomeTab = () => {
  return (
    <Tabb.Navigator screenOptions={{ headerShown: false, tabBarStyle: styles.tabBar, tabBarShowLabel: false }}>
      <Tabb.Screen name='Home' component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 3 }}>
              <Image source={require('./Images/homee.png')} style={{ width: 25, height: 25, tintColor: focused ? '#CD853F' : 'gray' }} resizeMode="stretch" />
              <Text style={{ color: focused ? '#CD853F' : 'gray', fontSize: 12 }}>Home</Text>
            </View>
          ),

        }}
      />

      <Tabb.Screen name='DatLich' component={DatLich}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 3 }}>
              <Image source={require('./Images/timetable.png')} style={{ width: 25, height: 25, tintColor: focused ? '#CD853F' : 'gray' }} resizeMode="stretch" />
              <Text style={{ color: focused ? '#CD853F' : 'gray', fontSize: 12 }}>Đặt lịch</Text>
            </View>
          ),
        }}
      />

      <Tabb.Screen name='MuaSam' component={MuaSam}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 3 }}>
              <Image source={require('./Images/shopping.png')} style={{ width: 25, height: 25, tintColor: focused ? '#CD853F' : 'gray' }} resizeMode="stretch" />
              <Text style={{ color: focused ? '#CD853F' : 'gray', fontSize: 12 }}>Mua sắm</Text>
            </View>
          ),
        }}
      />

      <Tabb.Screen name='LienHe' component={LienHe}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 3 }}>
              <Image source={require('./Images/phone.png')} style={{ width: 25, height: 25, tintColor: focused ? '#CD853F' : 'gray' }} resizeMode="stretch" />
              <Text style={{ color: focused ? '#CD853F' : 'gray', fontSize: 12 }}>Liên hệ</Text>
            </View>
          ),
        }}
      />

    </Tabb.Navigator>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    padding: 0,
    left: 16,
    right: 16,
    bottom: 16,
    height: 66,
    borderRadius: 16,
    backgroundColor: "white",
    borderTopColor: "transparent",
    shadowColor: "dark",
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },

})