import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, Button, ScrollView } from 'react-native';
import { db, authentication } from "../../../database/firebaseDb";
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { setEmailValue, setValidEmail, setEditEmail, setOldEmailValue, setNewEmailValue } from '../../../utils/features/emailSlice';
import { setEditPassword, setPasswordValue, setValidPassword } from '../../../utils/features/passwordSlice';
import { setConnect, setReConnect, setReConnectWhere} from '../../../utils/features/connectSlice';
import { useDispatch, useSelector} from 'react-redux';
import { selectConnect, selectPostcode, selectCity, selectUsername, selectEmail, selectBirthday, selectPhone, selectPassword } from '../../../utils/selector';
import Password from '../AddUserForm/Password';
import Email from '../AddUserForm/Email';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider, updateEmail } from "firebase/auth";


export default function UserPassword({navigation}) {
  const dispatch = useDispatch()
  const connect = useSelector(selectConnect);
  const password = useSelector(selectPassword);
  const postcode = useSelector(selectPostcode);
  const city = useSelector(selectCity);
  const username = useSelector(selectUsername);
  const birthday = useSelector(selectBirthday);
  const phone = useSelector(selectPhone);
  const email = useSelector(selectEmail);
  const [validField, setValidField] = React.useState(null);
  let credential = EmailAuthProvider.credential(authentication.currentUser.email, password.passwordValue);

  const redirectConnection = () => {
    console.log("User re-authenticated");
    dispatch(setReConnect(true));
    dispatch(setReConnectWhere('UserPassword'));
    navigation.navigate('ConnectUser');
    console.log("reconnect let's goo");

  } 
  const changePassword = async() => {
    const docRef = doc(db, "users", email.emailValue);
    const data = {
      name: username.usernameValue,
      email: email.emailValue,
      birthday: birthday.birthdayValue,
      city: city.cityValue,
      password: password.passwordValue,
      post_code: postcode.postcodeValue,
      phone_number: phone.phoneValue,
    }
    if(password.validPassword === false){
      console.log("Password invalid");
      setValidField(false);
    }
    else { 
      await updatePassword(authentication.currentUser, password.passwordValue)
      .then(() => {
        setDoc(docRef, data, { merge:true })
        .then(docRef => {
          console.log("Document password has been updated successfully");
          setValidField(true);
          dispatch(setEditPassword(null));
          setValidField(true);
          navigation.navigate('Settings')
        })
        .catch(error => {
          console.log(error);
          setValidField(false);
        }); 
      })
      .catch((error) => {
        console.log("change password ",error);
        reauthenticateWithCredential(authentication.currentUser, credential)
          .then(() => {
            redirectConnection();
          }).catch((error) => {
            console.log("re-auth ",error, password.passwordValue, password.newPasswordValue);
            setValidField(false);
          });
      });
    }
  }

  const changeEmail = async() => {
    const docRef = doc(db, "users", email.newEmailValue);
    const oldDocRef = doc(db, "users", email.oldEmailValue);
    const data = {
        name: username.usernameValue,
        email: email.emailValue,
        birthday: birthday.birthdayValue,
        city: city.cityValue,
        password: password.passwordValue,
        post_code: postcode.postcodeValue,
        phone_number: phone.phoneValue,
    }
    if(email.validEmail === false){
        console.log("Field invalid");
        setValidField(false);
    }
    else {
      await updateEmail(authentication.currentUser, email.newEmailValue)
      .then(() => {
        deleteDoc(oldDocRef)
        .then(() => {
          console.log("Entire Document has been deleted successfully.");
          setDoc(docRef, data, { merge:true })
          .then(docRef => {
              console.log("Document Field has been updated successfully");
              setValidField(true);
              dispatch(setEditEmail(null));
              navigation.navigate('User');
          })
          .catch(error => {
              console.log(error);
              setValidField(false);
          });
        })
        .catch(error => {
          console.log(error);
          alert("Error delete old doc user");
        });
      })
      .catch((error) => {
        console.log(error);
        reauthenticateWithCredential(authentication.currentUser, credential)
        .then(() => {
          redirectConnection();
        }).catch((error) => {
          console.log(error);
          setValidField(false);
        });
      });
    }
  }
    
  
   
  function setData(){
    if(email.editEmail === true){
      changeEmail();
      dispatch(setEmailValue(email.newEmailValue));
    }
    else {
      console.log("no edit email");
    }
    if(password.editPassword === true) {
      changePassword();
    }
    else{
      console.log("no edit password");
    }
  }
  
  function goBack(){
    navigation.goBack();
    dispatch(setValidEmail(null));
    dispatch(setValidPassword(null));
    dispatch(setEditEmail(null));
    dispatch(setEditPassword(null));
    dispatch(setNewEmailValue(email.emailValue));
    dispatch(setPasswordValue(password.passwordValue))
  }


  return (
    <View style={styles.body}>
        <View style={styles.container}>
          <Pressable style={styles.button} onPress={goBack} ><Image style={styles.image} source={require("../../../assets/goBack.png")} /></Pressable>
          <Text style={styles.titleHeader}>Information connection</Text>
        </View>
        <ScrollView style={styles.containerInfo}>
             <View style={styles.containerTitleP}>
                <Text style={styles.title}>My Password</Text>
            </View>
            <Email placeholder={email.emailValue} status={email.validEmail} edit={true}/>
            <Password placeholder="" status={password.validPassword} value={password.newPasswordValue} title='New Password' title2='Confirm New Password' edit={true}  />
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
    containerTitleP: {
      backgroundColor: '#f1f1f1',
      padding: 10,
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
