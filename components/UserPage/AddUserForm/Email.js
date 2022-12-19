import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, Text, ScrollView, ActivityIndicator, View, Pressable, Image, SafeAreaView, StatusBar, TouchableOpacity, } from 'react-native';
import 'react-native-get-random-values';
import { setEmailValue, setValidEmail, setEditEmail, setOldEmailValue, setNewEmailValue } from '../../../utils/features/emailSlice';
import { setId } from '../../../utils/features/connectSlice';
import { selectEmail } from '../../../utils/selector';
import { useDispatch, useSelector } from 'react-redux';
import { db, } from "../../../database/firebaseDb";
import { doc, collection, getDoc } from 'firebase/firestore';

export default function Email(props) {
    const [email, setEmail] = React.useState('');
    const dispatch = useDispatch()
    const validEmail = useSelector(selectEmail);

    const onChangeEmail = (email) => {
      setEmail(email);
      dispatch(setEditEmail(props.edit));
    }

    const emailExist = async () => {
      const docRef = doc(db, "users", email);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        console.log("email invalid , already exist ", email);
        dispatch(setValidEmail(false));
      }
      else {
        console.log("email valid ", email);
        dispatch(setValidEmail(true));
        if(validEmail.editEmail === true){
          dispatch(setNewEmailValue(email));
          dispatch(setOldEmailValue(validEmail.emailValue));
          console.log("edit true");
        }
        else {
          dispatch(setEmailValue(email));
          console.log("edit false");
        }
        
        
        
        
      }
    }

    const validateEmail = () =>{
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const result = pattern.test(email);
        if(result===true){
          emailExist();
          console.log("edit ", validEmail.editEmail);
          if(validEmail.editEmail != true){
          dispatch(setOldEmailValue(email));
          console.log("old email check");
          }
        } else{
          console.log("email invalid ", email);
          dispatch(setValidEmail(false));
        }
      }

    return(
        <View>
            <Text style={styles.titleInput}>Email</Text>
          <View style={styles.inputGroup}>
          
            <TextInput
                style={styles.text}
                textContentType="emailAddress"
                keyboardType='email-address'
                placeholder={props.placeholder}
                autoCorrect={false}
                autoCapitalize='none'
                value={email}
                onChangeText={text=>onChangeEmail(text)}
                onEndEditing={validateEmail}
            />
          </View>
          <View style={{display: props.status != false ? 'none' : 'block'}}>
            <Text style={styles.textErr}>Email invalid</Text>
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