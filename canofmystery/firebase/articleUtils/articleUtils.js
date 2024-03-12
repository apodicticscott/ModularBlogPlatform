import { getFirestore, collection, query, getDocs, where, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { firebase_app } from "../config"

const db = getFirestore(firebase_app)

export const searchArticles = async (searchText) => {
    const collectionRef = collection(db, "Articles");
    const snapshot = await getDocs(collectionRef);
    const articlesArray = [];

    snapshot.forEach(doc => {
        const data = doc.data();
        const searchContent = JSON.stringify(data).toLowerCase();
        if (searchContent.includes(searchText.toLowerCase())) {
            articlesArray.push({ id: doc.id, ...data });
        }
    });
    return articlesArray;
}

export const fetchArticles = async () => {
    const collectionRef = collection(db, "Articles");
    const querySnapshot = await getDocs(collectionRef);

    const articlesArray = [];
    querySnapshot.forEach((doc) => {
        articlesArray.push({ id: doc.id, ...doc.data() });
    });

    return articlesArray;
};

export const deleteArticles = async (selectedArticles) => {
    await Promise.all(selectedArticles.map(async (id) => {
        const docRef = doc(db, "Articles", id);
        await deleteDoc(docRef);
    }));
}

export const getTotalUnapprovedArticles = async () => {
    const collectionRef = collection(db, "Articles");
    const q = query(collectionRef, where("Approved", "==", false));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length;
}

export const setArticlesApproval = async (articleIds, boolean) => {
    await Promise.all(articleIds.map(async (id) => {
        const docRef = doc(db, "Articles", id);
        await updateDoc(docRef, { Approved: boolean});
    }));
}