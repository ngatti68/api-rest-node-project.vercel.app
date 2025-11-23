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
    
    const ref = await addDoc(collection(db, COLLECTION_NAME), normalizedData);

    return { id: ref.id, ...normalizedData };
};

const updateById = async (id, data) => {
    const ref = doc(db, COLLECTION_NAME, id);
    await updateDoc(ref, data);
    const snapshot = await getDoc(ref);
    return { id: snapshot.id, ...snapshot.data() };
};

const deleteById = async (id) => {
    const ref = doc(db, COLLECTION_NAME, id);
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