import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyD0U7gk0zL0sm6hi9PU1pyFz03Uc2cloeM',
  authDomain: 'todo-list-1f667.firebaseapp.com',
  projectId: 'todo-list-1f667',
  storageBucket: 'todo-list-1f667.appspot.com',
  messagingSenderId: '251817259596',
  appId: '1:251817259596:web:ad69854c4269611c6cfae9'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{
    db
}