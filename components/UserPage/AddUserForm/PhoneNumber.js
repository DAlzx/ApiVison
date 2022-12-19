import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, Text, ScrollView, ActivityIndicator, View, Pressable, Image, SafeAreaView, StatusBar, TouchableOpacity, } from 'react-native';
import 'react-native-get-random-values';
import 'react-native-get-random-values';
import PhoneInput from 'react-native-phone-number-input';
import { setValidPhone, setPhoneValue, setEditPhone,setNewPhoneValue } from '../../../utils/features/phoneSlice';
import { selectPhone } from '../../../utils/selector';
import { useDispatch, useSelector } from 'react-redux';


export default function PhoneNumber(props) {
    const [value, setValue] = React.useState("");
    const [enterPhone, setEnterPhone] = React.useState(false);
    const [formattedValue, setFormattedValue] = React.useState("");
    const dispatch = useDispatch()
    const validPhone = useSelector(selectPhone);
    const phoneInput = React.useRef(null);

    const onChangePhone = (phone) => {
      setValue(phone);
      dispatch(setEditPhone(props.edit));
    }

    const validatePhone = () =>{
        // const checkValid = phoneInput.current?.isValidNumber(value);
        // setValid(checkValid ? checkValid : false);
        // console.log('phone verif');
        if(enterPhone === true){
          if(value.slice(0,1) === '0' || value.length != 9){
            console.log('phone invalid');
            dispatch(setValidPhone(false));
          } else{
            console.log("phone valid ");
            dispatch(setValidPhone(true));
            if(validPhone.editPhone === true){
              dispatch(setNewPhoneValue(formattedValue));
            }
            else{
              dispatch(setPhoneValue(formattedValue));
              dispatch(setNewPhoneValue(formattedValue));
            }
            setEnterPhone(false);
          }
        }
        else {
          console.log("phone number not enter");
        }
       
    }

    return (
        <View>
           <Text style={styles.titleInput}>Phone number</Text>
          <View style={styles.input}>
          
            <PhoneInput
              
              placeholder={props.placeholder}
              ref={phoneInput}
              defaultCode="FR"
              containerStyle={{borderRadius:20,backgroundColor: '#f1f1f1', width:300}}
              textInputStyle={{color:"#000"}}
              codeTextStyle={{color:"#000"}}
              flagButtonStyle={{color:"#000"}}
              enablesReturnKeyAutomatically
              textContainerStyle={{backgroundColor:'#f1f1f1',borderRadius:20,color:"#ffffff",padding:0,}}
              phoneInputContainer={true}
              textInputProps={{placeholderTextColor:"#000", maxLength:9, onEndEditing: validatePhone()  /*textContentType: "telephoneNumber"*/}}
              layout="first"
              keyboardType={'number-pad'}
              onChangeText={(text) => {
                onChangePhone(text);
                setEnterPhone(true);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
                
              }}
              
              withDarkTheme
              withShadow
            />
            {/* <TouchableOpacity
            style={styles.button}
            onPress={validatePhone}
          >
            <Text style={styles.text}>Check phone number</Text>
          </TouchableOpacity> */}
          </View>
          <View style={{display: enterPhone === false && props.status != false  ? 'none' : 'block'}}>
            <Text style={styles.textErr}>Phone number invalid</Text>
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
    titleInput: {
      color: '#f1f1f1',
      fontSize: 17,
      marginBottom: 5,
    },  
  input: {
    padding: 0,
    marginBottom: 15,
    marginBottom: 40,
    color: '#f1f1f1',
    
  },
    text: {
      color: '#f1f1f1',
      width: 250
    },
  })
  