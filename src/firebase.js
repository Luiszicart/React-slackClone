import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDRjiCKjfW51UvLnaOj8snkYlkhe47Q2aE",
  authDomain: "slack-clone-16d54.firebaseapp.com",
  projectId: "slack-clone-16d54",
  storageBucket: "slack-clone-16d54.appspot.com",
  messagingSenderId: "1093748049563",
  appId: "1:1093748049563:web:1e5e1bd560a02df86d683e"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider, db }