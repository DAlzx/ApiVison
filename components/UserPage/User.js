import React from 'react';
import { StyleSheet, ScrollView, ActivityIndicator,Image,Text, View, Pressable } from 'react-native';
import { db, } from "../../database/firebaseDb";
import { doc, collection, getDoc } from 'firebase/firestore';
import firebase from '../../database/firebaseDb';
import { useDispatch, useSelector} from 'react-redux';
import { selectConnect, selectPostcode, selectCity, selectUsername, selectEmail, selectBirthday, selectPassword, selectPhone } from '../../utils/selector';



export default function User({navigation}) {

  const dispatch = useDispatch();
  const connected = useSelector(selectConnect);
  const postcode = useSelector(selectPostcode);
  const city = useSelector(selectCity);
  const username = useSelector(selectUsername);
  const birthday = useSelector(selectBirthday);
  const passwordUser = useSelector(selectPassword);
  const phone = useSelector(selectPhone);
  const emailUser = useSelector(selectEmail);
 

    return (
        <View style={styles.body}>
            {connected.connect === false ? (
        <View style={styles.containerButton}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('ConnectUser')} ><Text style={styles.text}>Login</Text></Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('AddUser')} ><Text style={styles.text}>Register</Text></Pressable>
        </View> ) : (
        <>
        <View style={styles.header}>
            <Text style={styles.title}>Welcome {username.usernameValue}</Text>
            <Pressable style={styles.buttonS} onPress={() => navigation.navigate('Settings')} >
             <Image style={styles.image} source={require("../../assets/settings.png")}/>
            </Pressable>
        </View>
        <View style={styles.container}>
          <Text style={styles.textInfo}> Username : {username.usernameValue}</Text>
          <Text style={styles.textInfo}> Email : {emailUser.newEmailValue}</Text>
          <Text style={styles.textInfo}> Password : {passwordUser.passwordValue}</Text>
          <Text style={styles.textInfo}> Birthday : {birthday.birthdayValue}</Text>
          <Text style={styles.textInfo}> Phone Number : {phone.phoneValue}</Text>
          <Text style={styles.textInfo}> City : {city.cityValue}</Text>
          <Text style={styles.textInfo}> Postcode : {postcode.postcodeValue}</Text>

        </View>  
     
      </>)}
      </View>
      

    );
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#000'
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 70,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    image: {
      height: 25,
      width: 25,
    },
    buttonS: {
      borderRadius: 5,
      padding: 3,
      margin: 10,
      },
  container: {
   width: 330,
   height: 270,
   borderRadius: 20,
   backgroundColor: '#f1f1f1',
   justifyContent: 'center',
   marginLeft: 25,
   marginTop:50
  },
  text: {
    color: '#000',
    textAlign: 'center'
  },
  textInfo: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    padding: 5,
  },
  
   containerButton: {
      flex: 1,
      justifyContent: 'center',
    }, 
  button: {
    borderRadius: 5,
    padding: 3,
    margin: 10,
    backgroundColor: '#f1f1f1',
    width: 150,
    marginLeft: 110
    },
  title: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    color: '#f1f1f1',
    marginLeft: 130
  },
})
