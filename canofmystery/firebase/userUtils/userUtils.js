import { getFirestore, collection, query, getDocs, where, doc, deleteDoc, updateDoc, getDoc, addDoc} from "firebase/firestore"
import { default as firebase_app} from "../config"

const db = getFirestore(firebase_app)

export const fetchUsers = async () => {
    const collectionRef = collection(db, "users");
    const querySnapshot = await getDocs(collectionRef);

    const articlesArray = [];
    querySnapshot.forEach((doc) => {
        articlesArray.push({ id: doc.id, ...doc.data() });
    });

    return articlesArray;
};


export const updateUserAttribute = async (docId, attributeName, newValue) => {
    const docRef = doc(db, "users", docId);
    await updateDoc(docRef, {
        [attributeName]: newValue
    });
};