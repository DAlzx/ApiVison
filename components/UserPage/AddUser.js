import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, Text, ScrollView, ActivityIndicator, View, Pressable, Image, SafeAreaView, StatusBar, TouchableOpacity, } from 'react-native';
//import db from '../../database/firebaseDb';
import { db, authentication } from "../../database/firebaseDb";
import { doc, setDoc, addDoc, collection, getDocs, getDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { setConnect } from '../../utils/features/connectSlice';
import { selectConnect, selectPostcode, selectCity, selectUsername, selectEmail, selectBirthday, selectPassword, selectPhone } from '../../utils/selector';
import { setValidPassword } from '../../utils/features/passwordSlice';
import { setValidBirthday } from '../../utils/features/birthdaySlice';
import { setValidCity } from '../../utils/features/citySlice';
import { setValidEmail } from '../../utils/features/emailSlice';
import { setValidUsername } from '../../utils/features/usernameSlice';
import { setValidPostcode } from '../../utils/features/postcodeSlice';
import { setValidPhone } from '../../utils/features/phoneSlice';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import Username from './AddUserForm/Username';
import Email from './AddUserForm/Email';
import Password from './AddUserForm/Password';
import PhoneNumber from './AddUserForm/PhoneNumber';
import City from './AddUserForm/City';
import Birthday from './AddUserForm/Birthday';
import Postcode from './AddUserForm/Postcode';


export default function AddUser({navigation}) { 

    const [isLoading, setIsLoading] = React.useState(null);
    const dispatch = useDispatch()
    const connected = useSelector(selectConnect);
    const validPostcode = useSelector(selectPostcode);
    const validCity = useSelector(selectCity);
    const validUsername = useSelector(selectUsername);
    const validEmail = useSelector(selectEmail);
    const validBirthday = useSelector(selectBirthday);
    const validPassword = useSelector(selectPassword);
    const validPhone = useSelector(selectPhone);
    async function setData(){
      //const short = require('short-uuid');
      // const colRef = collection(db, "users");
      // const docsSnap = await getDocs(colRef);
      // id = short.generate();
      // do {
      //   docsSnap.forEach(doc => {
      //     if(doc.id === id){
      //       console.log('they are =');
      //       id = short.generate();
      //       console.log("new id : ",id);
      //     }
      //     else {
      //       console.log("they are !=");
      //     }
          
      //   });
      //   console.log("id final : ",id);
      // }while (doc.id === id)
      // console.log("id : ",id);

      await setDoc(doc(db, "users", validEmail.emailValue), {
        name: validUsername.usernameValue,
        email: validEmail.emailValue,
        password: validPassword.passwordValue,
        birthday: validBirthday.birthdayValue,
        city: validCity.cityValue,
        post_code: validPostcode.postcodeValue,
        phone_number: validPhone.phoneValue,
      });
    }
    const RegisterUser = () => {
      console.log(validPhone.phoneValue);
      if(validEmail.validEmail === true && 
        validPassword.validPassword === true && 
        validUsername.validUsername === true &&
        validCity.validCity === true &&
        validBirthday.validBirthday === true &&
        validPostcode.validPostcode === true &&
        validPhone.validPhone === true
        ){
        createUserWithEmailAndPassword(authentication, validEmail.emailValue, validPassword.passwordValue)
        .then((re)=>{
            console.log(re);
            dispatch(setConnect(true));
            setData();
            navigation.navigate('User');
        })
        .catch((re)=>{
            console.log(re);
        })
      }
      else {
        console.log('remplir tous les champs correctement', validEmail, validPassword, validUsername);
      }
    }
      
    function goBack(){
      navigation.goBack();
      dispatch(setValidBirthday(null));
      dispatch(setValidCity(null));
      dispatch(setValidEmail(null));
      dispatch(setValidPassword(null));
      dispatch(setValidPostcode(null));
      dispatch(setValidUsername(null));
      dispatch(setValidPhone(null));
    }
   

    return (
        <View style={styles.body}>
            {isLoading === true ? (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#f1f1f1"/>
        </View> ) : (
        <>
        <View style={styles.containerHeader}>
          <Pressable style={styles.button} onPress={goBack} ><Image style={styles.image} source={require("../../assets/goBack.png")} /></Pressable>
          <Text style={styles.title}>Create your Acount</Text>
        </View>
        <ScrollView style={styles.container}>
          <Username placeholder='Tulipe_incompris' status={validUsername.validUsername} edit={null} />
          <Email placeholder='exemple@gmail.com' status={validEmail.validEmail} edit={null}/>
          <Password placeholder='********' status={validPassword.validPassword} value='' title='Password' title2='Confirm Password' edit={null}/>
          <PhoneNumber placeholder='Enter phone number' status={validPhone.validPhone} edit={null}/>
          <Birthday placeholder='DD/MM/AAAA' status={validBirthday.validBirthday} edit={null} />
          <City placeholder='Rennes'status={validCity.validCity} edit={null}  />
          <Postcode placeholder='35000' status={validPostcode.validPostcode} edit={null}/>
          <View style={styles.buttonSend}>
            <Button
              title='Register'
              onPress={RegisterUser} 
              color="#f1f1f1"
            />
          </View> 
        </ScrollView>
     
      </>)}
      </View>
      

    );
}


const styles = StyleSheet.create({
  container: {
    padding: 35,
    backgroundColor: '#000',
  },
  containerHeader: {
      backgroundColor: '#000',
      display: 'flex',
      flexDirection: 'row',
      height: 60,
      alignItems: 'center',
      marginTop: 50
  },
  image: {
    height: 25,
    width: 25,
  },
  button: {
    borderRadius: 5,
    padding: 3,
    margin: 10,
    },
    buttonSend: {
      borderRadius: 5,
      padding: 3,
      margin: 10,
      marginBottom: 150
      },
    title: {
      fontSize: 20,
      textAlign: 'center',
      color: '#f1f1f1',
      flexGrow: 2,
      marginRight: 60
  },
  body: {
    backgroundColor: '#000',
    flex: 1,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

