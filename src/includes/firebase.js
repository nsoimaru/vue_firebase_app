// Import the functions you need from the SDKs you need
// import * as firebase from 'firebase/app';
// import 'firebase/auth';

// require('firebase/auth');

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCaaXfFFVCOywZdi0KD0ESFCHjuN_KetLI',
  authDomain: 'music-4f8db.firebaseapp.com',
  projectId: 'music-4f8db',
  storageBucket: 'music-4f8db.appspot.com',
  appId: '1:217316384274:web:20181dac83f59a19c082cb',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = firebase.auth();
const db = firebase.firestore();

export {
  auth,
  db,
};
