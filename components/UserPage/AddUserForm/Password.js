import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, Text, ScrollView, ActivityIndicator, View, Pressable, Image, SafeAreaView, StatusBar, TouchableOpacity, } from 'react-native';
import 'react-native-get-random-values';
import { setPasswordValue, setValidPassword, setEditPassword, setNewPasswordValue } from '../../../utils/features/passwordSlice';
import { selectPassword } from '../../../utils/selector';
import { useDispatch, useSelector } from 'react-redux';

export default function Password(props) {
    const [password, setPassword] = React.useState(props.value);
    const [confirmPassword, setConfirmPassword] = React.useState(props.value);
    const dispatch = useDispatch()
    const validPassword = useSelector(selectPassword);
    const [hiddenPassword, setHiddenPassword] = React.useState(true);
    const [hiddenConfirmPassword, setHiddenConfirmPassword] = React.useState(true);
   
    const onChangePassword = (password) => {
      setPassword(password);
      dispatch(setEditPassword(props.edit));
    }

    const validatePassword = () =>{
        var countErr = 0;
          if(8 <= password.length){
            console.log("password length valid");
          }
          else {
            console.log("Password length invalid");
            countErr += 1;
          }
          if(password === confirmPassword){
            console.log("password = confirm valid");
          }
          else {
            console.log("Password = confirm invalid");
            countErr += 1;
          }
          var regCharacterSpecial = /[àâäãçéèêëìîïòôöõùûüñ²¤,:&§%~¨£.@€*!`<>|;?=+@#^"°'{}$%()[\]]/g;
          if(password.match(regCharacterSpecial) != null){
            console.log("password characters special valid"); 
          }
          else {
            console.log("Password characters special invalid");
            countErr +=1;
          }
          var regNumber = /[0-9]/;
          if(password.match(regNumber) != null){
            console.log("password number valid"); 
          }
          else {
            console.log("Password number invalid");
            countErr +=1;
          }
          var regCapitalize = /[A-Z]/;
          if(password.match(regCapitalize) != null){
            console.log("password capitalize valid"); 
          }
          else {
            console.log("Password capitalize invalid");
            countErr +=1;
          }
          if(countErr > 0 ){
            dispatch(setValidPassword(false));
            countErr = 0;
          }
          else {
            dispatch(setValidPassword(true));
            countErr = 0;
            if(validPassword.editPassword === true){
              dispatch(setNewPasswordValue(password));
            }
            else{
              dispatch(setPasswordValue(password));
            }
            
          }
      }

    return (
        <View>
           <Text style={styles.titleInput}>{props.title}</Text>
          <View style={styles.inputGroup}>
          
            <TextInput
                style={styles.text}
                placeholder={props.placeholder}
                autoCapitalize='none'
                textContentType='oneTimeCode'
                maxLength={20}
                value={password}
                secureTextEntry={hiddenPassword}
                onChangeText={text=>onChangePassword(text)} 
                onEndEditing={validatePassword}
            />
            <Pressable onPress={()=> setHiddenPassword(!hiddenPassword)} >
              <Image style={styles.imagePassword} source={hiddenPassword === true ? require("../../../assets/hidden.png") : require("../../../assets/show.png")} />
            </Pressable>
          </View>
          <Text style={styles.titleInput}>{props.title2}</Text>
          <View style={styles.inputGroup}>
          
            <TextInput
                  style={styles.text}
                  placeholder={props.placeholder}
                  textContentType='oneTimeCode'
                  maxLength={20}
                  autoCapitalize='none'
                  value={confirmPassword}
                  secureTextEntry={hiddenConfirmPassword}
                  onChangeText={text=>setConfirmPassword(text)}  
                  onEndEditing={validatePassword}
              />
              <Pressable onPress={()=> setHiddenConfirmPassword(!hiddenConfirmPassword)} >
                <Image style={styles.imagePassword} source={hiddenConfirmPassword === true ? require("../../../assets/hidden.png") : require("../../../assets/show.png")} />
              </Pressable>
          
          </View>
          <View style={{display: props.status != false ? 'none' : 'block'}}>
            <Text style={styles.textErr}>Password invalid</Text>
          </View>
        </View>


    );

};

const styles = StyleSheet.create({
    textErr: {
      color: "red",
      fontSize: 14,
      marginBottom: 40,
    },
    imagePassword: {
      height: 20,
      width: 20,
    },
    inputGroup: {
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
    titleInput: {
      color: '#f1f1f1',
      fontSize: 17,
      marginBottom: 5
    },
    text: {
      color: '#f1f1f1',
      width: 250
    },
  })
  