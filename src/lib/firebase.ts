import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjqjbf8NkcCkZVDi0Rz_9OSdm_R_1PPHE",
  authDomain: "nasa-weather-app-6f88c.firebaseapp.com",
  projectId: "nasa-weather-app-6f88c",
  storageBucket: "nasa-weather-app-6f88c.firebasestorage.app",
  messagingSenderId: "234217518625",
  appId: "1:234217518625:web:07098d50845a5d57831560",
  measurementId: "G-N2YLBLQTDX"
};

// Firebase is now configured with real credentials
const isFirebaseConfigured = true;

let app: any = null;
let auth: any = null;
let db: any = null;

if (isFirebaseConfigured) {
  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    
    // Initialize Firebase Authentication and get a reference to the service
    auth = getAuth(app);
    
    // Initialize Cloud Firestore and get a reference to the service
    db = getFirestore(app);
    
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
  }
} else {
  console.warn('⚠️ Firebase not configured. Using mock authentication.');
}

export { auth, db };
export default app;

