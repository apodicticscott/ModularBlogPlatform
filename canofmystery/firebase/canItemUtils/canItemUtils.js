import { getFirestore, collection, getDocs, doc, deleteDoc, addDoc} from "firebase/firestore"
import  firebase_app  from "../config.js"

const db = getFirestore(firebase_app)

export const addCanItem = async (docData) => {
    const colRef = collection(db, "CanItems");
    const response = await addDoc(colRef, docData);
    return response;
}

export const fetchCanItems = async () => {
    const collectionRef = collection(db, "CanItems");
    const querySnapshot = await getDocs(collectionRef);

    const canItemsArray = [];
    querySnapshot.forEach((doc) => {
        canItemsArray.push({ id: doc.id, ...doc.data() });
    });
    
    return canItemsArray;
};

export const deleteCanItem = async (selectedCanItem) => {
    const docRef = doc(db, "CanItems", selectedCanItem);
    await deleteDoc(docRef);
}

