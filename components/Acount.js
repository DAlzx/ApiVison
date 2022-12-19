import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from "./UserPage/Settings";
import ConnectUser from './UserPage/ConnectUser'
import User from "./UserPage/User";
import AddUser from "./UserPage/AddUser";
import UserInfo from './UserPage/SettingsPage/UserInfo';
import UserPassword from './UserPage/SettingsPage/UserPassword';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();


export default function Acount() {
  

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='User'>
        <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name='User' component={User} options={{title: 'User'}} />
        <Stack.Screen name='Settings' component={Settings} options={{title: 'Settings'}} />
        <Stack.Screen name='AddUser' component={AddUser} options={{title: 'AddUser'}} />
        <Stack.Screen name='ConnectUser' component={ConnectUser} options={{title: 'ConnectUser'}} />
        <Stack.Screen name='UserInfo' component={UserInfo} options={{title: 'UserInfo'}} />
        <Stack.Screen name='UserPassword' component={UserPassword} options={{title: 'UserPassword'}} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    
  },
});
