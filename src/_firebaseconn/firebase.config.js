import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getFirestore } from 'firebase/firestore';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_F_API_KEY,
  authDomain: process.env.REACT_APP_F_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_F_PROJECT_ID,
  storageBucket: process.env.REACT_APP_F_STORAGE_BUCKER,
  messagingSenderId: process.env.REACT_APP_F_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_F_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore();

const messaging = getMessaging(firebase);
// onMessage(())
getToken(messaging, { vapidKey: 'BJS5I4C8Fr2cCtu10mYpC02oxhHeeCnGnLRUbJrExW5XAADSuBZLXqed6GiKGBxO61Z4LQ8CVszuzg6a11mDtqQ' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

export default firebase;