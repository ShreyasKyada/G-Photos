import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrF0nj4kRj4v2FASlBYTfV_suKeeFc__I",
  authDomain: "memories-2020-to-2022.firebaseapp.com",
  databaseURL: "https://memories-2020-to-2022-default-rtdb.firebaseio.com",
  projectId: "memories-2020-to-2022",
  storageBucket: "memories-2020-to-2022.appspot.com",
  messagingSenderId: "790911422014",
  appId: "1:790911422014:web:477a9452594464f50ecb6f",
  measurementId: "G-M72CCDH20V",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
