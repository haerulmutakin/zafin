import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_F_API_KEY,
  authDomain: process.env.REACT_APP_F_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_F_PROJECT_ID,
  storageBucket: process.env.REACT_APP_F_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_F_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_F_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore();

export default firebase;