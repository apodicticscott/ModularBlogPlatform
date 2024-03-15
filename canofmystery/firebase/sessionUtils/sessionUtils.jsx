import { getFirestore, collection, addDoc, setDoc, doc, getDocs } from "firebase/firestore";
import { firebase_app } from "../config";

const db = getFirestore(firebase_app);

export const addSession = async (sessionId, expiration, isExpired) => {
    return await setDoc(doc(db, "Sessions", sessionId), {
        Experation: "test",
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