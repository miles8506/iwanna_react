// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// import { _firebaseConfig } from '@/token'
// import firebase from 'firebase/app'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
// import 'firebase/auth'
import { _firebaseConfig } from '@/token'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = _firebaseConfig
firebase.initializeApp(firebaseConfig)

// const db = firebase.firestore()
// const ref = db.collection('test')
// ref.get().then((doc) => {
//   doc.docs.forEach((item) => {
//     console.log(item.data())
//   })
// })

export const Firebase = firebase
