import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase.js';

const usersCollection = collection(db, 'users');

export const createUser = async (userData) => {
    const userRef = doc(usersCollection, userData.email);
    await setDoc(userRef, userData);
};

export const getUserByEmail = async (email) => {
    const userRef = doc(usersCollection, email);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
};