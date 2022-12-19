import {getFirestore} from 'firebase/firestore';
import firebase from 'firebase/compat/app'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native';

const firebaseConfig = {
    apiKey: "AIzaSyBIX4F4fUerk4h-gUleGDo17sMiTH5b8jI",
    authDomain: "reactnative-api-vision.firebaseapp.com",
    projectId: "reactnative-api-vision",
    storageBucket: "reactnative-api-vision.appspot.com",
    messagingSenderId: "814297100073",
    appId: "1:814297100073:web:b1e7c9cc28c7c02e269138",
    measurementId: "G-5JZJETCWDR"
};
 

export const app = initializeApp(firebaseConfig, 'application', );

export const db = getFirestore(app);

export const authentication = getAuth(app)


// export const authentication = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage),
//   });