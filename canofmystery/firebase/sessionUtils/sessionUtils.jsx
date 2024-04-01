import { getFirestore, collection, addDoc, setDoc, getDoc, doc, getDocs } from "firebase/firestore";
import firebase_app from "../config"

const db = getFirestore(firebase_app);

export const addSession = async (sessionId, expiration, isExpired) => {
    return await setDoc(doc(db, "Sessions", sessionId), {
        Experation: expiration,
        IsExpired: isExpired
    });
};

export const fetchSessions = async () => {
    const querySnapshot = await getDocs(collection(db, "Sessions"));
    const articlesArray = [];

    querySnapshot.forEach((doc) => {
        articlesArray.push({ id: doc.id, ...doc.data() });
    });

    return articlesArray;
};

export const fetchSession = async (docId) => {
    const docRef = doc(db, "Sessions", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        return null;
    }
};