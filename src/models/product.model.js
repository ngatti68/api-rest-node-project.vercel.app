import {
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    addDoc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';
import { db } from '../config/firebase.js';

const COLLECTION_NAME = 'products';

const findAll = async () => {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const findById = async (id) => {
    const ref = doc(db, COLLECTION_NAME, id);
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

const findByCategory = async (category) => {
    const q = query(collection(db, COLLECTION_NAME), where('category', '==', category));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const create = async (data) => {
    const normalizedData = {
        ...data,
        category: data.category.toLowerCase()
    };
    
    const q = query(
        collection(db, COLLECTION_NAME),
        where("name", "==", normalizedData.name),
        where("category", "==", normalizedData.category)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        
        return null;
    }

    const ref = await addDoc(collection(db, COLLECTION_NAME), normalizedData);
    return { id: ref.id, ...normalizedData };
};

const updateById = async (id, data) => {
    const ref = doc(db, COLLECTION_NAME, id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
        return null;
    }

    await updateDoc(ref, data);
    const updatedSnapshot = await getDoc(ref);
    return { id: updatedSnapshot.id, ...updatedSnapshot.data() };
};

const deleteById = async (id) => {
    const ref = doc(db, COLLECTION_NAME, id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
        return false;
    }

    await deleteDoc(ref);
    return true;
};

export default {
    findAll,
    findById,
    findByCategory,
    create,
    updateById,
    deleteById
};