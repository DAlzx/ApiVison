import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, Button, ScrollView } from 'react-native';
import { db, authentication } from "../../../database/firebaseDb";
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useDispatch, useSelector} from 'react-redux';
import { setConnect, setReConnect, setReConnectWhere} from '../../../utils/features/connectSlice';
import { selectConnect, selectPostcode, selectCity, selectUsername, selectEmail, selectBirthday, selectPhone, selectPassword } from '../../../utils/selector';
import { setValidPassword } from '../../../utils/features/passwordSlice';
import { setValidBirthday,setBirthdayValue } from '../../../utils/features/birthdaySlice';
import { setValidCity, setCityValue } from '../../../utils/features/citySlice';
import { setEmailValue, setValidEmail, setEditEmail, setOldEmailValue } from '../../../utils/features/emailSlice';
import { setValidUsername, setUsernameValue } from '../../../utils/features/usernameSlice';
import { setValidPostcode, setPostcodeValue } from '../../../utils/features/postcodeSlice';
import { setValidPhone, setPhoneValue } from '../../../utils/features/phoneSlice';
import { reauthenticateWithRedirect,reauthenticateWithCredential, EmailAuthProvider, updateEmail } from "firebase/auth";
import Email from '../AddUserForm/Email';
import Username from '../AddUserForm/Username';
import PhoneNumber from '../AddUserForm/PhoneNumber';
import Birthday from '../AddUserForm/Birthday';
import City from '../AddUserForm/City';
import Postcode from '../AddUserForm/Postcode';


export default function UserInfo({navigation}) {
  const dispatch = useDispatch()
  const postcode = useSelector(selectPostcode);
  const city = useSelector(selectCity);
  const username = useSelector(selectUsername);
  const birthday = useSelector(selectBirthday);
  const password = useSelector(selectPassword);
  const phone = useSelector(selectPhone);
  const email = useSelector(selectEmail);
  const [validField, setValidField] = React.useState(null);

  function setData(){
    const docRef = doc(db, "users", email.emailValue);
    dispatch(setBirthdayValue(birthday.newBirthdayValue));
    dispatch(setUsernameValue(username.newUsernameValue));
    dispatch(setCityValue(city.newCityValue));
    dispatch(setPhoneValue(phone.newPhoneValue));
    dispatch(setPostcodeValue(postcode.newPostcodeValue));
    dispatch(setEmailValue(email.newEmailValue));
        
    const data = {
      name: username.newUsernameValue,
      email: email.newEmailValue,
      birthday: birthday.newBirthdayValue,
      city: city.newCityValue,
      password: password.passwordValue,
      post_code: postcode.newPostcodeValue,
      phone_number: phone.newPhoneValue,
    }
    if(username.validUsername === false || birthday.validBirthday === false || city.validCity === false || postcode.validPostcode === false || phone.validPhone === false){
        console.log("Field invalid");
        setValidField(false);
    }
    else {
      setDoc(docRef, data, { merge:true })
      .then(docRef => {
          console.log("Document Field has been updated successfully");
          setValidField(true);
          navigation.navigate('Settings');
      })
      .catch(error => {
          console.log(error);
          setValidField(false);
      });
    }
  }

  function goBack(){
    navigation.goBack();
    dispatch(setValidBirthday(null));
    dispatch(setValidCity(null));
    dispatch(setValidPostcode(null));
    dispatch(setValidUsername(null));
    dispatch(setValidPhone(null));
  }


  return (
    <View style={styles.body}>
        <View style={styles.container}>
          <Pressable style={styles.button} onPress={goBack} ><Image style={styles.image} source={require("../../../assets/goBack.png")} /></Pressable>
          <Text style={styles.titleHeader}>Information personnelle</Text>
        </View>
        <ScrollView style={styles.containerInfo}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Mes Informations</Text>
            </View>
        
            <Username placeholder={username.usernameValue} status={username.validUsername} edit={true}/>
            <Birthday placeholder={birthday.birthdayValue} status={birthday.validBirthday} edit={true} date={new Date(birthday.birthdayValue.split('/')[2]+'-'+birthday.birthdayValue.split('/')[1]+'-'+birthday.birthdayValue.split('/')[0])}/>
            <PhoneNumber placeholder={phone.phoneValue.replace("+33", "")} status={phone.validPhone} edit={true}/>
            <City placeholder={city.cityValue} status={city.validCity} edit={true} />
            <Postcode placeholder={postcode.postcodeValue} status={postcode.validPostcode} edit={true}/>
            <View style={{display: validField === false ? 'block' : 'none'}}>
                <Text style={styles.textErr}>Field invalid</Text>
            </View>
            <View style={{display: validField === true ? 'block' : 'none'}}>
                <Text style={styles.textValid}>Field updated</Text>
            </View>
            <View style={styles.buttonSend}>
            <Button
              title='Confirm change'
              onPress={setData} 
              color="#f1f1f1"
            />
          </View> 
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#000',
        
    },
    button: {
      borderRadius: 5,
      padding: 3,
      margin: 10,
      },
      text: {
        color: '#f1f1f1',
        padding: 10
      },
    container: {
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        marginTop: 50
    },
    containerInfo: {
        paddingBottom: 200
    },
    containerTitle: {
        backgroundColor: '#f1f1f1',
        padding: 10,
        marginTop: 50,
        marginBottom: 20
    },
    containerSetting: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
    titleHeader: {
        fontSize: 20,
        textAlign: 'center',
        color: '#f1f1f1',
        flexGrow: 2,
        marginRight: 60
    },
    title: {
      fontSize: 18,
      color: '#000',
  },
    image: {
      height: 25,
      width: 25,
    },
    buttonSetting: {
      borderRadius: 5,
    },
    textErr: {
        color: "red",
        fontSize: 14,
        marginBottom: 40,
    },
    textValid: {
        color: "green",
        fontSize: 14,
        marginBottom: 40,
    },
    buttonSend: {
        borderRadius: 5,
        padding: 3,
        margin: 10,
        marginBottom: 150
    },
      
});
