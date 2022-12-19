import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, Text, ScrollView, ActivityIndicator, View, Pressable, Image, SafeAreaView, StatusBar, TouchableOpacity, } from 'react-native';
import 'react-native-get-random-values';
import { setCityValue, setValidCity, setEditCity, setNewCityValue } from '../../../utils/features/citySlice';
import { selectCity } from '../../../utils/selector';
import { useDispatch, useSelector } from 'react-redux';


export default function City(props) {
    const [city, setCity] = React.useState('');
    const dispatch = useDispatch()
    const validCity = useSelector(selectCity);

    const onChangeCity = (city) => {
      setCity(city);
      dispatch(setEditCity(props.edit));
    }

    const validateCity = () =>{
        var reg = /[²¤,:&§%~¨£._@€*!`<>|;?=+@#^"°'{}$%()[\]]/g;
        var matches = city.match(reg)
        if (matches === null && city != ""){
          console.log("city valid");
          dispatch(setValidCity(true));
          if(validCity.editCity === true){
            dispatch(setNewCityValue(city));
          }
          else{
            dispatch(setCityValue(city));
            dispatch(setNewCityValue(city));
          }
        }
        else {
          console.log("city invalid", matches)
          dispatch(setValidCity(false));
        }
      }

    return (
        <View>
             <Text style={styles.titleInput}>City</Text>
          <View style={styles.inputGroup}>
            <TextInput
                style={styles.text}
                placeholder={props.placeholder}
                textContentType="addressCity"
                maxLength={60}
                enablesReturnKeyAutomatically
                value={city}
                onChangeText={text=>onChangeCity(text)}
                onEndEditing={validateCity}
            />
          </View>
          <View style={{display: props.status != false ? 'none' : 'block'}}>
            <Text style={styles.textErr}>City invalid</Text>
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
  