import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAukIrNY8YFlfw9o15qXkYGHKqQPmqhsqI",
  authDomain: "auth-test-a4989.firebaseapp.com",
  projectId: "auth-test-a4989",
  storageBucket: "auth-test-a4989.appspot.com",
  messagingSenderId: "211527916460",
  appId: "1:211527916460:web:6646db4971f5b77d00b809",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
