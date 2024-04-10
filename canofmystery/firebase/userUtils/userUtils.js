import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc} from "firebase/firestore"
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

export const deleteUser = async (id) => {
    const docRef = doc(db, "users", id);
    await deleteDoc(docRef);
};



export const updateUserAttribute = async (docId, attributeName, newValue) => {
    const docRef = doc(db, "users", docId);

    try{
        const response = await updateDoc(docRef, {
            [attributeName]: newValue
        });

        return {response: response, error: null}
    }catch(error){
        return {response: null, error: error}
    }

};