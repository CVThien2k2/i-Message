import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDzQnK1TRQtawREAEffma4vjqTkd7t2swQ",
  authDomain: "chatrealtime-54de0.firebaseapp.com",
  projectId: "chatrealtime-54de0",
  storageBucket: "chatrealtime-54de0.appspot.com",
  messagingSenderId: "679779022663",
  appId: "1:679779022663:web:f4caa62a13f33bf3ddfe62",
  measurementId: "G-B9Z02W11G4"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
// Khởi tạo dịch vụ Analytics (nếu được sử dụng)
firebase.analytics();

// Lấy các đối tượng Auth và Firestore
const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth};
export default firebase;