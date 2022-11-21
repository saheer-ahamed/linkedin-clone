import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDGxGiupQS_fflN9vBNCfks4NMEKKUFbq0",
    authDomain: "linkedin-clone-e5fad.firebaseapp.com",
    projectId: "linkedin-clone-e5fad",
    storageBucket: "linkedin-clone-e5fad.appspot.com",
    messagingSenderId: "662339651674",
    appId: "1:662339651674:web:e78820af9ae2c8b3f5f063"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()

export { db, auth }