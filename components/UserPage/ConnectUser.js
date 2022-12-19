import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, Text, ScrollView, ActivityIndicator, View, Pressable, Image } from 'react-native';
import { db, authentication } from "../../database/firebaseDb";
import { doc, setDoc, addDoc, collection, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { setConnect, setReConnect, setReConnectWhere } from '../../utils/features/connectSlice';
import { selectConnect, selectPostcode, selectCity, selectUsername, selectEmail, selectBirthday, selectPassword, selectPhone } from '../../utils/selector';
import { setEmailValue, setNewEmailValue, setOldEmailValue } from '../../utils/features/emailSlice';
import { setPasswordValue, setNewPasswordValue } from '../../utils/features/passwordSlice';
import { setBirthdayValue,setNewBirthdayValue } from '../../utils/features/birthdaySlice';
import { setCityValue, setNewCityValue } from '../../utils/features/citySlice';
import { setUsernameValue, setNewUsernameValue } from '../../utils/features/usernameSlice';
import { setPostcodeValue, setNewPostcodeValue } from '../../utils/features/postcodeSlice';
import { setPhoneValue, setNewPhoneValue } from '../../utils/features/phoneSlice';


class UserInfo {
  constructor (name, email, password, birthday, phone_number,city, post_code ) {
    this.name = name;
    this.email = email;
    this.city = city;
    this.birthday = birthday;
    this.password = password;
    this.phone_number = phone_number;
    this.post_code = post_code;
  }
  toString() {
      return this.name + ', ' + this.email + ', ' + this.birthday+ ', ' + this.password + ', ' + this.city+ ', ' + this.phone_number + ', ' + this.post_code;
  }

}

const userConverter = {
  toFirestore: (user) => {
      return {
        name: user.name,
        email: user.email,
        city: user.city,
        birthday: user.birthday,
        password: user.password,
        phone_number: user.phone_number,
        post_code: user.post_code,
          };
  },
  fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new UserInfo(data.name, data.email, data.password, data.birthday, data.phone_number, data.city, data.post_code);
  }
};


export default function ConnectUser({navigation}) { 

    const [isLoading, setIsLoading] = React.useState(null);
    const [loginErr, setLoginErr] = React.useState(null);
    const dispatch = useDispatch();
    const connected = useSelector(selectConnect);
    const emailUser = useSelector(selectEmail);
    const [hiddenPassword, setHiddenPassword] = React.useState(true);
    const userId = emailUser.emailValue;

    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');

    const getUserInfo = async () => {
      if(connected.connect === true){
        const docRef = doc(db, 'users', userId).withConverter(userConverter);
        const docSnap = await getDoc(docRef);
        const user = docSnap.data();
        dispatch(setBirthdayValue(user.birthday));
        dispatch(setUsernameValue(user.name));
        dispatch(setPasswordValue(user.password));
        dispatch(setCityValue(user.city));
        dispatch(setPhoneValue(user.phone_number));
        dispatch(setPostcodeValue(user.post_code));
        dispatch(setNewBirthdayValue(user.birthday));
        dispatch(setNewUsernameValue(user.name));
        dispatch(setNewPasswordValue(user.password));
        dispatch(setNewCityValue(user.city));
        dispatch(setNewPhoneValue(user.phone_number));
        dispatch(setNewPostcodeValue(user.post_code));
        dispatch(setNewEmailValue(user.email))
        dispatch(setOldEmailValue(email));
        console.log('skrrr ',user.toString());
      }
      else{
        console.log("no user connected");
      }
    }

    const SignInUser = ()=> {
      signInWithEmailAndPassword(authentication, email, password)
      .then((re)=>{
        dispatch(setConnect(true));
        dispatch(setEmailValue(email));
        setLoginErr(true);
        console.log("auth ok");
      })
      .catch((re)=>{
          console.log("auth ",re);
          setLoginErr(false);
      })
    }

   const LoginUser = () => {
    if(loginErr === false){
      console.log("error login");
    }
    else{
      
      if(connected.reconnect === true){
        console.log("user re-login ", emailUser.emailValue);
        navigation.navigate(connected.reconnectWhere);
        dispatch(setReConnect(false));
        dispatch(setReConnectWhere(""));
      }
      else {
        getUserInfo();
        console.log("user login ", emailUser.emailValue);
        navigation.navigate('User');
      }
    }
   }
   const info = () => {
    console.log(connected.reconnect);
   }

    return (
        <View style={styles.body}>
            {isLoading === true ? (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#f1f1f1"/>
        </View> ) : (
        <>
        <View style={styles.containerHeader}>
          <Pressable style={styles.button} onPress={() => navigation.goBack()} ><Image style={styles.image} source={require("../../assets/goBack.png")} /></Pressable>
          <Text style={styles.title}>Login</Text>
        </View>
      <ScrollView style={styles.container}>
      <Text style={styles.titleInput}>Email</Text>
        <View style={styles.inputGroup}>
          <TextInput
              style={styles.text}
              placeholder={'exemple@gmail.com'}
              autoCorrect={false}
              autoCapitalize='none'
              textContentType="emailAddress"
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
              onEndEditing={SignInUser}
          />
        </View>
        <Text style={styles.titleInput}>Password</Text>
        <View style={styles.input}>
          <TextInput
              style={styles.text}
              placeholder={'********'}
              value={password}
              secureTextEntry={hiddenPassword}
              onChangeText={text=>setPassword(text)}
              onEndEditing={SignInUser}
              
          />
          <Pressable onPress={()=> setHiddenPassword(!hiddenPassword)} >
                <Image style={styles.imagePassword} source={hiddenPassword === true ? require("../../assets/hidden.png") : require("../../assets/show.png")} />
                </Pressable>
        </View>
        <View style={{display: loginErr != false ? 'none' : 'block'}}>
            <Text style={styles.textErr}>Email or password invalid</Text>
          </View>
        <View style={styles.button}>
          <Button
            title='Login'
            onPress={LoginUser} 
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
  titleInput: {
    color: '#f1f1f1',
    fontSize: 17,
    marginBottom: 5
  },
  imagePassword: {
    height: 20,
    width: 20,
  },
  textErr: {
    color: "red",
    fontSize: 14,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#f1f1f1',
    flexGrow: 2,
    marginRight: 60
},
  button: {
    borderRadius: 5,
    padding: 3,
    margin: 10,
    },
  body: {
    backgroundColor: '#000',
    flex: 1,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 40,
    color: '#f1f1f1',
  },
  input: {
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    color: '#f1f1f1',
    marginBottom: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: '#f1f1f1',
    width: 250
  },
  image: {
    height: 25,
    width: 25,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerHeader: {
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    marginTop: 50
  },
})