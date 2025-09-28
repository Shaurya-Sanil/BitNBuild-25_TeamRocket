import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAiqHBEbK593eIIfZc69XmpQleUD8le0O0",
  authDomain: "gigcampus-1ff17.firebaseapp.com",
  projectId: "gigcampus-1ff17",
  storageBucket: "gigcampus-1ff17.firebasestorage.app",
  messagingSenderId: "831017616953",
  appId: "1:831017616953:web:8e33a195cd391769f2afe8",
  measurementId: "G-L2SGCNZBZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
