import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, Pressable, Text} from 'react-native';
import Home from "./components/Home";
import FormApi from "./components/FormApi";
import Acount from "./components/Acount";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import store from './utils/store/store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName='Home'>
        <Stack.Group screenOptions={{ headerStyle: {
            backgroundColor: '#000',
            
          },
          headerTintColor: '#f1f1f1',
          headerTint: ' ',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#f1f1f1'
          },
          
           }}>
        <Stack.Screen name='Home' component={Home} options={{title: 'Home'}} />
        <Stack.Screen name='FormApi' component={FormApi} options={{title: 'FormApi'}} />
        </Stack.Group>
      </Stack.Navigator> */}

      <Tab.Navigator screenOptions={
          ({route}) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? require("./assets/home.png") : require("./assets/homeG.png")
              //return <Image style={styles.image} source={require("./assets/home.png")}/>
            } else if (route.name === 'FormApi') {
              iconName = focused ? require("./assets/t-shirt.png") : require("./assets/t-shirtG.png")
              //return <Image style={styles.image} source={require("./assets/search.png")}/>
            }
            else if (route.name === 'Acount') {
              iconName = focused ? require("./assets/acount.png") : require("./assets/acountG.png")
              //return <Image style={styles.image} source={require("./assets/search.png")}/>
            }

            // You can return any component that you like here!
            return <Image style={styles.image} source={iconName}/>
          },
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
            
          },
          headerTint: ' ',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#f1f1f1'
          },
          tabBarStyle: {
            position: 'absolute', 
            backgroundColor: '#000',
             
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#000',
          
          // tabBarBackground: () => (
          //   <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
          // ),
          
        })}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="FormApi" component={FormApi} />
          <Tab.Screen name="Acount" component={Acount} />
        </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  title: {
    backgroundColor: '#f1f1f1',
    marginTop: 50,
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: '#000',
    color: '#f1f1f1',
    width: 200,
  },
  image: {
    height: 32,
    width: 32,
    marginTop: 10
  }
});
