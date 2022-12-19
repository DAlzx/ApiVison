import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, Text, ScrollView, ActivityIndicator, View, Pressable, Image, SafeAreaView, StatusBar, TouchableOpacity, } from 'react-native';
import 'react-native-get-random-values';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { setBirthdayValue, setValidBirthday, setEditBirthday,setNewBirthdayValue } from '../../../utils/features/birthdaySlice';
import { selectBirthday } from '../../../utils/selector';
import { useDispatch, useSelector } from 'react-redux';

export default function Birthday(props) {
    const [birthday, setBirthday] = React.useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const dispatch = useDispatch()
    const validBirthday = useSelector(selectBirthday);

    const onChangeBirthday = (birthday) => {
      setBirthday(birthday);
      dispatch(setEditBirthday(props.edit));
    }
        
    const validateBirthday= () => {
        var minDate = new Date("1940-01-01");
        var maxDate = new Date("2023-01-01");
        if( minDate.getTime() > birthday.getTime()  ){
          console.log('birthday invalid');
          dispatch(setValidBirthday(false));
        }else if( maxDate.getTime() < birthday.getTime()  ){
          console.log('birthday invalid');
          dispatch(setValidBirthday(false));
        } else{
          console.log("birthday valid ", birthday, minDate);
          dispatch(setValidBirthday(true));
          if(validBirthday.editBirthday === true){
            dispatch(setNewBirthdayValue(MounthInt(birthday.toString().split(' ')[2],birthday.toString().split(' ')[1],birthday.toString().split(' ')[3])));
          }
          else{
            dispatch(setNewBirthdayValue(MounthInt(birthday.toString().split(' ')[2],birthday.toString().split(' ')[1],birthday.toString().split(' ')[3])));
            dispatch(setBirthdayValue(MounthInt(birthday.toString().split(' ')[2],birthday.toString().split(' ')[1],birthday.toString().split(' ')[3])));
          }
        }
    
    }

    function MounthInt(day,mounth, years){
      var mm = "";
      switch (mounth){
        case 'Jan':
          mm =mounth.replace('Jan', '01');
          break;
        case 'Feb':
          mm =mounth.replace('Feb', '02');
          break;
        case 'Mar':
          mm =mounth.replace('Mar', '03');
          break;
        case 'Apr':
          mm =mounth.replace('Apr', '04');
          break;
        case 'May':
          mm =mounth.replace('May', '05');
          break;
        case 'Jun':
          mm =mounth.replace('Jun', '06');
          break;
        case 'Jul':
          mm =mounth.replace('Jul', '07');
          break;
        case 'Aug':
          mounth.replace('Aug', '08');
        case 'Sep':
          mm =mounth.replace('Sep', '09');
          break;
        case 'Oct':
          mm =mounth.replace('Oct', '10');
          break;
        case 'Nov':
          mm =mounth.replace('Nov', '11');
          break;
        case 'Dec':
          mm =mounth.replace('Dec', '12');
          break;
      }
      var replaceValue =day+"/"+ mm+"/"+years;
      //dispatch(setBirthdayValue(replaceValue));
      return replaceValue;
    }
    

    const showDatePicker = () => {
        setDatePickerVisibility(true);
        };
    
        const hideDatePicker = () => {
        setDatePickerVisibility(false);
        };
    
        const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        onChangeBirthday(date);
        hideDatePicker();
        };

    return (
        <View>
           <Text style={styles.titleInput}>Birth day</Text>
          <View style={styles.inputGroup}>
          
          <Pressable  onPress={showDatePicker}><Text style={styles.textInput}>{validBirthday.validBirthday === null ? props.placeholder : validBirthday.newBirthdayValue}</Text></Pressable>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={props.date}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            onHide={validateBirthday}
          />
        </View>
        <View style={{display: props.status != false ? 'none' : 'block'}}>
            <Text style={styles.textErr}>Birthday invalid</Text>
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
    textInput: {
      color: '#4f4f4f',
      fontSize: 13,
      backgroundColor: '#000',
      width: 300
    },
  })
