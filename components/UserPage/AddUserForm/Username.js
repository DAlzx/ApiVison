import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, Text, ScrollView, ActivityIndicator, View, Pressable, Image, SafeAreaView, StatusBar, TouchableOpacity, } from 'react-native';
import 'react-native-get-random-values';
import { setValidUsername, setUsernameValue,setEditUsername,setNewUsernameValue } from '../../../utils/features/usernameSlice';
import { selectUsername } from '../../../utils/selector';
import { useDispatch, useSelector } from 'react-redux';


export default function Username(props) {
    const [username, setUsername] = React.useState('');
    const dispatch = useDispatch()
    const validUsername = useSelector(selectUsername);

    const onChangeUsername = (username) => {
      setUsername(username);
      dispatch(setEditUsername(props.edit));
    }

    const validateUsername = () =>{
        var reg = /[àâäãçéèêëìîïòôöõùûüñ²¤,:&§%~¨£.@€*!`<>|;?=+@#^"°'{}$%()[\]]/g;
        var matches = username.match(reg)
        if (matches === null && username != ""){
          console.log("username valid");
          dispatch(setValidUsername(true));
          if(validUsername.editUsername === true){
            dispatch(setNewUsernameValue(username));
          }
          else{
            dispatch(setUsernameValue(username));
            dispatch(setNewUsernameValue(username));
          }
        }
        else {
          console.log("username invalid", matches)
          dispatch(setValidUsername(false));
        }
      }

    return (
        <View>
            <Text style={styles.titleInput}>Username</Text>
          <View style={styles.inputGroup}>
            
            <TextInput
                style={styles.text}
                placeholder={props.placeholder}
                maxLength={15}
                textContentType="name"
                value={username}
                onChangeText={text=>onChangeUsername(text)}
                onEndEditing={validateUsername}
            />
          </View>
          <View style={{display: props.status != false ? 'none' : 'block'}}>
            <Text style={styles.textErr}>Username invalid</Text>
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
  