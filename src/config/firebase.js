import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCe6FJ__ezdo5z9SWkRJQ25LwXzGxtbFCY",
  authDomain: "babycode-8a1e0.firebaseapp.com",
  projectId: "babycode-8a1e0",
  storageBucket: "babycode-8a1e0.firebasestorage.app",
  messagingSenderId: "24623537381",
  appId: "1:24623537381:web:74c6df0f968ffc6151880c",
  measurementId: "G-0T6R5XDTMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export default app;