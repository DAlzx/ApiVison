import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, Text, ScrollView, ActivityIndicator, View, Pressable, Image, SafeAreaView, StatusBar, TouchableOpacity, } from 'react-native';
import 'react-native-get-random-values';
import { setValidPostcode, setPostcodeValue, setEditPostcode,setNewPostcodeValue } from '../../../utils/features/postcodeSlice';
import { selectPostcode } from '../../../utils/selector';
import { useDispatch, useSelector } from 'react-redux';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';

export default function Postcode(props) {

    const dispatch = useDispatch()
    const validPostcode = useSelector(selectPostcode);
    const [postCode, setPostCode] = React.useState('');

    const onChangePostcode = (postcode) => {
      setPostCode(postcode);
      dispatch(setEditPostcode(props.edit));
    }

    const validatePostcode = () =>{
      if(postCode === "" || postCode.length != 5){
        console.log("post code invalid");
        dispatch(setValidPostcode(false));
      } else{
        console.log("post code valid ");
        dispatch(setValidPostcode(true));
        if(validPostcode.editPostcode === true){
          dispatch(setNewPostcodeValue(postCode));
        }
        else{
          dispatch(setPostcodeValue(postCode));
          dispatch(setNewPostcodeValue(postCode));
        }
      }
    }

    return (
        <View>
           <Text style={styles.titleInput}>Post code</Text>
          <View style={styles.inputGroup}>
          
            <TextInput
                style={styles.text}
                enablesReturnKeyAutomatically
                placeholder={props.placeholder}
                textContentType="postalCode"
                keyboardType="number-pad"
                maxLength={5}
                value={postCode}
                onChangeText={text=>onChangePostcode(text)}
                onEndEditing={validatePostcode}
            />
          </View>
          <View style={{display: props.status!= false ? 'none' : 'block'}}>
            <Text style={styles.textErr}>Post code invalid</Text>
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
  