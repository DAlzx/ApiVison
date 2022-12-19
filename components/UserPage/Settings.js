import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { db, authentication } from "../../database/firebaseDb";
import { deleteUser } from "firebase/auth";
import { doc, deleteDoc } from 'firebase/firestore';
import { setConnect, setReConnect, setReConnectWhere} from '../../utils/features/connectSlice';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { selectConnect, selectPostcode, selectCity, selectUsername, selectEmail, selectBirthday, selectPhone, selectPassword } from '../../utils/selector';
import { reauthenticateWithRedirect, updatePassword, EmailAuthProvider, updateEmail } from "firebase/auth";


export default function Settings({navigation}) {
  const dispatch = useDispatch()
  const connected = useSelector(selectConnect);
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const [deleteOK, setDeleteOK] = React.useState(null);
  
  const redirectConnection = () => {
    console.log("User re-authenticated");
    dispatch(setReConnect(true));
    dispatch(setReConnectWhere('Settings'));
  }

  const SignOUtUser = ()=> {
    signOut(authentication)
    .then((re)=>{
        dispatch(setConnect(false));
        navigation.navigate('User');
    })
    .catch((err)=>{
        console.log(err);
    })
}

const ButtonAlert = () =>
  Alert.alert(
    "Delete Account",
    "Do you really want to delete your account",
    [
      {
        text: "Delete",
        onPress: Delete,
        style: "destructive"
      },
      { text: "Cancel", onPress: console.log("Delete cancel "),
        style: "cancel"
    }
    ]
  );
 
function Delete(){
  const docRef = doc(db, "users", email.emailValue);
  const user = authentication.currentUser;
  const provider = navigation.navigate('ConnectUser');
  deleteUser(user)
  .then(() => {
    console.log("User auth has been deleted successfully.");
    deleteDoc(docRef)
    .then(() => {
      console.log("Entire Document has been deleted successfully.");
      dispatch(setConnect(false));
      navigation.navigate('User');
    })
    .catch(error => {
      console.log(error);
      alert("Error delete user");
    });
  })
  .catch((error) => {
    console.log(error);
    reauthenticateWithRedirect(authentication.currentUser, provider )
    .then(() => {
      redirectConnection();
    }).catch((error) => {
      console.log("re-auth ",error);
      alert("Error delete user");
    });
  });
  
  
}


const info = () => {
  console.log(email.oldEmailValue, email.emailValue, email.newEmailValue, password.passwordValue, password.newPasswordValue);
}


  return (
    <View style={styles.body}>
        <View style={styles.container}>
          <Pressable style={styles.button} onPress={() => navigation.goBack()} ><Image style={styles.image} source={require("../../assets/goBack.png")} /></Pressable>
          <Text style={styles.titleHeader}>Settings</Text>
        </View>
        <Text style={styles.title}>Mes Informations</Text>
        <View style={styles.containerSetting}>
          <Pressable style={styles.buttonSetting} onPress={() => navigation.navigate('UserInfo')} >
            <Text style={styles.text}>Information personnelle</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('UserInfo')} ><Image style={[styles.imageSetting,{transform: [{rotate: "180deg"}]}]} source={require("../../assets/goBack.png")} /></Pressable>
        </View>
        <View style={styles.containerSetting}>
          <Pressable style={styles.buttonSetting} onPress={() => navigation.navigate('UserPassword')} >
            <Text style={styles.text}>Information connection</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('UserPassword')} ><Image style={[styles.imageSetting,{transform: [{rotate: "180deg"}]}]} source={require("../../assets/goBack.png")} /></Pressable>
        </View>
        <Text style={styles.titleW}>Warning</Text>
        <View style={styles.containerSetting}>
          <Pressable style={styles.buttonSetting} onPress={ButtonAlert} >
            <Text style={styles.textW}>Delete my account</Text>
            </Pressable>
        </View>
        
        <View style={styles.button}>
          <Button
            title='Sign out'
            onPress={SignOUtUser} 
            color="red"
          />
        </View>
        <Pressable style={styles.buttonSetting} onPress={info} >
            <Text style={styles.text}>test</Text>
            </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#000',
        
    },
    delete: {
      color: "red",
      
    },
    button: {
      borderRadius: 5,
      padding: 3,
      margin: 10,
    },
    text: {
      color: '#f1f1f1',
    },
    textW: {
      color: 'red',
      marginTop: 10
    },
    container: {
      backgroundColor: '#000',
      display: 'flex',
      flexDirection: 'row',
      height: 60,
      alignItems: 'center',
      marginTop: 50
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
      color: '#f1f1f1',
      marginTop: 10
    },
    titleW: {
      fontSize: 18,
      color: 'red',
      marginTop: 10
    },
    image: {
      height: 25,
      width: 25,
    },
    imageSetting: {
      height: 18,
      width: 18,
    },
    buttonSetting: {
      borderRadius: 5,
    },
      
});
