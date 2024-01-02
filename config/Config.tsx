import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDH1pepWGShtkEHqoHP68WnGWP_1X8fT2E",
  authDomain: "app-mov2-crud2.firebaseapp.com",
  databaseURL: "https://app-mov2-crud2-default-rtdb.firebaseio.com",
  projectId: "app-mov2-crud2",
  storageBucket: "app-mov2-crud2.appspot.com",
  messagingSenderId: "865802595480",
  appId: "1:865802595480:web:8d3d3e9f71e6c9d0f834ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db =  getDatabase(app)