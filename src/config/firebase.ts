import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDkqXVHX3S8Dd_rlFJhJFRM4IuHl-uikC8",
	authDomain: "blog-manager-7f88d.firebaseapp.com",
	projectId: "blog-manager-7f88d",
	storageBucket: "blog-manager-7f88d.appspot.com",
	messagingSenderId: "541944567285",
	appId: "1:541944567285:web:a9e0b4d47de6a6346bbcbc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const fs = getFirestore(app);

export const blogCollection = collection(fs, "blogs");
