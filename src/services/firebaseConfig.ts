import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Senin ekran görüntündeki gerçek Firebase bilgilerini buraya yerleştirdim
const firebaseConfig = {
  apiKey: "AIzaSyBJRMVwc5PpHObs-A639n-DUNW43RvuwJE",
  authDomain: "aribilgiegitim.firebaseapp.com",
  projectId: "aribilgiegitim",
  storageBucket: "aribilgiegitim.firebasestorage.app",
  messagingSenderId: "301514189313",
  appId: "1:301514189313:web:5c33f37600c43d54182e00",
  measurementId: "G-QFPVS9QQ5N"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Veritabanını (Firestore) dışarıya aç
export const db = getFirestore(app);