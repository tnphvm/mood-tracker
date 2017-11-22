import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBGFYxgYLW7EZsJg_H7ZJiJuKa5bVo4Dks",
    authDomain: "secret-santa-a6c7d.firebaseapp.com",
    databaseURL: "https://secret-santa-a6c7d.firebaseio.com",
    projectId: "secret-santa-a6c7d",
    storageBucket: "secret-santa-a6c7d.appspot.com",
    messagingSenderId: "942355488424"
 };

 firebase.initializeApp(config);

 export const googleProvider = new firebase.auth.GoogleAuthProvider();
 export const ref = firebase.database().ref();
 export const firebaseAuth = firebase.auth;