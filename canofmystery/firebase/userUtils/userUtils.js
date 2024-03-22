import { getFirestore, collection, query, getDocs, where, doc, deleteDoc, updateDoc, getDoc, addDoc} from "firebase/firestore"
import { firebase_app } from "../config"

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
