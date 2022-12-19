import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Button, Image, StyleSheet, Text, View, Pressable,  } from 'react-native';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger, } from "react-native-popup-menu";

const API_KEY = 'AIzaSyBIX4F4fUerk4h-gUleGDo17sMiTH5b8jI';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

async function callGoogleVisionAsync(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'LABEL_DETECTION',
            maxResults: 1,
          },
        ],
      },
    ],
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  console.log('callGoogleVisionAsync -> result', result);

  return result.responses[0].labelAnnotations[0].description;
}

  export const askPermissionsAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    let gallery = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false && gallery.granted === false) {
      alert('Permission to access camera roll and storage is required!');
      return;
    } else {
      setPermissions(true);
    }
  };

export default function FormApi({ navigation}) {
  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [permissions, setPermissions] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  //const { itemId, otherParam } = route.params;
  //faire un redux pour global permission photo
  const askPermissionsAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    let gallery = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false && gallery.granted === false) {
      alert('Permission to access camera roll and storage is required!');
      return;
    } else {
      setPermissions(true);
    }
  };

  const pickPicture = async () => {
    const { cancelled, uri, base64 } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4.3],
    //   quality: 1,
      
    // });

    callGoogleVisionAsync(base64);
    if (!cancelled) {
      setImage(uri);
      setStatus("Loading...");
      try {
        const result = await callGoogleVisionAsync(base64);
        setStatus(result);
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }

  }
  const takePictureAsync = async () => {
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    // const { cancelled, uri, base64 } = await ImagePicker.launchImageLibraryAsync({
    //   base64: true,
    // });
    callGoogleVisionAsync(base64);
    if (!cancelled) {
      setImage(uri);
      setStatus("Loading...");
      try {
        const result = await callGoogleVisionAsync(base64);
        setStatus(result);
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }
  };

  const Press = () => {
    setPressed(pressed => !pressed);
  }

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.title}>Pick your Outfit</Text>
      {/* <Pressable style={styles.button} onPress={() => navigation.push('SearchApi')} >
        <Text Text style={styles.textButton}>Test Api Vision... again</Text>
      </Pressable>
      <Button title="Update the title" onPress={() => navigation.setOptions({ title: 'Updated!' })} /> */}
        
        {permissions === false ? (
          <Pressable style={styles.button} onPress={askPermissionsAsync} ><Text Text style={styles.textButton}>Ask permissions</Text></Pressable>
        ) : (
          <>
            {image && <Image style={styles.image} source={{ uri: image }} />}
            {status && <Text style={styles.text}>{status}</Text>}
            
            <Pressable style={styles.buttonPop} onPress={Press}><Text style={styles.textButton}>Take a Picture</Text></Pressable>
            <View style={{ display: pressed === true ? 'block' : 'none', height: 500, justifyContent: 'center'}}>
              <View style={styles.pop}>
                <Pressable style={styles.button} onPress={takePictureAsync} ><Text Text style={styles.textButton}>From Camera</Text></Pressable>
                <Pressable style={styles.button} onPress={pickPicture} ><Text Text style={styles.textButton}>From Storage</Text></Pressable>
              </View>
            </View>
         
          </>
        )}
        
      </View>
      
      {/*<Pressable style={styles.button} onPress={() => navigation.popToTop()} ><Text Text style={styles.text}>Go back to first screen in stack</Text></Pressable>permet de revenir au premier ecran*/}
      {/* <View style={styles.containerButton}>
          <Pressable style={styles.button1} onPress={() => navigation.goBack()} ><Text style={styles.textButton}>Go back</Text></Pressable>
          <Pressable style={styles.button1} onPress={() => navigation.navigate('Home')} ><Text style={styles.textButton}>Go to Home</Text></Pressable> 
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#000',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  container: {
    marginTop: 70,
    height: 50,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    margin: 5,
    fontSize: 15,
    textAlign: 'center',
    color: "#f1f1f1"
  }, 
  buttonPop: {
    color: '#f1f1f1',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    padding: 10,
    textAlign: 'center'
  },
  button: {
    color: '#f1f1f1',
    backgroundColor: '#f1f1f1',
    padding: 10,
    textAlign: 'center', 
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  pop: {
    backgroundColor: '#f1f1f1',
    width: 200,
    height: 90,
    borderRadius: 5,

  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#f1f1f1',
    marginBottom: 20
  },
  textButton: {
    margin: 5,
    fontSize: 15,
    textAlign: 'center',
    color: "#000",
    },
  // containerButton: {
  //   display: 'flex',
  //   flexDirection: 'row',
  // }, 
  // button1: {
  //   flexGrow: 1,
  //   backgroundColor: '#f1f1f1',
  //   padding: 10,
  //   height: 80
  // },
});